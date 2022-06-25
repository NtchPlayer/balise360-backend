import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async create(user: User, ttl: number): Promise<RefreshToken> {
    const token = new RefreshToken();

    token.user_id = user.id;
    token.is_revoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    await this.refreshTokenRepository.save(token);

    return token;
  }

  findOne(id: number): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOneByOrFail({ id });
  }
}
