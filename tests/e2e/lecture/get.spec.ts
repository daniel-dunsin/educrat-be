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

describe('Get Lectures', () => {
     it('should return the lectures', async () => {
          const result = [lectureFixtures.lectureResponse];
          // @ts-ignore
          LectureModel.find = jest.fn(() => ({
               populate: jest.fn().mockResolvedValueOnce(result),
          }));

          const { statusCode, body } = await api
               .get(`/api/v1/lecture/module/${lectureFixtures.moduleId}`)
               .set('Authorization', `Bearer ${authFixtures.accessToken}`);

          expect(statusCode).toBe(200);
          expect(body).toEqual(result);
     });
});
