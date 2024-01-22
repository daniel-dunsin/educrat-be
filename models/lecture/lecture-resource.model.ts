import mongoose, { Types } from 'mongoose';
import createSchema from '..';
import { LectureResource } from '../../schema/interfaces/lecture.interface';
import Collections from '../../schema/enums/collections.enums';
import { LectureResourceSource } from '../../schema/enums/course.enums';

const LectureResourceSchema = createSchema<LectureResource>({
     title: { type: String, required: true },
     url: { type: String, required: true },
     publicId: { type: String, select: false },
     lectureId: { type: Types.ObjectId, ref: Collections.LECTURE },
     type: { type: String },
     source: { type: String, enum: Object.values(LectureResourceSource), required: true },
});

const LectureResourceModel = mongoose.model(Collections.LECTURE_RESOURCE, LectureResourceSchema);

export default LectureResourceModel;
