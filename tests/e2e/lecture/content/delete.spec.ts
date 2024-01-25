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

describe('Delete Video', () => {
     it('should delete the video', async () => {
          jest.spyOn(cloudinary, 'deleteResource').mockResolvedValueOnce();
          // @ts-ignore
          LectureVideoModel.findOneAndDelete = jest.fn(() => ({
               select: jest.fn().mockResolvedValueOnce(lectureFixtures.videoResponse),
          }));
          LectureModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);

          const { statusCode, body } = await api
               .delete(`/api/v1/lecture/content/video/${'test_video_id'}`)
               .set('authorization', `Bearer ${authFixtures.accessToken}`);

          expect(statusCode).toBe(200);
     });
});

describe('Delete Article', () => {
     it('should delete the article', async () => {
          LectureArticleModel.findOneAndDelete = jest.fn().mockResolvedValueOnce(lectureFixtures.articleResponse);

          const { statusCode, body } = await api
               .delete(`/api/v1/lecture/content/article/${'test_article_id'}`)
               .set('authorization', `Bearer ${authFixtures.accessToken}`);

          expect(statusCode).toBe(200);
     });
});
