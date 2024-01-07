import supertest from 'supertest';
import TokenModel from '../../../models/token.model';
import authFixtures from '../../fixtures/auth.fixture';
import app from '../../../app';
import AuthModel from '../../../models/auth.model';

const api = supertest(app);

describe('Verify Account', () => {
     describe('given token is invalid', () => {
          it('should throw error', async () => {
               const { code, token } = authFixtures;

               jest.spyOn(TokenModel, 'findOne').mockResolvedValueOnce(null);

               const { statusCode, error } = await api.post('/api/v1/auth/verification').send({ code, token });
               expect(statusCode).toBe(404);
               // @ts-ignore
               expect(error.text).toContain('Token does not exist or has expired');
          });
     });

     describe('given token is valid', () => {
          it('should verify user account', async () => {
               const { code, token, verifyUserTokenResponse, authResponse } = authFixtures;

               jest.spyOn(TokenModel, 'findOne').mockResolvedValueOnce(verifyUserTokenResponse);
               jest.spyOn(AuthModel, 'findOne').mockResolvedValueOnce(authResponse);

               const { statusCode } = await api.post('/api/v1/auth/verification').send({ code, token });

               expect(statusCode).toBe(200);
          });
     });
});
