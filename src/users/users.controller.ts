import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as dto from './dto/signup'
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Social Signup ' })
  @Post('social/login')
  async signup_social(@Body() dto: dto.signup_social) {
    return await this.usersService.social_login(dto);
  }
}
