import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import * as Dto from './dto/create-stripe.dto';
import { Roles, Role } from 'src/auth/roles.gaurd';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  // @UseGuards(AuthGuard)
  // @ApiBearerAuth('authorization')
  @Post('token')
  async create_token(@Req() req: any) {
    try {
      return await this.stripeService.create_token(req)
      // return data;
    } catch (error) {
      throw error
    }
  }

  @Get('plans')
  async get_plans(@Req() req: any) {
    try {
      return await this.stripeService.get_subscription()
      // return data;
    } catch (error) {
      throw error
    }
  }

  @Get('plan/:id')
  async get_plan_details(@Param() dto: Dto.Id, @Req() req: any) {
    try {
      return await this.stripeService.get_subscription_details(dto.id)
      // return data;
    } catch (error) {
      throw error
    }
  }

  @Roles(Role.USER,)
  @ApiOperation({ summary: 'Create subscription' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Post('subscription')
  async create_subscription(@Body() body: Dto.subscription, @Req() req: any) {
    try {
      return await this.stripeService.create_subscription(body, req)
    } catch (error) {
      throw error
    }
  }

  @Roles(Role.USER,)
  @ApiOperation({ summary: 'Upgrade subscription' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Patch('subscription/upgrade')
  async upgrade_subscription(@Body() body: Dto.upgradeSubscription, @Req() req: any) {
    try {
      return await this.stripeService.upgradeSubscription(body, req);
    } catch (error) {
      throw error
    }
  }

  @Roles(Role.USER,)
  @ApiOperation({ summary: 'Cancle subscription' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Patch('subscription/cancel')
  async cancel_subscription(@Req() req: any) {
    try {
      return await this.stripeService.cancel_subscription(req);
    } catch (error) {
      throw error
    }
  }

  @Roles(Role.USER,)
  @ApiOperation({ summary: 'Details subscription' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('authorization')
  @Get('subscription')
  async get_user_subscription(@Req() req: any) {
    try {
      return await this.stripeService.get_user_subscription(req)
      // return data;
    } catch (error) {
      throw error
    }
  }

  @Post('web-hooks')
  async webhooks(@Req() req: any) {
    try {
      return await this.stripeService.webhooks(req)
      // return data;
    } catch (error) {
      throw error
    }
  }

}
