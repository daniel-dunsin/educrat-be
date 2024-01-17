import supertest from 'supertest';
import redisCache from '../../../services/cache.service';
import authFixtures from '../../fixtures/auth.fixture';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import moduleFixtures from '../../fixtures/module.fixture';
import ModuleModel from '../../../models/course/module.model';

// for permissions and authorization
beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

const api = supertest(app);

describe('update module', () => {
     describe("given it doesn't exist", () => {
          it('should throw an error', async () => {
               jest.spyOn(ModuleModel, 'findByIdAndUpdate').mockResolvedValueOnce(null);
               const { statusCode } = await api
                    .put(`/api/v1/module/${moduleFixtures.moduleId}`)
                    .set('Authorization', `Bearer ${authFixtures.accessToken}`)
                    .send(moduleFixtures.request);

               expect(statusCode).toBe(404);
          });
     });

     describe('given it exist', () => {
          it('should be successful', async () => {
               jest.spyOn(ModuleModel, 'findByIdAndUpdate').mockResolvedValueOnce(moduleFixtures.moduleResponse);
               const { statusCode } = await api
                    .put(`/api/v1/module/${moduleFixtures.moduleId}`)
                    .set('Authorization', `Bearer ${authFixtures.accessToken}`)
                    .send(moduleFixtures.request);

               expect(statusCode).toBe(200);
          });
     });
});
