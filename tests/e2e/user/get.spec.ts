import supertest from 'supertest';
import app from '../../../app';
import jwt from 'jsonwebtoken';
import authFixtures from '../../fixtures/auth.fixture';
import redisCache from '../../../services/cache.service';
import UserModel from '../../../models/user/user.model';

const api = supertest(app);

describe('get user', () => {
     beforeEach(() => {
          jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     });

     describe('given user does not exist', () => {
          it('should throw an error', async () => {
               redisCache.get = jest.fn().mockResolvedValueOnce(null);
               // @ts-ignore
               UserModel.findById = jest.fn(() => ({
                    populate: jest.fn(() => ({
                         populate: jest.fn().mockResolvedValueOnce(null),
                    })),
               }));

               const { statusCode } = await api
                    .get('/api/v1/user')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(404);
          });
     });

     describe('given user exists in cache', () => {
          it('should not call the database', async () => {
               redisCache.get = jest.fn().mockResolvedValueOnce(authFixtures.userResponse);
               const UserModelMock = jest.spyOn(UserModel, 'findById');

               const { statusCode, body } = await api
                    .get('/api/v1/user')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(200);
               expect(body).toEqual(authFixtures.userResponse);
               expect(UserModelMock).not.toHaveBeenCalled();
          });
     });

     describe('given user does not exist in cache', () => {
          it('should call the database and return user', async () => {
               redisCache.get = jest.fn().mockResolvedValueOnce(null);
               // @ts-ignore
               UserModel.findById = jest.fn(() => ({
                    populate: jest.fn(() => ({
                         populate: jest.fn().mockResolvedValueOnce(authFixtures.userResponse),
                    })),
               }));
               redisCache.set = jest.fn().mockResolvedValueOnce(undefined);

               const { statusCode, body } = await api
                    .get('/api/v1/user')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(200);
               expect(body).toEqual(authFixtures.userResponse);
          });
     });
});
