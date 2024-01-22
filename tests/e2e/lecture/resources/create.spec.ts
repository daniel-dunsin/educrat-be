import supertest from 'supertest';
import redisCache from '../../../../services/cache.service';
import authFixtures from '../../../fixtures/auth.fixture';
import roleFixtures from '../../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../../app';
import lectureFixtures from '../../../fixtures/lecture.fixture';
import * as cloudinary from '../../../../config/upload.config';
import LectureResourceModel from '../../../../models/lecture/lecture-resource.model';

beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
     LectureResourceModel.create = jest.fn().mockResolvedValueOnce(lectureFixtures.resourceResponse);
});

const api = supertest(app);

describe('Create Downloadable Resource', () => {
     it('should create the resource', async () => {
          jest.spyOn(cloudinary, 'uploadResource').mockResolvedValueOnce({
               url: 'test_url',
               public_id: 'test_public_id',
          });

          const { statusCode, body } = await api
               .post(`/api/v1/lecture/resource/lecture/${lectureFixtures.lectureId}/downloadable`)
               .set('Authorization', `Bearer ${authFixtures.accessToken}`)
               .send(lectureFixtures.downloadableResourceRequest);

          expect(statusCode).toBe(201);
          expect(body).toEqual(lectureFixtures.resourceResponse);
     });
});

describe('Create External Resource', () => {
     it('should create the resource', async () => {
          const { statusCode, body } = await api
               .post(`/api/v1/lecture/resource/lecture/${lectureFixtures.lectureId}/external`)
               .set('Authorization', `Bearer ${authFixtures.accessToken}`)
               .send(lectureFixtures.externalResourceRequest);

          expect(statusCode).toBe(201);
          expect(body).toEqual(lectureFixtures.resourceResponse);
     });
});
