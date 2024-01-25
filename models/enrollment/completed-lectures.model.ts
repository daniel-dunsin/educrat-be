import mongoose, { Types } from 'mongoose';
import createSchema from '..';
import { CompletedLecture } from '../../schema/interfaces/enrollment.interface';
import Collections from '../../schema/enums/collections.enums';

const CompletedLecturesSchema = createSchema<CompletedLecture>({
     enrollmentId: {
          type: Types.ObjectId,
          ref: Collections.ENROLLMENT,
     },

     lectureId: {
          type: Types.ObjectId,
          ref: Collections.LECTURE,
     },
});

const CompletedLectureModel = mongoose.model(Collections.COMPLETED_LECTURES, CompletedLecturesSchema);
export default CompletedLectureModel;
