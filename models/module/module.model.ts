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

ModuleSchema.pre(/delete/i, function (next) {
     // @ts-ignore
     LectureModel.deleteMany({ moduleId: this._id }).exec();
     next();
});

const ModuleModel = mongoose.model(Collections.MODULE, ModuleSchema);

export default ModuleModel;
