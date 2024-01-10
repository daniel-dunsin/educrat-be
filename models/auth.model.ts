import mongoose from 'mongoose';
import createSchema from '.';
import { Auth } from '../schema/interfaces/user.interface';
import Collections from '../schema/enums/collections.enums';
import DEFAULT_MATCHERS from '../constants/regex.const';

const AuthSchema = createSchema<Auth>({
     email: {
          type: String,
          required: [true, 'email is required'],
          unique: true,
          trim: true,
          match: [DEFAULT_MATCHERS.email, 'enter a valid email'],
     },
     username: {
          type: String,
          required: [true, 'username is required'],
          trim: true,
     },
     password: {
          type: String,
          required: false,
          default: '',
     },
     verified: {
          type: Boolean,
          default: false,
     },
});

AuthSchema.index({ email: 1, username: 1 });

const AuthModel = mongoose.model(Collections.AUTH, AuthSchema);

export default AuthModel;
