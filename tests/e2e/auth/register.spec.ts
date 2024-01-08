import supertest from 'supertest';
import app from '../../../app';
import authFixtures from '../../fixtures/auth.fixture';
import AuthModel from '../../../models/auth.model';
import bcrypt from 'bcryptjs';
import UserModel from '../../../models/user.model';
import uuid from 'uuid';
import TokenModel from '../../../models/token.model';
import sendMail from '../../../services/email.service';
import RoleModel from '../../../models/role.model';
import roleFixtures from '../../fixtures/role.fixture';

const api = supertest(app);

jest.mock('../../../services/email.service');

describe('registration', () => {
     describe('given some credentials were not provided', () => {
          it('should throw an error', async () => {
               const { statusCode } = await api
                    .post('/api/v1/auth/register')
                    .send({ firstName: authFixtures.request.firstName });
               expect(statusCode).toBe(400);
          });
     });

     describe('given that the user already exists', () => {
          it('should throw an error', async () => {
               jest.spyOn(AuthModel, 'findOne').mockResolvedValueOnce(authFixtures.authResponse);

               const { statusCode, error } = await api.post(`/api/v1/auth/register`).send(authFixtures.request);
               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/user already exists/i);
          });
     });

     describe("given that the user doesn't exist", () => {
          it('should register user perfectly', async () => {
               AuthModel.findOne = jest.fn().mockResolvedValueOnce(null);
               bcrypt.genSalt = jest.fn().mockReturnValueOnce('testSaltFactor');
               bcrypt.hash = jest.fn().mockResolvedValueOnce(authFixtures.hashedPassword);
               // @ts-ignore
               jest.spyOn(AuthModel, 'create').mockResolvedValueOnce(authFixtures.authResponse);
               UserModel.create = jest.fn().mockResolvedValueOnce(authFixtures.userResponse);
               TokenModel.findOne = jest.fn().mockResolvedValueOnce(null);
               TokenModel.create = jest.fn().mockResolvedValueOnce(authFixtures.verifyUserTokenResponse);
               RoleModel.create = jest.fn().mockResolvedValueOnce(roleFixtures.studentRole);
               // @ts-ignore
               sendMail.mockResolvedValueOnce(true);

               const { statusCode } = await api.post(`/api/v1/auth/register`).send(authFixtures.request);
               expect(statusCode).toBe(201);
          });
     });
});
