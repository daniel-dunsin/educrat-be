import supertest from 'supertest';
import app from '../../../app';
import authFixtures from '../../fixtures/auth.fixture';
import AuthModel from '../../../models/auth.model';
import UserModel from '../../../models/user.model';
import jwt from 'jsonwebtoken';
import redisCache from '../../../services/cache.service';
import bcrypt from 'bcryptjs';

const api = supertest(app);

describe('login user', () => {
     describe('given password is short', () => {
          it('should throw an error', async () => {
               const { statusCode, error } = await api.post('/api/v1/auth/login').send({
                    credential: authFixtures.request.email,
                    password: authFixtures.request.password.slice(0, 5),
               });

               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/ValidationError/i);
          });
     });

     describe('given user does not exist', () => {
          it('should throw an error', async () => {
               jest.spyOn(AuthModel, 'findOne').mockResolvedValueOnce(null);

               const { statusCode } = await api
                    .post('/api/v1/auth/login')
                    .send({ credential: authFixtures.request.username, password: authFixtures.request.password });

               expect(statusCode).toBe(404);
          });
     });

     describe('given user exist', () => {
          beforeEach(() => {
               jest.spyOn(AuthModel, 'findOne').mockResolvedValueOnce({ ...authFixtures.authResponse, verified: true });
               // @ts-ignore
               UserModel.findOne = jest.fn(() => ({
                    populate: jest.fn().mockResolvedValueOnce(authFixtures.userResponse),
               }));
               // @ts-ignore
               jest.spyOn(jwt, 'sign').mockReturnValueOnce(authFixtures.accessToken);
               redisCache.set = jest.fn();
          });

          describe('given password is incorrect', () => {
               it('should throw an error', async () => {
                    // @ts-ignore
                    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

                    const { statusCode, error } = await api
                         .post('/api/v1/auth/login')
                         .send({ credential: authFixtures.request.email, password: authFixtures.request.password });

                    expect(statusCode).toBe(400);
                    // @ts-ignore
                    expect(error.text).toMatch(/invalid login credentials/i);
               });
          });

          describe('given password is correct', () => {
               it('should sign user in', async () => {
                    // @ts-ignore
                    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

                    const { statusCode, body } = await api
                         .post('/api/v1/auth/login')
                         .send({ credential: authFixtures.request.email, password: authFixtures.request.password });

                    expect(statusCode).toBe(200);
                    expect(body).toEqual({
                         user: authFixtures.userResponse,
                         accessToken: authFixtures.accessToken,
                    });
               });
          });
     });
});
