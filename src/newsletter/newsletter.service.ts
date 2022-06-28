import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateContactDto } from './dto';
import { catchError, map, switchMap } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class NewsletterService {
  constructor(private readonly httpService: HttpService) {}

  public async createContact(createContactDto: CreateContactDto) {
    return this.httpService.post('/contacts', createContactDto).pipe(
      switchMap(() => {
        return this.sendEmail(
          createContactDto.email,
          createContactDto.attributes.PRENOM,
          3,
        );
      }),
      catchError((e) => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    );
  }

  public sendEmail(email: string, name: string, templateId: number) {
    try {
      return this.httpService
        .post('/smtp/email', {
          to: [{ email, name }],
          templateId,
        })
        .pipe(
          map((response: AxiosResponse) => {
            return response.data;
          }),
        );
    } catch (e) {
      throw new HttpException(e.response.data, e.response.status);
    }
  }
}
