import supertest from 'supertest';
import redisCache from '../../../services/cache.service';
import authFixtures from '../../fixtures/auth.fixture';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import CourseModel from '../../../models/course.model';
import courseFixtures from '../../fixtures/course.fixtures';
import * as cloudinary from '../../../config/upload.config';
import { CourseStatus } from '../../../schema/enums/course.enums';

// for permissions and authorization
beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

const api = supertest(app);

describe('update course', () => {
     it('should update the course perfectly', async () => {
          CourseModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(courseFixtures.courseResponse);

          const { statusCode, body } = await api
               .put(`/api/v1/course/${courseFixtures.courseResponse._id}`)
               .send({ ...courseFixtures.request })
               .set('authorization', `Bearer ${authFixtures.accessToken}`);

          expect(statusCode).toBe(200);
     });
});

describe('update course thumbnail', () => {
     it('should update the thumbnail perfectly', async () => {
          // @ts-ignore
          CourseModel.findById = jest.fn(() => ({
               select: jest.fn().mockResolvedValueOnce(courseFixtures.courseResponse),
          }));
          // @ts-ignore
          cloudinary.uploadResource = jest.fn().mockResolvedValueOnce({
               public_id: courseFixtures.courseResponse.thumbnailId,
               url: courseFixtures.courseResponse.thumbnail,
          });
          // @ts-ignore
          cloudinary.deleteResource = jest.fn().mockResolvedValueOnce(null);

          const { statusCode, body } = await api
               .put(`/api/v1/course/${courseFixtures.courseResponse._id}/thumbnail`)
               .send({ image: courseFixtures.thumbnail })
               .set('authorization', `Bearer ${authFixtures.accessToken}`);

          expect(statusCode).toBe(200);
     });
});

describe('update course status', () => {
     it('should return the status that was provided', async () => {
          // @ts-ignore
          CourseModel.findByIdAndUpdate = jest.fn(({}, { status }) => ({ ...courseFixtures.courseResponse, status }));

          const status = CourseStatus.REJECTED;

          const { statusCode, body } = await api
               .put(`/api/v1/course/${courseFixtures.courseResponse._id}/status`)
               .send({ status })
               .set('authorization', `Bearer ${authFixtures.accessToken}`);

          expect(statusCode).toBe(200);
          expect(body).toHaveProperty('status', status);
     });
});
