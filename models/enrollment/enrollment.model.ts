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

const EnrollmentModel = mongoose.model(Collections.ENROLLMENT, EnrollmentSchema);

export default EnrollmentModel;
