import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { TokenService } from '../token/token.service';
import { AuthLoginDto, RefreshTokenDOT } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/refresh')
  async refresh(@Body() refreshTokenDOT: RefreshTokenDOT) {
    const { user, token } =
      await this.tokenService.createAccessTokenFromRefreshToken(
        refreshTokenDOT.refresh_token,
      );

    const payload = this.tokenService.buildResponsePayload(user, token);

    return {
      status: 'success',
      data: payload,
    };
  }
}
