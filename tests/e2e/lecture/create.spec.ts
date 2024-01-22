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

describe('Create Lecture', () => {
     describe('given title is notprovided', () => {
          it('should not create the lecture', async () => {
               const { statusCode, error } = await api
                    .post(`/api/v1/lecture/module/${lectureFixtures.moduleId}`)
                    .set('Authorization', `Bearer ${authFixtures.accessToken}`)
                    .send({ title: undefined });

               expect(statusCode).toBe(400);
               // @ts-ignore
               expect(error.text).toMatch(/ValidationError/i);
          });
     });

     describe('given title is provided', () => {
          it('should create the lecture', async () => {
               // @ts-ignore
               jest.spyOn(LectureModel, 'create').mockResolvedValueOnce(lectureFixtures.lectureResponse);

               const { statusCode, body } = await api
                    .post(`/api/v1/lecture/module/${lectureFixtures.moduleId}`)
                    .set('Authorization', `Bearer ${authFixtures.accessToken}`)
                    .send({ title: lectureFixtures.lectureRequest.title });

               expect(statusCode).toBe(201);
               expect(body).toEqual(lectureFixtures.lectureResponse);
          });
     });
});
