import mongoose, { Types } from 'mongoose';
import createSchema from '..';
import { Enrollment } from '../../schema/interfaces/enrollment.interface';
import Collections from '../../schema/enums/collections.enums';
import ModuleModel from '../module/module.model';
import LectureModel from '../lecture/lecture.model';
import CompletedLectureModel from './completed-lectures.model';

const EnrollmentSchema = createSchema<Enrollment>({
     courseId: {
          type: Types.ObjectId,
          ref: Collections.COURSE,
          required: true,
     },

     userId: {
          type: Types.ObjectId,
          ref: Collections.USER,
          required: true,
     },
});
EnrollmentSchema.virtual('completedLectures', {
     justOne: false,
     ref: Collections.COMPLETED_LECTURES,
     foreignField: 'enrollmentId',
     localField: '_id',
});

EnrollmentSchema.virtual('progress', {
     justOne: true,
     getters: true,
     localField: '_id',
     foreignField: '_id',
     get: async function (this): Promise<number> {
          const { courseId, enrollmentId } = this;

          return await ModuleModel.find({ courseId }).then(async (modules) => {
               const modulesId = modules.map((module) => ({ moduleId: module._id }));
               const lectures = await LectureModel.find({ $or: modulesId });
               const completedLectures = await CompletedLectureModel.find({ enrollmentId });

               return completedLectures.length / lectures.length;
          });
     },
});

const EnrollmentModel = mongoose.model(Collections.ENROLLMENT, EnrollmentSchema);

export default EnrollmentModel;
