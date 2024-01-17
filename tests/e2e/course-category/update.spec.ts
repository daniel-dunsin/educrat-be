import jwt from 'jsonwebtoken';
import authFixtures from '../../fixtures/auth.fixture';
import supertest from 'supertest';
import app from '../../../app';
import redisCache from '../../../services/cache.service';
import roleFixtures from '../../fixtures/role.fixture';
import CourseCategoryModel from '../../../models/course/course-category.model';
import courseCategoryFixtures from '../../fixtures/course-category.fixture';

const api = supertest(app);

describe('update course category', () => {
     beforeEach(() => {
          jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
          // for permission middleware
          redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
     });

     describe("given it doesn't exist", () => {
          it('should throw an error', async () => {
               CourseCategoryModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);

               const { statusCode } = await api
                    .put('/api/v1/course/category/test-id')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(404);
          });
     });

     describe('given it exists', () => {
          it('should update and return the category', async () => {
               CourseCategoryModel.findByIdAndUpdate = jest
                    .fn()
                    .mockResolvedValueOnce(courseCategoryFixtures.testCourse);

               const { statusCode, body } = await api
                    .put('/api/v1/course/category/test-id')
                    .set('authorization', `Bearer ${authFixtures.accessToken}`)
                    .send(courseCategoryFixtures.testCourse);

               expect(statusCode).toBe(200);
               expect(body).toEqual(courseCategoryFixtures.testCourse);
          });
     });
});
