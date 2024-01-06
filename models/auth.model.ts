import mongoose from 'mongoose';
import createSchema from '.';
import { Auth } from '../schema/interfaces/user.interface';
import Collections from '../schema/enums/collections.enums';

const AuthSchema = createSchema<Auth>({
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

const AuthModel = mongoose.model(Collections.AUTH, AuthSchema);

export default AuthModel;
