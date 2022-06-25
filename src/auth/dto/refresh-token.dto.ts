import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDOT {
  @IsNotEmpty({ message: 'The refresh token is required' })
  readonly refresh_token: string;
}
