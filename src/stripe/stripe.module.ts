import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import * as stripe from 'nestjs-stripe'
import { AuthService } from 'src/auth/auth.service';
import { config } from 'dotenv';

config()
let stripe_sk_key = process.env.STRIPE_SECRET_KEY;
let stripe_api_version: any = process.env.STRIPE_API_VERSION;
console.log('stripe_sk_key', stripe_sk_key);

@Module({
  imports: [stripe.StripeModule.forRoot({
    apiKey: stripe_sk_key,
    apiVersion: stripe_api_version,
  })],
  controllers: [StripeController],
  providers: [StripeService, AuthService],
})
export class StripeModule { }
