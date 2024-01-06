import { SendMailOptions, createTransport } from 'nodemailer';
import secrets from '../constants/secrets.const';
import ServiceException from '../schema/exception/service.exception';

const transporter = createTransport({
     service: 'gmail',
     auth: {
          user: secrets.nodemailer.email,
          pass: secrets.nodemailer.pass,
     },
});

export default async function sendMail(options: SendMailOptions) {
     try {
          await transporter.sendMail({
               from: secrets.nodemailer.email,
               ...options,
          });
     } catch (error: any) {
          throw new ServiceException(400, `Unable to send email ${error?.message || error}`);
     }
}
