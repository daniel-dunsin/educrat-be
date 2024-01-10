import mongoose from 'mongoose';
import createSchema from '.';
import DEFAULT_IMAGES from '../constants/images.const';
import { User } from '../schema/interfaces/user.interface';
import Collections from '../schema/enums/collections.enums';

const UserSchema = createSchema<User>({
     firstName: {
          type: String,
          required: [true, 'firstName is required'],
          trim: true,
     },
     lastName: { type: String, required: false },
     email: {
          type: String,
          required: [true, 'email is required'],
          unique: true,
          trim: true,
          match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'enter a valid email'],
     },
     username: {
          type: String,
          required: [true, 'username is required'],
          trim: true,
     },
     profilePicture: {
          type: String,
          default: DEFAULT_IMAGES.profilePicture,
     },
     profilePictureId: {
          type: String,
          default: '',
     },
     about: {
          type: String,
          default: '',
     },
     headline: {
          type: String,
          default: '',
     },
});

UserSchema.index({ email: 1, username: 1 });

UserSchema.virtual('roles', {
     justOne: false,
     localField: '_id',
     foreignField: 'userId',
     ref: Collections.ROLE,
});

UserSchema.virtual('socials', {
     justOne: false,
     localField: '_id',
     foreignField: 'userId',
     ref: Collections.SOCIALS,
});

const UserModel = mongoose.model(Collections.USER, UserSchema);
export default UserModel;
