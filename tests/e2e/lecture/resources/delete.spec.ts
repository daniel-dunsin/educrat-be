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

describe('Delete Resource', () => {
     it('should create the resource', async () => {
          // @ts-ignore
          jest.spyOn(cloudinary, 'deleteResource').mockResolvedValueOnce();
          LectureResourceModel.findOne = jest.fn().mockResolvedValueOnce({
               ...lectureFixtures.resourceResponse,
               source: 'donwloadable',
               publicId: 'testpublicId',
          });

          const { statusCode, body } = await api
               .delete(`/api/v1/lecture/resource/${lectureFixtures.lectureId}`)
               .set('Authorization', `Bearer ${authFixtures.accessToken}`)
               .send(lectureFixtures.downloadableResourceRequest);

          expect(statusCode).toBe(200);
     });
});
