import mongoose, { Types } from 'mongoose';
import createSchema from '..';
import { Module } from '../../schema/interfaces/module.interface';
import Collections from '../../schema/enums/collections.enums';
import LectureModel from '../lecture/lecture.model';

const ModuleSchema = createSchema<Module>({
     title: { type: String, required: true },
     learningObjective: { type: String, required: true },
     courseId: { type: Types.ObjectId, ref: Collections.COURSE },
});

ModuleSchema.virtual('lectures', {
     justOne: false,
     ref: Collections.LECTURE,
     foreignField: 'moduleId',
     localField: '_id',
});

ModuleSchema.post('findOneAndDelete', async function (next) {
     // @ts-ignore
     const id = this._conditions._id as string;

     await LectureModel.deleteMany({ moduleId: id }).exec();
});

const ModuleModel = mongoose.model(Collections.MODULE, ModuleSchema);

export default ModuleModel;
