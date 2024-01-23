import mongoose, { Types } from 'mongoose';
import createSchema from '..';
import { LectureVideo } from '../../schema/interfaces/lecture.interface';
import Collections from '../../schema/enums/collections.enums';

const LectureVideoSchema = createSchema<LectureVideo>({
     title: { type: String, required: true },
     url: { type: String, required: true },
     publicId: { type: String, required: true },
     duration: { type: Number, required: true },
     lectureId: { type: Types.ObjectId, ref: Collections.LECTURE },
});

const LectureVideoModel = mongoose.model(Collections.LECTURE_VIDEO, LectureVideoSchema);

export default LectureVideoModel;
