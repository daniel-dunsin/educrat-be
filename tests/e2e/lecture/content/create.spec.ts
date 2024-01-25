import supertest from 'supertest';
import redisCache from '../../../../services/cache.service';
import authFixtures from '../../../fixtures/auth.fixture';
import roleFixtures from '../../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import app from '../../../../app';
import lectureFixtures from '../../../fixtures/lecture.fixture';
import * as cloudinary from '../../../../config/upload.config';
import LectureModel from '../../../../models/lecture/lecture.model';
import LectureVideoModel from '../../../../models/lecture/lecture-video.model';
import LectureArticleModel from '../../../../models/lecture/lecture-article.model';

beforeEach(() => {
     jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     // for permission middleware
     redisCache.get = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);
     LectureModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);
});

const api = supertest(app);

describe('Create Video', () => {
     it('should create the video', async () => {
          jest.spyOn(cloudinary, 'uploadResource').mockResolvedValueOnce({
               url: 'testurl',
               public_id: 'test_public_id',
          });
          LectureVideoModel.create = jest.fn().mockResolvedValueOnce(lectureFixtures.videoResponse);

          const { statusCode, body } = await api
               .post(`/api/v1/lecture/content/lecture/${lectureFixtures.lectureId}/video`)
               .set('authorization', `Bearer ${authFixtures.accessToken}`)
               .send(lectureFixtures.videoRequest);

          expect(statusCode).toBe(201);
          expect(body).toEqual(lectureFixtures.videoResponse);
     });
});

describe('Create Article', () => {
     it('should create the article', async () => {
          LectureArticleModel.create = jest.fn().mockResolvedValueOnce(lectureFixtures.articleResponse);

          const { statusCode, body } = await api
               .post(`/api/v1/lecture/content/lecture/${lectureFixtures.lectureId}/article`)
               .set('authorization', `Bearer ${authFixtures.accessToken}`)
               .send(lectureFixtures.articleRequest);

          expect(statusCode).toBe(201);
          expect(body).toEqual(lectureFixtures.articleResponse);
     });
});
