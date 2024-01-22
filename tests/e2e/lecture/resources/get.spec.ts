import supertest from 'supertest';
import redisCache from '../../../../services/cache.service';
import authFixtures from '../../../fixtures/auth.fixture';
import roleFixtures from '../../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../../app';
import lectureFixtures from '../../../fixtures/lecture.fixture';
import LectureResourceModel from '../../../../models/lecture/lecture-resource.model';

beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

const api = supertest(app);

describe('get resources', () => {
     it('should return the resources', async () => {
          const result = [lectureFixtures.lectureResponse];
          LectureResourceModel.find = jest.fn().mockResolvedValueOnce(result);

          const { statusCode, body } = await api
               .get(`/api/v1/lecture/resource/lecture/${lectureFixtures.lectureId}`)
               .set('Authorization', `Bearer ${authFixtures.accessToken}`);

          expect(statusCode).toBe(200);
          expect(body).toEqual(result);
     });
});
