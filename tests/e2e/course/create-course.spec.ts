import supertest from 'supertest';
import redisCache from '../../../services/cache.service';
import authFixtures from '../../fixtures/auth.fixture';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import courseFixtures from '../../fixtures/course.fixtures';
import CourseModel from '../../../models/course.model';

const api = supertest(app);

beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

describe('create course', () => {
     describe('given title was not provided', () => {
          it('should throw an error', async () => {
               const { error, statusCode } = await api
                    .post('/api/v1/course')
                    .send({ title: undefined, category: undefined })
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/ValidationError/i);
          });
     });

     describe('given both of them were provided', () => {
          it('should create the course', async () => {
               CourseModel.create = jest.fn().mockResolvedValueOnce(courseFixtures.courseResponse);

               const { body, statusCode } = await api
                    .post('/api/v1/course')
                    .send({ title: courseFixtures.request.title, category: courseFixtures.request.category })
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(201);
               expect(body).toEqual(courseFixtures.courseResponse);
          });
     });
});
