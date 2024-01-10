import supertest from 'supertest';
import app from '../../../app';
import UserModel from '../../../models/user.model';
import authFixtures from '../../fixtures/auth.fixture';
import socialsFixture from '../../fixtures/socials.fixture';
import RoleModel from '../../../models/role.model';
import roleFixtures from '../../fixtures/role.fixture';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import redisCache from '../../../services/cache.service';
import SocialsModel from '../../../models/socials.model';
import * as cloudinary from '../../../config/upload.config';

const api = supertest(app);

const dataset = {
     about: authFixtures.userResponse.about,
     headline: authFixtures.userResponse.headline,
     socials: [socialsFixture.twitter, socialsFixture.linkedin],
     profilePicture:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAk8AAAKZCAYAAAChoM9cAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUABSHTSURBVHgB7L1nkixJth523CMys7S6ouXMdAN8BGlGMw5WgOEKCK4AjyvA4woGWAHAFTxgBQBWgIER/=',
};

describe('Become Instructor', () => {
     beforeEach(() => {
          jwt.verify = jest.fn().mockResolvedValueOnce({ userId: authFixtures.userId });
     });

     describe('Given user is already an instructor', () => {
          it('should throw an error', async () => {
               UserModel.findById = jest.fn().mockResolvedValueOnce(authFixtures.userResponse);
               RoleModel.findOne = jest.fn().mockResolvedValueOnce(roleFixtures.instructorRole);

               const { statusCode } = await api
                    .put('/api/v1/user/instructor')
                    .send(dataset)
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(400);
          });
     });

     describe('Given user is not yet an instructor', () => {
          it('should be successful', async () => {
               UserModel.findById = jest.fn().mockResolvedValue(authFixtures.userResponse);
               RoleModel.findOne = jest.fn().mockResolvedValueOnce(null);
               // @ts-ignore
               mongoose.connection.startSession = jest.fn(() => ({
                    then: jest.fn(() => ({
                         startTransaction: jest.fn().mockReturnThis(),
                         commitTransaction: jest.fn().mockReturnThis(),
                         abortTransaction: jest.fn().mockReturnThis(),
                    })),
               }));
               UserModel.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(() => ({
                    populate: jest.fn(() => ({ populate: jest.fn().mockResolvedValueOnce(authFixtures.userResponse) })),
               }));
               redisCache.set = jest.fn().mockResolvedValueOnce(null);
               SocialsModel.findOneAndUpdate = jest.fn().mockResolvedValue(authFixtures.userResponse.socials[0]);
               redisCache.delete = jest.fn().mockResolvedValue(null);
               // @ts-ignore
               cloudinary.uploadResource = jest.fn().mockResolvedValueOnce({
                    public_id: authFixtures.userResponse.profilePictureId,
                    url: authFixtures.userResponse.profilePicture,
               });
               // @ts-ignore
               cloudinary.deleteResource = jest.fn().mockResolvedValueOnce(null);
               RoleModel.create = jest.fn().mockResolvedValueOnce(null);

               const { statusCode } = await api
                    .put('/api/v1/user/instructor')
                    .send(dataset)
                    .set('authorization', `Bearer ${authFixtures.accessToken}`);

               expect(statusCode).toBe(200);
          });
     });
});
