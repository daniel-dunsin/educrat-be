import mongoose, { Types } from 'mongoose';
import createSchema from '.';
import Collections from '../schema/enums/collections.enums';
import { Socials } from '../schema/interfaces/socials.interface';
import { SocialsTypes } from '../schema/enums/socials.enum';

const SocialSchema = createSchema<Socials>({
     userId: {
          type: Types.ObjectId,
          required: true,
          ref: Collections.USER,
     },
     type: {
          type: String,
          enum: Object.values(SocialsTypes),
          required: true,
     },
     url: {
          type: String,
          default: '',
     },
});

SocialSchema.index({ type: 1 });

const SocialsModel = mongoose.model(Collections.SOCIALS, SocialSchema);
export default SocialsModel;
