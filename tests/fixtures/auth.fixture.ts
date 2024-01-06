import { Types } from 'mongoose';
import DEFAULT_IMAGES from '../../constants/images.const';
import { TokenTypes } from '../../schema/enums/auth.enums';

const userId = String(new Types.ObjectId());
const tokenId = String(new Types.ObjectId());

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
};

const userResponse = {
     _id: userId,
     email: request.email,
     username: request.username,
     firstName: request.firstName,
     lastName: request.lastName,
     profilePicture: DEFAULT_IMAGES.profilePicture,
};

const verifyUserTokenResponse = {
     email: request.email,
     token,
     code,
     type: TokenTypes.userVerification,
     _id: tokenId,
};

const authFixtures = {
     request,
     token,
     code,
     hashedPassword,
     userResponse,
     authResponse,
     verifyUserTokenResponse,
};

export default authFixtures;
