import { Types } from 'mongoose';
import { RoleNames } from '../../schema/enums/role.enums';

const userId = String(new Types.ObjectId());

const studentRole = {
     name: RoleNames.STUDENT,
     description: '',
     userId: userId,
};

const roleFixtures = {
     studentRole,
};

export default roleFixtures;
