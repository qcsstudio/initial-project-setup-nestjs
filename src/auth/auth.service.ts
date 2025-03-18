import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as mongoose from "mongoose";
import { Types } from "mongoose";
import { DatabaseService } from "../database/database.service";
import * as Errors from "../handler/error.services";

@Injectable()
export class AuthService {
    private projection = { _v: 0 }
    private optionlean = { lean: true }
    // private ConfigService: ConfigService;
    private user_scope: string;
    private admin_scope: string;

    constructor(
        @Inject(ConfigService) private configService: ConfigService,
        private jwtservice: JwtService,
        private models: DatabaseService,
    ) {
        this.user_scope = this.configService.get<string>('USER_SCOPE')
        this.admin_scope = this.configService.get<string>('ADMIN_SCOPE')
    }

    verifyToken = async (payload: any) => {
        try {
            // //console.log("paylod---", payload);
            let { _id: user_id, token_gen_at } = payload
            let query = {
                user_id: new mongoose.Types.ObjectId(user_id),
                // access_token: { $ne: null },
                token_gen_at: token_gen_at
            }

            // //console.log("query", query);

            let fcm_data = await this.models.Sessions.findOne(query, this.projection, this.optionlean);
            // //console.log("fcm data", fcm_data);

            if (!fcm_data) {
                throw new UnauthorizedException();
            }
            return fcm_data
        }
        catch (error) {
            throw error
        }
    }

    admin_check = async (payload: any, api_path: any) => {
        try {
            // //console.log("pay admin check-------->", payload);

            let { _id, scope } = payload;
            // type: { $in: ["ADMIN", "STAFF"]} 
            // //console.log("scope found Successfuly");

            let query = { _id: new Types.ObjectId(_id) }
            // //console.log("-----query ad------>", query);

            let fetch_admin: any = await this.models.Users.findOne(query, this.projection, this.optionlean);
            if (!fetch_admin) throw new HttpException({ message: "Unathorized User" }, HttpStatus.FORBIDDEN)
            if (fetch_admin.is_blocked) throw new Errors.AccountBlocked();

            // //console.log("fetch_admin-----", fetch_admin);

            // if (fetch_admin) {
            //     let { roles, super_admin } = fetch_admin;
            //     let split_api_path = api_path.split('/');
            //     //console.log('split_api_path......', split_api_path)
            //     let second_new_path = split_api_path[2].split('?')[0]
            //     //console.log('second_new_path......', second_new_path)
            //     let type = second_new_path.toUpperCase();
            //     //console.log('API Scope :', type)
            //     //console.log("Assigne role :", roles);
            //     // if (super_admin != true) {
            //     //     let check_roles = roles.includes(type);
            //     //     //console.log('roles.includes(type)', check_roles)

            //     //     if (check_roles != true) {
            //     //         throw new UnauthorizedException();
            //     //     }
            //     // }
            // }
            fetch_admin.scope = scope;
            return fetch_admin;

        } catch (error) {
            throw error
        }

    }

    check_2fa_admin = async (payload: any, api_path: any) => {
        try {
            let { _id, scope } = payload;
            // type: { $in: ["ADMIN", "STAFF"]} 
            // //console.log("scope found Successfuly");

            let query = { _id: new Types.ObjectId(_id) }
            // //console.log("-----query ad------>", query);

            let fetch_admin: any = await this.models.Users.findOne(query, this.projection, this.optionlean);
            if (!fetch_admin) throw new HttpException({ message: "Unathorized User" }, HttpStatus.FORBIDDEN)
            // //console.log("fetch_admin-----", fetch_admin);
            if (fetch_admin) {
                let { roles, super_admin } = fetch_admin;
                let split_api_path = api_path.split('/');
                // //console.log('split_api_path......', split_api_path)
                let second_new_path = split_api_path[2].split('?')[0]
                // //console.log('second_new_path......', second_new_path)
                let type = second_new_path;
                // //console.log('API Scope :', type)
                // //console.log("Assigne role :", roles);
                if (type != 'two-fa-login') {
                    throw new UnauthorizedException();
                }

                fetch_admin.scope = scope;
                return fetch_admin;
                // if (super_admin != true) {
                //     let check_roles = roles.includes(type);
                //     //console.log('roles.includes(type)', check_roles)

                //     if (check_roles != true) {
                //         throw new UnauthorizedException();
                //     }
                // }
            }

        } catch (error) {
            throw error
        }
    }

    user_check = async (payload: any) => {
        try {
            let { _id, scope } = payload;
            let query = { _id: new mongoose.Types.ObjectId(_id), is_deleted: false }
            let fetch_user: any = await this.models.Users.findOne(query);
            if (!fetch_user) {
                throw new UnauthorizedException();
            }
            fetch_user.scope = scope;
            return fetch_user
        }
        catch (error) {
            throw error
        }

    }


    createAdminToken = async (token_data: any) => {
        try {
            let access_token = await this.generateToken(token_data);
            let response: any = await this.saveSession(token_data, null);
            response.access_token = access_token;
            return response
        } catch (error) {
            throw error
        }
    }

    createUserToken = async (_id: mongoose.Types.ObjectId, body: any) => {
        try {
            let token_data: any = {
                _id: _id,
                scope: this.user_scope,
                token_gen_at: +new Date()
            }
            let access_token = await this.generateToken(token_data);
            let response: any = await this.saveSession(token_data, body);
            response.access_token = access_token;
            return response
        } catch (error) {
            throw error
        }
    }


    generateToken = async (token_data: any) => {
        try {
            let token: string = await this.jwtservice.signAsync(token_data);
            return token
        } catch (err) {
            throw err
        }
    }

    saveSession = async (token_data: any, body: any) => {
        try {
            const { token_gen_at, scope, _id, organization_id } = token_data;
            let data: any = {
                token_gen_at: token_gen_at
            }
            if (scope == 'ADMIN') {
                data.type = "ADMIN";
                data.user_id = _id;
                let query = { user_id: _id }
                await this.models.Sessions.deleteOne(query);
            }
            if (scope == 'USER') {
                data.type = "USER";
                data.user_id = _id;
                data.organization_id = organization_id;
                data.fcm_token = body?.fcm_token;
                data.device_type = body?.device_type;
                let query = { user_id: _id, admin_login: false }
                await this.models.Sessions.deleteOne(query);
            }

            let save_data = await this.models.Sessions.create(data);
            // //console.log("save session----", save_data);

            return save_data
        } catch (err) {
            throw err
        }
    }

    login_as_user_saveSession = async (token_data: any) => {
        try {
            const { token_gen_at, scope, _id, organization_id } = token_data;
            let data: any = {
                token_gen_at: token_gen_at
            }
            if (scope == 'USER') {
                data.type = "USER";
                data.user_id = _id;
                data.organization_id = organization_id;
                data.fcm_token = null;
                data.device_type = null;
                // let query = { user_id: _id }
                // await this.models.Sessions.deleteOne(query);
            }

            let save_data = await this.models.Sessions.create(data);
            // //console.log("save session----", save_data);

            return save_data
        } catch (err) {
            throw err
        }
    }
}