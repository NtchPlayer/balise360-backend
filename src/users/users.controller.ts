import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { TokenService } from '../token/token.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const accessToken = await this.tokenService.generateAccessToken(user);
    const refreshToken = await this.tokenService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = this.tokenService.buildResponsePayload(
      user,
      accessToken,
      refreshToken,
    );

    return {
      status: 'success',
      data: payload,
    };
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.showById(id);
  }
}
