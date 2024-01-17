import jwt from 'jsonwebtoken';
import authFixtures from '../../fixtures/auth.fixture';
import supertest from 'supertest';
import app from '../../../app';
import redisCache from '../../../services/cache.service';
import roleFixtures from '../../fixtures/role.fixture';
import CourseCategoryModel from '../../../models/course/course-category.model';
import courseCategoryFixtures from '../../fixtures/course-category.fixture';

const api = supertest(app);

describe('create course category', () => {
     beforeEach(() => {
          jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
          // for permission middleware
          redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
     });

     describe('given name/description was not provided', () => {
          it('should throw an error', async () => {
               const { error, statusCode } = await api
                    .post('/api/v1/course/category')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`)
                    .send({ name: undefined, description: undefined });

               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/ValidationError/i);
          });
     });

     describe('given name and description was provided', () => {
          it('should add category successfully', async () => {
               CourseCategoryModel.findOne = jest.fn().mockResolvedValueOnce(null);
               CourseCategoryModel.create = jest.fn().mockResolvedValueOnce(courseCategoryFixtures.testCourse);

               const { body, statusCode } = await api
                    .post('/api/v1/course/category')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`)
                    .send(courseCategoryFixtures.testCourse);

               expect(statusCode).toBe(201);
               expect(body).toEqual(courseCategoryFixtures.testCourse);
          });
     });
});
