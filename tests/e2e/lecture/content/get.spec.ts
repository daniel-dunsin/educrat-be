import LectureModel from '../../../../models/lecture/lecture.model';
import lectureFixtures from '../../../fixtures/lecture.fixture';
import jwt from 'jsonwebtoken';
import redisCache from '../../../../services/cache.service';
import authFixtures from '../../../fixtures/auth.fixture';
import roleFixtures from '../../../fixtures/role.fixture';
import supertest from 'supertest';
import app from '../../../../app';

beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

const api = supertest(app);

describe('Get Lecture Content', () => {
     it('should return course content', async () => {
          LectureModel.findById = jest
               .fn()
               .mockResolvedValueOnce({ ...lectureFixtures.lectureResponse, contentType: null });

          const { statusCode } = await api.get(`/api/v1/lecture/content/lecture/${lectureFixtures.lectureId}`);

          expect(statusCode).toBe(200);
     });
});
