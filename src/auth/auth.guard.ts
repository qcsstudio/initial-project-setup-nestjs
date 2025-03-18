import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role, Roles, ROLES_KEY } from "./roles.gaurd";
import { ConfigService } from '@nestjs/config';
import { AuthService } from "./auth.service";
import * as Errors from "../handler/error.services";

@Injectable()
export class AuthGuard implements CanActivate {
    private user_scope: string;
    private admin_scope: string;
    constructor(
        private ConfigService: ConfigService,
        private jwtService: JwtService,
        private Reflector: Reflector,
        private authService: AuthService,
    ) {
        this.user_scope = this.ConfigService.get<string>('USER_SCOPE')
        this.admin_scope = this.ConfigService.get<string>('ADMIN_SCOPE')
    }
    async device(req: Request) {
        try {
            const userAgent = req.headers['user-agent'];
            // //console.log("User-Agent:", userAgent);

            // Determine platform from User-Agent
            let platform = 'Unknown';
            if (/android/i.test(userAgent)) {
                platform = 'ANDROID';
            } else if (/iphone|ipad|ipod/i.test(userAgent)) {
                platform = 'IOS';
            } else if (/windows|macintosh|linux/i.test(userAgent)) {
                platform = 'WEB';
            }
            //console.log('platform :', platform);

            return platform;
        } catch (error) {
            throw error
        }
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const requiredRoles = this.Reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),

        ]);
        //console.log('requiredRoles', requiredRoles);

        const [type, token] = request?.headers?.authorization?.split(' ') ?? [];
        if (!token) {
            throw new UnauthorizedException();
        }
        if (type !== 'Bearer') {
            throw new UnauthorizedException();
        }
        const api_path = request.originalUrl;

        try {
            const payload = await this.jwtService.verifyAsync(token);
            let { scope } = payload;
            // //console.log("Verify token payload------>", payload);

            let session: any = await this.authService.verifyToken(payload);
            if (scope === 'ADMIN-2FA') {
                let user_data = await this.authService.check_2fa_admin(payload, api_path);
                if (user_data.account_status != 'ACTIVATED') throw new Errors.AccountDeactivated();
                request.user_data = user_data;
                let device = await this.device(request);
                request.user_data.device_type = device;
                request.user_data.session_id = session?._id;
                return request.user_data;
            }

            if (scope === this.admin_scope && (requiredRoles?.includes(Role.ADMIN) || requiredRoles?.includes(Role.STAFF))) {
                let user_data = await this.authService.admin_check(payload, api_path);
                if (user_data.account_status != 'ACTIVATED') throw new Errors.AccountDeactivated();
                request.user_data = user_data;
                request.user_data.session_id = session?._id;
                let device = await this.device(request);
                request.user_data.device_type = device
                return request.user_data;
            }
            if (scope === this.user_scope && (requiredRoles?.includes(Role.USER)) && requiredRoles.length == 1) {
                let fetch_user = await this.authService.user_check(payload);
                if (fetch_user.account_status != 'ACTIVATED') throw new Errors.AccountDeactivated();
                request.user_data = fetch_user;
                request.user_data.session_id = session?._id;
                let device = await this.device(request);
                request.user_data.device_type = device
                return request.user_data;
            }
        } catch (error) {
            throw error;
        }
    }
}