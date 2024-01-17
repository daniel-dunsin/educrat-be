import supertest from 'supertest';
import redisCache from '../../../services/cache.service';
import authFixtures from '../../fixtures/auth.fixture';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import moduleFixtures from '../../fixtures/module.fixture';
import courseFixtures from '../../fixtures/course.fixtures';
import ModuleModel from '../../../models/course/module.model';

// for permissions and authorization
beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

const api = supertest(app);

describe('create course module', () => {
     describe('given title and learningObjectives were not provided', () => {
          it('should throw an error', async () => {
               const { error, statusCode } = await api
                    .post(`/api/v1/module/course/${moduleFixtures.request.courseId}`)
                    .set('Authorization', `Bearer ${authFixtures.accessToken}`)
                    .send({ title: undefined });

               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/ValidationError/i);
          });
     });

     describe('given title and learningObjective were provided', () => {
          it('should create and return the module', async () => {
               //@ts-ignore
               jest.spyOn(redisCache, 'get').mockReturnValueOnce(courseFixtures.courseResponse);
               //@ts-ignore
               jest.spyOn(ModuleModel, 'create').mockResolvedValueOnce(moduleFixtures.moduleResponse);

               const { statusCode, body } = await api
                    .post(`/api/v1/module/course/${moduleFixtures.request.courseId}`)
                    .set('Authorization', `Bearer ${authFixtures.accessToken}`)
                    .send(moduleFixtures.request);

               expect(statusCode).toBe(201);
               expect(body).toEqual(moduleFixtures.moduleResponse);
          });
     });
});
