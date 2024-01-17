import mongoose from 'mongoose';
import createSchema from '..';
import Collections from '../../schema/enums/collections.enums';
import { Lecture } from '../../schema/interfaces/lecture.interface';

const LectureSchema = createSchema<Lecture>({
     title: { type: String, required: true },
     description: { type: String },
     contentType: { type: String, enum: [Collections.LECTURE_ARTICLE, Collections.LECTURE_VIDEO], default: null },
});

LectureSchema.virtual('content', {
     ref: (document: Lecture) => document.contentType,
     localField: '_id',
     foreignField: 'lectureId',
     justOne: true,
});

LectureSchema.virtual('resources', {
     ref: Collections.LECTURE_RESOURCE,
     justOne: false,
     foreignField: 'lectureId',
     localField: '_id',
});

const LectureModel = mongoose.model(Collections.LECTURE, LectureSchema);

export default LectureModel;
