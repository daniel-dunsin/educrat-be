import supertest from 'supertest';
import redisCache from '../../../services/cache.service';
import authFixtures from '../../fixtures/auth.fixture';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import EnrollmentModel from '../../../models/enrollment/enrollment.model';
import enrollmentFixture from '../../fixtures/enrollment.fixture';

const api = supertest(app);

beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

describe('Create Enrollment', () => {
     describe('given user is already enrolled', () => {
          it('should throw an error', async () => {
               EnrollmentModel.findOne = jest.fn().mockResolvedValueOnce(enrollmentFixture.response);

               const { statusCode } = await api
                    .post(`/api/v1/enrollment/course/${enrollmentFixture.courseId}`)
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(400);
          });
     });

     describe('given us in not enrolled', () => {
          it('should enroll user', async () => {
               EnrollmentModel.findOne = jest.fn().mockResolvedValueOnce(null);
               EnrollmentModel.create = jest.fn().mockResolvedValueOnce(enrollmentFixture.response);

               const { statusCode } = await api
                    .post(`/api/v1/enrollment/course/${enrollmentFixture.courseId}`)
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(201);
          });
     });
});
