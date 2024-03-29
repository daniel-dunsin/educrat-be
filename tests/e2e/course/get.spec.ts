import supertest from 'supertest';
import CourseModel from '../../../models/course/course.model';
import courseFixtures from '../../fixtures/course.fixtures';
import app from '../../../app';
import redisCache from '../../../services/cache.service';

const api = supertest(app);

describe('get all courses', () => {
     it('should return all courses', async () => {
          const response = [courseFixtures.courseResponse];
          jest.spyOn(redisCache, 'get').mockResolvedValueOnce(null);
          // @ts-ignore
          CourseModel.find = jest.fn(() => ({
               populate: jest.fn(() => ({
                    populate: jest.fn().mockResolvedValueOnce(response),
               })),
          }));

          const { body, statusCode } = await api.get('/api/v1/course');

          expect(statusCode).toBe(200);
     });
});

describe('get single course', () => {
     describe("given it doesn't exist", () => {
          it('should throw an error', async () => {
               jest.spyOn(redisCache, 'get').mockResolvedValueOnce(null);
               // @ts-ignore
               CourseModel.findById = jest.fn(() => ({
                    populate: jest.fn(() => ({
                         populate: jest.fn(() => ({
                              populate: jest.fn().mockResolvedValueOnce(null),
                         })),
                    })),
               }));

               const { statusCode } = await api.get(`/api/v1/course/${courseFixtures.courseResponse._id}`);

               expect(statusCode).toBe(404);
          });
     });

     describe('given it exists', () => {
          it('should return the course', async () => {
               jest.spyOn(redisCache, 'get').mockResolvedValueOnce(null);
               // @ts-ignore
               CourseModel.findById = jest.fn(() => ({
                    populate: jest.fn(() => ({
                         populate: jest.fn(() => ({
                              populate: jest.fn(() => {
                                   return courseFixtures.courseResponse;
                              }),
                         })),
                    })),
               }));
               jest.spyOn(redisCache, 'set').mockResolvedValueOnce(null);

               const { statusCode, body } = await api.get(`/api/v1/course/${courseFixtures.courseResponse._id}`);

               expect(statusCode).toBe(200);
          });
     });
});
