import mongoose, { Types } from 'mongoose';
import createSchema from '.';
import { RoleNames } from '../schema/enums/role.enums';
import { Role } from '../schema/interfaces/roles.interface';
import Collections from '../schema/enums/collections.enums';

const RoleSchema = createSchema<Role>({
     name: { type: String, required: true, enum: Object.values(RoleNames) },
     description: { type: String, default: 'role description' },
     userId: { type: Types.ObjectId, ref: Collections.USER, required: [true, 'role userId is required'] },
});

const RoleModel = mongoose.model(Collections.ROLE, RoleSchema);
export default RoleModel;
