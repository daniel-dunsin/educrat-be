import supertest from 'supertest';
import app from '../../../app';
import * as authServices from '../../../services/auth.service';
import authFixtures from '../../fixtures/auth.fixture';
import AuthModel from '../../../models/user/auth.model';
import UserModel from '../../../models/user/user.model';
import jwt from 'jsonwebtoken';
import redisCache from '../../../services/cache.service';
import RoleModel from '../../../models/user/role.model';
import roleFixtures from '../../fixtures/role.fixture';

const api = supertest(app);

jest.mock('../../../services/auth.service');

describe('google auth', () => {
     describe('given accessToken is not provided', () => {
          it('should throw an error', async () => {
               const { statusCode, error } = await api.post('/api/v1/auth/google');

               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/ValidationError/i);
          });
     });

     describe('given accessToken is  provided', () => {
          it('should log user in', async () => {
               // this is for the flow where user doesn't previously exist
               // @ts-ignore
               authServices.verifyGoogleUser.mockResolvedValueOnce(authFixtures.userResponse);
               jest.spyOn(AuthModel, 'findOne').mockResolvedValueOnce(null);
               // @ts-ignore
               jest.spyOn(AuthModel, 'create').mockResolvedValueOnce(authFixtures.authResponse);
               // @ts-ignore
               jest.spyOn(UserModel, 'create').mockResolvedValueOnce(authFixtures.userResponse);
               // @ts-ignore
               jest.spyOn(RoleModel, 'create').mockResolvedValueOnce(roleFixtures.studentRole);
               // @ts-ignore
               jest.spyOn(jwt, 'sign').mockResolvedValueOnce(authFixtures.accessToken);
               redisCache.set = jest.fn();

               const { statusCode, body } = await api
                    .post('/api/v1/auth/google')
                    .send({ accessToken: 'my google access token' });

               expect(statusCode).toBe(200);
          });
     });
});
