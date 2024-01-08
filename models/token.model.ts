import mongoose from 'mongoose';
import createSchema from '.';
import { TokenTypes } from '../schema/enums/auth.enums';
import { Token } from '../schema/interfaces/user.interface';
import Collections from '../schema/enums/collections.enums';

const TokenSchema = createSchema<Token>({
     email: {
          type: String,
          required: [true, 'email is required'],
          trim: true,
          match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'enter a valid email'],
     },
     code: {
          type: String,
          required: false,
     },
     type: {
          required: true,
          type: String,
          enum: Object.values(TokenTypes),
     },
     value: {
          type: String,
          required: true,
     },
});

TokenSchema.index({ email: 1 });

const TokenModel = mongoose.model(Collections.TOKEN, TokenSchema);
export default TokenModel;
