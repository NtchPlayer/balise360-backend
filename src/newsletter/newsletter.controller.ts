import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateContactDto } from './dto';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('add')
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.newsletterService.createContact(createContactDto);
  }
}
