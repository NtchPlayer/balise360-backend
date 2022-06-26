import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        baseURL: 'https://api.sendinblue.com/v3',
        headers: {
          'api-key': process.env.API_KEY_SENDINGBLUE,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
