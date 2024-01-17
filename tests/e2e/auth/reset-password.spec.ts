import supertest from 'supertest';
import app from '../../../app';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import TokenModel from '../../../models/user/token.model';
import AuthModel from '../../../models/user/auth.model';
import sendMail from '../../../services/email.service';
import authFixtures from '../../fixtures/auth.fixture';

const api = supertest(app);

jest.mock('../../../services/email.service');

describe('forgot password', () => {
     describe('given email is not provided', () => {
          it('should throw an error', async () => {
               const { statusCode, error } = await api.post('/api/v1/auth/password/forgot').send({ email: undefined });

               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/ValidationError/i);
          });
     });

     describe('given email is provided', () => {
          describe('given user does not exist', () => {
               it('should not send email', async () => {
                    // @ts-ignore
                    const SendMailMock = sendMail.mockResolvedValueOnce(null);
                    jest.spyOn(AuthModel, 'findOne').mockResolvedValueOnce(null);

                    const { statusCode } = await api
                         .post('/api/v1/auth/password/forgot')
                         .send({ email: authFixtures.request.email });

                    expect(statusCode).toBe(200);
                    expect(SendMailMock).not.toHaveBeenCalled();
               });
          });

          describe('given user exists', () => {
               it('should send the email', async () => {
                    // @ts-ignore
                    jest.spyOn(crypto, 'randomBytes').mockResolvedValueOnce(() => ({
                         toString: jest.fn(() => 9999999),
                    }));
                    jest.spyOn(AuthModel, 'findOne').mockResolvedValueOnce(authFixtures.authResponse);
                    jest.spyOn(TokenModel, 'findOne').mockResolvedValueOnce(null);
                    // @ts-ignore
                    jest.spyOn(TokenModel, 'create').mockResolvedValueOnce(authFixtures.passwordResetTokenResponse);
                    // @ts-ignore
                    sendMail = jest.fn().mockResolvedValueOnce(true);

                    const { statusCode } = await api
                         .post('/api/v1/auth/password/forgot')
                         .send({ email: authFixtures.request.email });

                    expect(statusCode).toBe(200);
                    expect(sendMail).toHaveBeenCalled();
               });
          });
     });
});

describe('reset password', () => {
     describe('given token/code/password is not provided', () => {
          it('should throw an error', async () => {
               const { statusCode, error } = await api
                    .patch('/api/v1/auth/password/reset')
                    .send({ token: undefined, code: 'randomcode', password: undefined });

               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/ValidationError/i);
          });
     });

     describe('given they are provided', () => {
          describe('given token is invalid', () => {
               it('should throw an error', async () => {
                    jest.spyOn(TokenModel, 'findOne').mockResolvedValueOnce(null);
                    const { statusCode } = await api.patch('/api/v1/auth/password/reset').send({
                         token: authFixtures.token,
                         code: authFixtures.code,
                         password: authFixtures.request.password,
                    });

                    expect(statusCode).toBe(404);
               });
          });

          describe('given token is valid', () => {
               it('should reset user password', async () => {
                    bcrypt.genSalt = jest.fn().mockReturnValueOnce('testSaltFactor');
                    bcrypt.hash = jest.fn().mockResolvedValueOnce(authFixtures.hashedPassword);
                    TokenModel.findOne = jest.fn().mockResolvedValueOnce(authFixtures.passwordResetTokenResponse);
                    AuthModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(true);

                    const { statusCode } = await api.patch('/api/v1/auth/password/reset').send({
                         token: authFixtures.token,
                         code: authFixtures.code,
                         password: authFixtures.request.password,
                    });

                    expect(statusCode).toBe(200);
               });
          });
     });
});
