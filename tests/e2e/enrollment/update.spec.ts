import supertest from 'supertest';
import redisCache from '../../../services/cache.service';
import authFixtures from '../../fixtures/auth.fixture';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import courseFixtures from '../../fixtures/course.fixtures';
import CourseModel from '../../../models/course/course.model';
import EnrollmentModel from '../../../models/enrollment/enrollment.model';
import enrollmentFixture from '../../fixtures/enrollment.fixture';
import CompletedLectureModel from '../../../models/enrollment/completed-lectures.model';

const api = supertest(app);

beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

describe('Mark Lecture as completed', () => {
     it('should mark the lecture as completed', async () => {
          EnrollmentModel.findById = jest.fn().mockResolvedValueOnce(enrollmentFixture.response);
          CompletedLectureModel.findOne = jest.fn().mockResolvedValueOnce(null);
          CompletedLectureModel.create = jest.fn().mockResolvedValueOnce(enrollmentFixture.completedLectures[0]);

          const { statusCode } = await api
               .post(`/api/v1/enrollment/${enrollmentFixture.enrollmentId}/lecture/complete`)
               .set('authorization', `Bearer ${authFixtures.accessToken}`)
               .send({ lectureId: enrollmentFixture.lectureId });

          expect(statusCode).toBe(200);
     });
});

describe('Mark Lecture as Uncompleted', () => {
     it('should mark the lecture as uncompleted', async () => {
          EnrollmentModel.findById = jest.fn().mockResolvedValueOnce(enrollmentFixture.response);
          CompletedLectureModel.findOneAndDelete = jest
               .fn()
               .mockResolvedValueOnce(enrollmentFixture.completedLectures?.[0]);

          const { statusCode } = await api
               .post(`/api/v1/enrollment/${enrollmentFixture.enrollmentId}/lecture/unfinished`)
               .set('authorization', `Bearer ${authFixtures.accessToken}`)
               .send({ lectureId: enrollmentFixture.lectureId });

          expect(statusCode).toBe(200);
     });
});
