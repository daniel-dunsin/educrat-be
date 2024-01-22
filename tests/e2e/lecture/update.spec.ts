import supertest from 'supertest';
import redisCache from '../../../services/cache.service';
import authFixtures from '../../fixtures/auth.fixture';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import lectureFixtures from '../../fixtures/lecture.fixture';
import LectureModel from '../../../models/lecture/lecture.model';

beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

const api = supertest(app);

describe('Update Lecture', () => {
     describe('given it does not exist', () => {
          it('should throw an error', async () => {
               LectureModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);

               const { statusCode } = await api
                    .put(`/api/v1/lecture/${lectureFixtures.moduleId}`)
                    .set('Authorization', `Bearer ${authFixtures.accessToken}`)
                    .send(lectureFixtures.lectureRequest);

               expect(statusCode).toBe(404);
          });
     });

     describe('given it exist', () => {
          it('should update the lecture', async () => {
               LectureModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(lectureFixtures.lectureResponse);

               const { statusCode, body } = await api
                    .put(`/api/v1/lecture/${lectureFixtures.moduleId}`)
                    .set('Authorization', `Bearer ${authFixtures.accessToken}`)
                    .send(lectureFixtures.lectureRequest);

               expect(statusCode).toBe(200);
               expect(body).toEqual(lectureFixtures.lectureResponse);
          });
     });
});
