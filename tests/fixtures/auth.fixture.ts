import { Types } from 'mongoose';
import DEFAULT_IMAGES from '../../constants/images.const';
import { TokenTypes } from '../../schema/enums/auth.enums';
import { RoleNames } from '../../schema/enums/role.enums';
import roleFixtures from './role.fixture';
import socialsFixture from './socials.fixture';

const userId = String(new Types.ObjectId());
const tokenId = String(new Types.ObjectId());
const accessToken = 'testAccessToken';

const request = {
     username: 'testusername',
     email: 'testemail@gmail.com',
     firstName: 'testfirstName',
     lastName: 'testlastName',
     password: 'testpassword',
};

const hashedPassword = 'testHashedPassword';
const code = 'testcode';
const token = 'testtoken';

const authResponse = {
     _id: userId,
     username: request.username,
     email: request.email,
     verified: false,
     password: hashedPassword,
     save: jest.fn().mockResolvedValue(null),
};

const userResponse = {
     _id: userId,
     email: request.email,
     username: request.username,
     firstName: request.firstName,
     lastName: request.lastName,
     profilePicture: DEFAULT_IMAGES.profilePicture,
     roles: [roleFixtures.studentRole],
     biography: 'random description',
     headline: 'random headline',
     profilePictureId: 'random profile picture id',
     socials: [socialsFixture.twitter, socialsFixture.linkedin],
};

const verifyUserTokenResponse = {
     email: request.email,
     token,
     code,
     type: TokenTypes.userVerification,
     _id: tokenId,
     deleteOne: jest.fn().mockResolvedValueOnce(null),
};

const passwordResetTokenResponse = {
     email: request.email,
     token,
     code,
     type: TokenTypes.passwordReset,
     _id: tokenId,
     deleteOne: jest.fn().mockResolvedValueOnce(null),
};

const authFixtures = {
     request,
     token,
     code,
     hashedPassword,
     userResponse,
     authResponse,
     verifyUserTokenResponse,
     accessToken,
     userId,
     passwordResetTokenResponse,
};

export default authFixtures;
