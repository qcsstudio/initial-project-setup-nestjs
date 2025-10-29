import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// import nodemailer from "nodemailer";
// import randomstring from "randomstring";
import path from "path";
import fs from "fs";
// import twilio from "twilio";
// import hbs = require("handlebars");
import * as Errors from "../handler/error.services";
// import * as admin from 'firebase-admin';

import { ObjectId, Types } from 'mongoose';
import { DatabaseService } from "src/database/database.service";

@Injectable()
export class CommonService implements OnModuleInit {
    // private transporter: nodemailer.Transporter;
    private nodemailer_email: string;
    private nodemailer_password: string;
    private client: any;
    // private twilio_sid: string;
    // private twilio_token: string;
    // private TWILIO_SERVICE_SID: string;

    private signup_url: string;

    constructor(
        @Inject(ConfigService) private configService: ConfigService,
        // @Inject(DatabaseService) private models: DatabaseService,
        private models: DatabaseService,
    ) {
        this.nodemailer_email = this.configService.get<string>('NODEMAILER_MAIL')
        this.nodemailer_password = this.configService.get<string>('NODEMAILER_PASSWORD')

        // this.twilio_sid = this.configService.get<string>('TWILIO_SID');
        // this.twilio_token = this.configService.get<string>('TWILIO_TOKEN');
        // this.TWILIO_SERVICE_SID = this.configService.get<string>('TWILIO_SERVICE_SID');

        this.signup_url = this.configService.get<string>('SIGNUP_URL');

        // this.transporter = nodemailer.createTransport(smtpTransport({
        //     service: "gmail",
        //     auth: {
        //         user: this.nodemailer_email,
        //         pass: this.nodemailer_password
        //     }
        // }));

        // this.transporter = nodemailer.createTransport(smtpTransport({
        //     service: "smtppro.zoho.in",
        //     host: "smtp.zeptomail.in",
        //     port: 465,
        //     secure: true,
        //     auth: {
        //         user: this.nodemailer_email,
        //         pass: this.nodemailer_password
        //     }
        // }));

        // this.client = twilio(this.twilio_sid, this.twilio_token);
    }

    async onModuleInit() {
        try {
            // let json_creds = path.join(__dirname, '../email_templates/seetv-133f3-firebase-adminsdk-fbsvc-9e7a686a8e.json');
            // if (!admin.apps.length) {
            //     admin.initializeApp({
            //         credential: admin.credential.cert(json_creds),
            //     });
            // }
        } catch (error) {
            console.error('common onModuleInit error', error);
        }
    }

    // send_push_notification = async (deviceToken, notification, data?) => {
    //     const message = {
    //         token: deviceToken,
    //         notification: {
    //             title: notification.title,
    //             body: notification.body,
    //         },
    //         data: data || {},
    //     };

    //     try {
    //         await admin.messaging().send(message);
    //     } catch (error) {
    //         console.error('Error sending FCM notification:', error);
    //     }
    // }

    // generateEmailOtp = async () => {
    //     try {
    //         let options = {
    //             length: 6,
    //             charset: '123456789'
    //         }
    //         let otp = randomstring.generate(options)
    //         return otp
    //     } catch (err) {
    //         throw err
    //     }
    // }

    new_set_options = async (pagination: any, limit: any) => {
        try {
            let options: any = {
                lean: true,
                sort: { _id: -1 }
            }
            if (pagination == undefined && limit == undefined) {
                options = {
                    lean: true,
                    sort: { _id: -1 },
                    limit: 100,
                    pagination: 0,
                    skip: 0
                }
            }
            else if (pagination == undefined && typeof limit != undefined) {
                options = {
                    lean: true,
                    sort: { _id: -1 },
                    limit: parseInt(limit),
                    skip: 0,
                }
            }
            else if (typeof pagination != undefined && limit == undefined) {
                options = {
                    lean: true,
                    sort: { _id: -1 },
                    skip: parseInt(pagination) * parseInt('100'),
                    limit: parseInt('100')
                }
            }

            else if (typeof pagination != undefined && typeof limit != undefined) {
                options = {
                    lean: true,
                    sort: { _id: -1 },
                    limit: parseInt(limit),
                    skip: parseInt(pagination) * limit
                }
            }
            return options
        }
        catch (err) {
            throw err;
        }
    }

    // sendOtpviaTwilio = async (number: any) => {
    //     try {
    //         console.log("number", number);
    //         let sendOtp = await this.client.verify.v2.services(`${this.TWILIO_SERVICE_SID}`)
    //             .verifications
    //             .create({ to: `${number}`, channel: 'sms' })
    //         return sendOtp
    //     } catch (error) {
    //         console.log("error", error);
    //         if (error.status == 400 && error.code == 60200) {
    //             throw new Errors.InvalidPhoneNumber();
    //         }
    //         if (error.status == 429 && error.code == 60203) {
    //             throw new Errors.MaxAttemptReached();
    //         }
    //         throw error

    //     }

    // }

    generateReferenceId = () => {
        const timestamp = Date.now().toString().slice(-5);
        const random = Math.floor(10000 + Math.random() * 90000).toString();
        return timestamp + random;
    };

    // verifyOtpviaTwilio = async (number: any, otp: any) => {
    //     try {
    //         console.log("number", number);
    //         let verificationCheck = await this.client.verify.v2.services(`${this.TWILIO_SERVICE_SID}`)
    //             .verificationChecks
    //             .create({ to: `${number}`, code: `${otp}` })
    //         // .then(verification_check => console.log(verification_check.status));
    //         return verificationCheck;
    //     } catch (error) {
    //         throw new Errors.WrongOtp();
    //     }

    // }

    // sendEmail = async (to: string, subject: any, body: any) => {
    //     try {
    //         let mailOptions = {
    //             from: `seezone ${this.nodemailer_email}`,
    //             to: to,
    //             subject: subject,
    //             html: body
    //         }

    //         this.transporter.sendMail(mailOptions, (error: any, info: any) => {
    //             if (error) { console.log("error----", error) }
    //             else { console.log('Email Sent: ' + info.response) }
    //         })
    //     } catch (err) {
    //         console.log("err", err);
    //         throw err
    //     }
    // }


    send_email_verification = async (data: any) => {
        try {
            console.log("----data", data);

            let { email, email_otp } = data;
            let subject = "Welcome to Splend Entertainment Empire";
            let file_path = path.join(__dirname, "../email_templates/email_verification.html");
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' });
            html = html.replace("%OTP%", email_otp);
            html = html.replace("%EMAIL%", email);
            // await this.sendEmail(email, subject, html);
        } catch (err) {
            throw err
        }
    }

    forgot_password_mail = async (data: any) => {
        try {
            let { email, email_otp } = data
            console.log("email", email);
            console.log("email_otp", email_otp);
            let subject = 'Forget Password OTP';
            let file_path = path.join(__dirname, '../email_templates/forgot_password.html');
            console.log("file_path", file_path);
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            html = html.replace('%EMAIL%', email)
            html = html.replace('%OTP%', email_otp)
            // await this.sendEmail(email, subject, html)
        }
        catch (err) {
            throw err;
        }
    }

    resendOtpMail = async (data: any) => {
        try {
            let { email, email_otp } = data
            let subject = 'Resend OTP';
            let file_path = path.join(__dirname, '../email_templates/email_verification.html');
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            html = html.replace('%EMAIL%', email)
            html = html.replace('%OTP%', email_otp)
            // await this.sendEmail(email, subject, html)
        }
        catch (err) {
            throw err;
        }
    }

    sendInvitationMail = async (email: string, contest: string) => {
        try {
            let subject = 'Contest Invitations';
            let file_path = path.join(__dirname, '../email_templates/invitations.html');
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            html = html.replace('%EMAIL%', email)
            html = html.replace('%URL%', this.signup_url)
            // html = html.replace('%OTP%', email_otp)
            // await this.sendEmail(email, subject, html)
        }
        catch (err) {
            throw err;
        }
    }

    welcomeMail = async (email: string, name: string) => {
        try {
            let subject = 'Welcome to Splended Entertainment Empire';
            let file_path = path.join(__dirname, '../email_templates/welcome.html');
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            html = html.replace('%NAME%', name)
            // await this.sendEmail(email, subject, html)
        }
        catch (err) {
            throw err;
        }
    }

    rewardPush = async (user_id: any, contest: any) => {
        try {
            let notification = {
                title: `Congratulations! You won a reward for voting for`,
                body: `${contest?.title}.`
            }
            this.notification_sender(user_id, notification, contest)
        }
        catch (err) {
            // throw err;
        }
    }

    contestReminder = async (email: string) => {
        try {
            console.log("contestReminder   aclled");

            let subject = 'Contest Reminder';
            let file_path = path.join(__dirname, '../email_templates/contest_remainder.html');
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            html = html.replace('%EMAIL%', email)
            // await this.sendEmail(email, subject, html)
        }
        catch (err) {
            throw err;
        }
    }

    contestReminderPush = async (user_id: any) => {
        try {
            let notification = {
                title: `Your contest is going to start soon.`,
                body: `Kindly make all the changes that you want to change early as possible.`
            }
            this.notification_sender(user_id, notification);
        }
        catch (err) {
            // throw err;
        }
    }

    notification_sender = async (user_id: string, notification, data?) => {
        try {
            let tokens = await this.get_fcm_tokens(user_id);
            let create_notification = {
                user_id: new Types.ObjectId(user_id),
                title: notification.title,
                body: notification.body,
                data: data,
                notification_type: 'REMINDER',
            }
            await this.models.SendNotifications.create(create_notification);
            let string_data = data ? JSON.stringify(data) : {};

            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                // await this.send_push_notification(token, notification, string_data);
            }
        } catch (error) {
            console.error('Error notification_sender', error)
        }
    }

    get_fcm_tokens = async (user_id: string) => {
        try {
            let session_query = { user_id: new Types.ObjectId(user_id), fcm_token: { $ne: null } }
            let sessions = await this.models.Sessions.find(session_query);
            return sessions.map((session) => session.fcm_token);
        } catch (error) {
            throw error
        }
    }

    passwordChangeMail = async (email: string) => {
        try {
            let subject = 'Password Change';
            let file_path = path.join(__dirname, '../email_templates/password_notify.html');
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            // html = html.replace('%INFO%', info)
            // await this.sendEmail(email, subject, html);
        }
        catch (err) {
            throw err;
        }
    }

    phoneNumberMail = async (email: string) => {
        try {
            let subject = 'Phone Number Change';
            let file_path = path.join(__dirname, '../email_templates/phone_notify.html');
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            // html = html.replace('%INFO%', info)
            // await this.sendEmail(email, subject, html);
        }
        catch (err) {
            throw err;
        }
    }

    editContestentDetails = async (email: string, contestent_email: string, name: string) => {
        try {
            let subject = 'Contestent Form Details';
            let file_path = path.join(__dirname, '../email_templates/edit_form_email.html');
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            html = html.replace('%NAME%', name)
            html = html.replace('%EMAIL%', contestent_email)
            // await this.sendEmail(email, subject, html);
        }
        catch (err) {
            throw err;
        }
    }

    broadcast_mail = async (email: string, subject: string, message: string) => {
        try {
            let file_path = path.join(__dirname, '../email_templates/admin_notification.html');
            let html = await fs.readFileSync(file_path, { encoding: 'utf-8' })
            html = html.replace('%EMAIL%', email)
            html = html.replace('%MESSAGE%', message)
            // await this.sendEmail(email, subject, html)
        }
        catch (err) {
            throw err;
        }
    }

    setoptions = async (pagination: any, limit: any) => {
        try {
            let defaultLimit = 10;
            let options: any = { lean: true, sort: { _id: -1 } }

            if (pagination === undefined && limit === undefined) {
                options = { lean: true, sort: { _id: -1 }, limit: 100, pagination: 0, skip: 0 }
            }
            else if (pagination === undefined && typeof limit !== undefined) {
                options = { lean: true, sort: { _id: -1 }, limit: parseInt(limit), skip: 0 }
            }
            else if (typeof pagination !== undefined && limit === undefined) {
                options = {
                    lean: true, sort: { _id: -1 },
                    skip: parseInt(pagination) * defaultLimit,
                    limit: defaultLimit
                }
            }
            else if (typeof pagination !== undefined && limit !== undefined) {
                options = {
                    lean: true, sort: { _id: -1 },
                    limit: parseInt(limit),
                    skip: parseInt(pagination) * parseInt(limit),
                }
            }
            return options
        } catch (error) {
            throw error
        }
    }
}