import { Types } from 'mongoose';
import { SocialsTypes } from '../../schema/enums/socials.enum';

const userId = String(new Types.ObjectId());

const twitter = { type: SocialsTypes.TWITTER, url: 'https://twitter.com', userId };
const linkedin = { type: SocialsTypes.LINKEDIN, url: 'https://linkedin.com', userId };

const socialsFixture = { twitter, linkedin };

export default socialsFixture;
