import supertest from 'supertest';
import redisCache from '../../../services/cache.service';
import authFixtures from '../../fixtures/auth.fixture';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import moduleFixtures from '../../fixtures/module.fixture';
import ModuleModel from '../../../models/module/module.model';

// for permissions and authorization
beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
});

const api = supertest(app);

describe('get course modules', () => {
     it('should return the modules', async () => {
          ModuleModel.find = jest.fn().mockResolvedValueOnce([moduleFixtures.moduleResponse]);
          const { statusCode } = await api
               .get(`/api/v1/module/course/${moduleFixtures.request.courseId}`)
               .set('Authorization', `Bearer ${authFixtures.accessToken}`);

          expect(statusCode).toBe(200);
     });
});
