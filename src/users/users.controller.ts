import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as dto from './dto/signup'
@ApiTags('Auth')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Social Signup ' })
  @Post('signup')
  async signup_social(@Body() dto: dto.signup) {
    return await this.usersService.signup(dto);
  }
}
