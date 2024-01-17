import mongoose from 'mongoose';
import createSchema from '..';
import Collections from '../../schema/enums/collections.enums';
import { Lecture } from '../../schema/interfaces/lecture.interface';
import LectureArticleModel from './lecture-article.model';
import LectureResourceModel from './lecture-resource.model';
import LectureVideoModel from './lecture-video.model';

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

LectureSchema.pre(/delete/i, function (next) {
     // @ts-ignore
     LectureArticleModel.deleteMany({ lectureId: this._id }).exec();
     // @ts-ignore
     LectureResourceModel.deleteMany({ lectureId: this._id }).exec();
     // @ts-ignore
     LectureVideoModel.deleteMany({ lectureId: this._id }).exec();

     next();
});

const LectureModel = mongoose.model(Collections.LECTURE, LectureSchema);

export default LectureModel;
