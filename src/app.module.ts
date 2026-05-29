import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './mail.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      useFactory: () => {
        const login = process.env.MAILEXAM_LOGIN!;
        const port = Number(process.env.MAILEXAM_PORT ?? 587);

        return {
          transport: {
            host: `${login}.mailexam.ru`,
            port,
            secure: port === 465,
            auth: {
              user: login,
              pass: process.env.MAILEXAM_PASSWORD,
            },
          },
          defaults: {
            from: process.env.MAIL_FROM ?? 'noreply@example.test',
          },
        };
      },
    }),
  ],
  controllers: [MailController],
})
export class AppModule {}
