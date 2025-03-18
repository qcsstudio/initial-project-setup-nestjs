import { Inject, Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { InjectStripe } from 'nestjs-stripe';
import * as Dto from './dto/create-stripe.dto';
import Stripe from 'stripe'
// import { createPlan } from 'src/admin/dto';
import moment from 'moment';
import * as Error from '../handler/error.services';
import { Types } from 'mongoose';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StripeService {
    private optionlean: any = { lean: true };
    private optionnew: any = { new: true };
    constructor(
        @Inject(DatabaseService) private models: DatabaseService,
        @InjectStripe() private readonly stripeClient: Stripe,
    ) { }

    async create_token(req: any) {
        try {
            const cardToken: any = 'tok_visa'
            const paymentMethod = await this.stripeClient.paymentMethods.create({
                type: 'card',
                card: {
                    token: cardToken,
                },
            });

            return { data: paymentMethod };

        } catch (error) {
            throw error;
        }
    }


    get_subscription = async () => {
        try {
            let query = { is_deleted: false }
            let data = await this.models.Plan.find(query, {}, this.optionlean);
            return { data: data }
        } catch (error) {
            throw error
        }
    }

    get_subscription_details = async (plan_id: string) => {
        try {
            let data = await this.models.Plan.findById({ _id: new Types.ObjectId(plan_id) }).lean();
            return { data: data }
        } catch (error) {
            throw error
        }
    }

    async create_plan(dto: any,) {
        try {
            let { plan_name, description, amount, interval, icon, interval_count, currency, benefits } = dto;

            let add_product = await this.stripeClient.products.create({
                name: plan_name,
                description: description
            });

            if (add_product) {
                let { id: product_id } = add_product;
                let data: any = {
                    amount: amount * 100,
                    currency: currency,
                    interval: interval,
                    interval_count: interval_count || 1,
                    product: product_id,
                }

                let create_plan = await this.stripeClient.plans.create(data);
                if (create_plan) {
                    let { id: plan_id } = create_plan;
                    let data_to_save = {
                        plan_name,
                        description,
                        amount,
                        product_id,
                        interval,
                        icon,
                        interval_count,
                        currency,
                        plan_id,
                        is_deleted: false,
                        benefits,
                        created_at: moment().utc().valueOf()
                    }
                    let plan = await this.models.Plan.create(data_to_save);
                    return plan
                } else {
                    throw new Error.SomthingWentWrong()
                }
            } else {
                throw new Error.SomthingWentWrong()
            }
        } catch (error) {
            throw error
        }
    }


    async create_subscription(dto: Dto.subscription, req: any) {
        try {
            let { plan_id, payment_method_id } = dto;
            let { _id: user_id, customer_id } = req.user_data;
            let organization_id = req.user_data?.org_data?._id ?? null;
            let sub_data = await this.models.Subscriptions.find({ user_id: user_id, status: 'active' }, { __v: 0 }, { lean: true })

            if (sub_data.length) {
                throw new Error.AlreadyHaveSubscription()
            }

            let query = { _id: plan_id }
            let projection = { _v: 0 };
            let options = { lean: true };
            let retrive_plan = await this.models.Plan.findOne(query, projection, options)

            let attach_pm = await this.stripeClient.paymentMethods.attach(payment_method_id, { customer: customer_id })
            let { plan_id: stripe_plan_id } = retrive_plan
            // let stripe_retrive_plan = await this.stripeClient.plans.list()
            // //console.log(stripe_retrive_plan);

            let data = {
                default_payment_method: payment_method_id,
                customer: customer_id,
                items: [{ plan: stripe_plan_id }]
            }
            let subscriptions = await this.stripeClient.subscriptions.create(data);
            // //console.log('subscriptions', subscriptions);
            const plan = await this.get_plan(plan_id)

            let { id: subscription_id } = subscriptions;
            let product_id = null

            let data_to_save = {
                user_id,
                organization_id: organization_id,
                plan_id: new Types.ObjectId(plan_id),
                subscription_id,
                product_id: product_id,
                start_date: subscriptions.current_period_start * 1000,
                renewal_date: subscriptions.current_period_end * 1000,
                status: subscriptions.status,
                amount: plan.amount,
                created_at: moment().utc().valueOf()
            }
            let saveData = await this.models.Subscriptions.create(data_to_save)

            return { data: saveData };

        } catch (error) {
            throw error
        }
    }


    async upgradeSubscription(dto: Dto.upgradeSubscription, req: any) {
        try {
            // let { _id: expert_id } = req.expert_data;
            let { plan_id } = dto;
            let { _id: user_id, customer_id } = req.user_data
            // let sub_query = { _id: subscription_id, status: 'active' };
            let subscription: any = await this.models.Subscriptions.findOne({ user_id: user_id, status: 'active' }, { _v: 0 }, { lean: true })

            if (!subscription) {
                throw new Error.DoNotHaveSubscription()
            }
            else {
                const { plan_id: new_plan_id } = await this.get_plan(plan_id)
                const { subscription_id: subscriptionId } = subscription
                const retrieve_subscription = await this.stripeClient.subscriptions.retrieve(subscriptionId);

                const updatedSubscription = await this.stripeClient.subscriptions.update(subscriptionId, {
                    cancel_at_period_end: false,
                    items: [{
                        id: retrieve_subscription.items.data[0].id,
                        plan: new_plan_id
                    }],
                    proration_behavior: 'none'
                });
                const plan = await this.get_plan(plan_id)
                let data_to_update = {
                    plan_id: new Types.ObjectId(plan_id),
                    subscription_id: updatedSubscription.id,
                    start_date: updatedSubscription.current_period_start * 1000,
                    renewal_date: updatedSubscription.current_period_end * 1000,
                    status: updatedSubscription.status,
                    amount: plan.amount,
                    is_upgraded: true,
                    created_at: moment().utc().valueOf()
                }

                let updated_data = await this.models.Subscriptions.findOneAndUpdate({ _id: subscription._id }, data_to_update, { new: true })
                // //console.log('updated_data', updated_data);
                // let data_to_save_payment = {
                //   user_id: user_id,
                //   amount: plan.amount,
                //   created_at: moment().utc().valueOf(),
                //   currency: plan.currency,
                //   payment_method: 'Card',
                //   status: 'Success',
                // }
                // await this.models.paymentmodels.create(data_to_save_payment)
                return { data: updated_data };
            }
        } catch (error) {
            throw error
        }
    }


    async cancel_subscription(req: any) {
        try {
            let { _id: user_id } = req.user_data
            let query = { _id: user_id }
            let projection = { _v: 0 };
            let options = { lean: true };
            //console.log("data_subs");

            // let fetch_expert = await this.models.usermodels.findOne(query, projection, options)
            let query_sub = { user_id: user_id, status: 'active' };
            let data_subs: any = await this.models.Subscriptions.findOne(query_sub, { _v: 0 }, { lean: true, sort: { _id: -1 } })
            //console.log(data_subs);

            if (!data_subs) {
                throw new Error.DoNotHaveSubscription()
            }
            // if(data_subs.status ==subs_status.FREE){
            //   throw new BadRequestException("You can't cancel a free subscription")
            // }
            const deleted = await this.stripeClient.subscriptions.update(data_subs.subscription_id, { cancel_at_period_end: true });
            //console.log('deleted subscription', deleted);

            const retrive_subscription = await this.stripeClient.subscriptions.retrieve(data_subs.subscription_id)
            // if (retrive_subscription.status != "canceled") {
            //   throw new InternalServerErrorException()
            // }
            let update = {
                status: retrive_subscription.status,
                is_canceled: true
            }
            await this.models.Subscriptions.findOneAndUpdate({ _id: data_subs._id }, update);
            return {
                success: true,
                message: "Your Subscription is Cancelled"
            }
        } catch (error) {
            //console.log(error);
            throw error
        }
    }

    async get_user_subscription(req: any) {
        try {
            let { _id: user_id, customer_id } = req.user_data;
            let query = { user_id: user_id, status: 'active' }
            let projection = { _v: 0 };
            let options = { lean: true };
            let retrive_subscription = await this.models.Subscriptions.find(query, projection, options).populate('plan_id')
            if (!retrive_subscription.length) {
                throw new Error.DoNotHaveSubscription()
            }

            return { data: retrive_subscription[0] }
        } catch (error) {
            throw error
        }
    }


    async webhooks(req: any) {
        try {
            let data = req.body
            //console.log('webhooks_data', data);
            let { id, object, status } = req.body?.data?.object
            switch (req.body.type) {
                case 'customer.subscription.deleted':
                    if (object === 'subscription') {
                        let query = {
                            subscription_id: id
                        }
                        let data_to_update = {
                            status: status
                        }
                        await this.models.Subscriptions.findOneAndUpdate(query, data_to_update, { new: true })
                    }
                    break
                case 'customer.subscription.updated':
                    if (object === 'subscription') {
                        let query = {
                            subscription_id: id
                        }
                        let data_to_update = {
                            status: status
                        }
                        await this.models.Subscriptions.findOneAndUpdate(query, data_to_update, { new: true })
                    }
                    break;
            }
            return data
        } catch (error) {
            throw error
        }
    }

    async delete_plan(_id: any) {
        try {
            let query = { _id: _id };
            let projection = { _v: 0 };
            let options = { lean: true }
            let plan = await this.models.Plan.findOne(query, projection, options)
            let { plan_id } = plan
            let delete_plan = await this.stripeClient.plans.del(plan_id)
            let update_plan = await this.models.Plan.findOneAndUpdate(query, { is_deleted: true }, { new: true })
            return update_plan
        } catch (error) {
            throw error
        }
    }

    async get_plan(_id: any) {
        try {
            let query = { _id: _id };
            let projection = { _v: 0 };
            let options = { lean: true }
            let plan = await this.models.Plan.findOne(query, projection, options)
            return plan
        } catch (error) {
            throw error
        }
    }

    async createCustomer(body: any) {
        try {
            let { email, first_name } = body;
            let data = {
                name: first_name ? first_name : email.split('@')[0],
                email: email.toLowerCase()
            }
            let customer = await this.stripeClient.customers.create(data)
            //console.log('create........', customer);
            return customer;
        } catch (error) {
            throw error
        }
    }

}
