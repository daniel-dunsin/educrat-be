import jwt from 'jsonwebtoken';
import authFixtures from '../../fixtures/auth.fixture';
import supertest from 'supertest';
import app from '../../../app';
import redisCache from '../../../services/cache.service';
import roleFixtures from '../../fixtures/role.fixture';
import CourseCategoryModel from '../../../models/course-category.model';
import courseCategoryFixtures from '../../fixtures/course-category.fixture';

const api = supertest(app);

describe('get course category', () => {
     beforeEach(() => {
          jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
          // for permission middleware
          redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
          redisCache.get = jest.fn().mockResolvedValueOnce(null);
          redisCache.set = jest.fn().mockResolvedValueOnce(null);
     });

     describe("given it doesn't exist", () => {
          it('should throw an error', async () => {
               CourseCategoryModel.findById = jest.fn().mockResolvedValueOnce(null);

               const { statusCode } = await api
                    .get('/api/v1/course/category/test-id')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(404);
          });
     });

     describe('given it exists', () => {
          it('should return the category', async () => {
               CourseCategoryModel.findById = jest.fn().mockResolvedValueOnce(courseCategoryFixtures.testCourse);

               const { statusCode, body } = await api
                    .get('/api/v1/course/category/test-id')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(200);
               expect(body).toEqual(courseCategoryFixtures.testCourse);
          });
     });
});
