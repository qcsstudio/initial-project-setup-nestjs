import { Inject, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
// import * as dto from "./dto/index";
import * as dto from './dto/signup'
import { DatabaseService } from "../database/database.service";
import * as Errors from "../handler/error.services";
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UsersService {
    private optionlean = { lean: true };
    private optionnew = { new: true };
    constructor(
        @Inject(DatabaseService) private models: DatabaseService,
        @Inject(AuthService) private authService: AuthService,
    ) { }

    signup = async (dto: dto.signup) => {
        try {
            let { firstName, lastName, email, role, phone, country, password, terms, receiveNews, recaptchaToken } = dto;

        } catch (error) {
            throw error
        }
    }


    // social_login = async (dto: dto.signup_social) => {
    //     try {
    //         let { social_type } = dto

    //         switch (social_type) {
    //             case 'GOOGLE':
    //                 return await this.google_login(dto);
    //             case 'APPLE':
    //                 return await this.apple_login(dto);
    //         }

    //     } catch (error) {
    //         throw error
    //     }
    // }

    // google_login = async (dto: dto.signup_social) => {
    //     try {
    //         let { token } = dto
    //         let token_response: any

    //         token_response = jwt.decode(token);

    //         if (!token_response) {
    //             throw new Errors.SomthingWentWrongBadReq()
    //         }
    //         if (token_response?.email) {
    //             let social_login_data = {
    //                 email: token_response.email,
    //                 name: token_response?.name,
    //                 profile_pic: token_response?.picture,
    //                 sub_id: token_response?.sub
    //             }
    //             return await this.social_login_by_data(social_login_data, dto);
    //         }
    //         else {
    //             throw new Errors.SomthingWentWrongBadReq()
    //         }
    //     } catch (error) {
    //         console.error('google login error', error);
    //         throw new Errors.SomthingWentWrongBadReq()
    //     }
    // }

    // apple_login = async (dto: dto.signup_social) => {
    //     try {
    //         let { token } = dto
    //         let token_response: any

    //         token_response = jwt.decode(token);

    //         if (token_response?.email) {
    //             let social_login_data = {
    //                 email: token_response.email,
    //                 name: token_response?.name,
    //                 profile_pic: token_response?.picture,
    //                 sub_id: token_response?.sub
    //             }
    //             return await this.social_login_by_data(social_login_data, dto);
    //         }
    //         else {
    //             throw new Errors.SomthingWentWrongBadReq()
    //         }
    //     } catch (error) {
    //         console.error('apple login error', error);
    //         throw error
    //     }
    // }

    // social_login_by_data = async (body, dto: dto.signup_social) => {
    //     try {
    //         let { name, email, profile_pic, sub_id } = body
    //         let { social_type } = dto;

    //         let projection = {
    //             __v: 0,
    //             password: 0,
    //             email_otp: 0,
    //             phone_otp: 0,
    //             social_token: 0,
    //         };

    //         let query = { email: email.toLowerCase(), is_deleted: false }
    //         let user: any = await this.models.Users.findOne(query, projection, this.optionlean);
    //         if (!user) {
    //             let create_stripe_customer = {
    //                 name: name,
    //                 email: email.toLowerCase()
    //             }
    //             // let stripe_cus = await this.stripeService.createCustomer(create_stripe_customer);
    //             let create_user_data = {
    //                 name: name,
    //                 email: email.toLowerCase(),
    //                 social_login: true,
    //                 is_email_verified: true,
    //                 profile_pic: profile_pic ?? null,
    //                 // customer_id: stripe_cus?.id,
    //                 social_type: social_type,
    //                 sub_id: sub_id,
    //                 created_at: moment().utc().valueOf()
    //             }
    //             let user = await this.models.Users.create(create_user_data);
    //             let token = await this.authService.createUserToken(user?._id, dto);
    //             let response = await this.userResponse(token);
    //             return { data: response }
    //         }
    //         if (user.account_status != 'ACTIVATED') throw new Errors.AccountDeactivated();

    //         let access_token = await this.authService.createUserToken(user?._id, dto);
    //         // //console.log('user login token :', access_token);

    //         let response = await this.userResponse(access_token);
    //         return { data: response }
    //     } catch (error) {
    //         throw error
    //     }
    // }

    // userResponse = async (dto: any) => {
    //     try {
    //         let { user_id, access_token, device_type, fcm_token, token_gen_at } = dto;
    //         let query = { _id: user_id };
    //         let projection = {
    //             __v: 0,
    //             email_otp: 0,
    //             phone_otp: 0,
    //             password_updated_at: 0,
    //             unique_code: 0,
    //             email_otp_generated_at: 0,
    //             phone_otp_generated_at: 0,
    //             super_admin: 0,
    //             customer_id: 0,
    //             password: 0,
    //             roles: 0,
    //             user_type: 0,
    //             temp_email_otp: 0,
    //         };
    //         let response: any = await this.models.Users.findById(query, projection, this.optionlean);

    //         if (response) {
    //             response.access_token = access_token;
    //             response.device_type = device_type;
    //             response.fcm_token = fcm_token;
    //             response.token_gen_at = token_gen_at;
    //             return response;
    //         }
    //     } catch (err) {
    //         throw err;
    //     }
    // };


}
