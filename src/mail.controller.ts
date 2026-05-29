import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

class SendMailDto {
  to?: string;
  subject?: string;
  text?: string;
}

@Controller('mail')
export class MailController {
  constructor(private readonly mailer: MailerService) {}

  @Post('test')
  async test(@Body() body: SendMailDto) {
    await this.mailer.sendMail({
      to: body.to ?? 'user@example.test',
      subject: body.subject ?? 'Nest + Mailexam',
      text: body.text ?? 'Mailexam test from NestJS',
    });

    return { status: 'ok' };
  }
}
