import mongoose, { Types } from 'mongoose';
import createSchema from '..';
import Collections from '../../schema/enums/collections.enums';
import { Lecture } from '../../schema/interfaces/lecture.interface';
import LectureArticleModel from './lecture-article.model';
import LectureResourceModel from './lecture-resource.model';
import LectureVideoModel from './lecture-video.model';

const LectureSchema = createSchema<Lecture>({
     title: { type: String, required: true },
     description: { type: String },
     contentType: {
          type: String,
          enum: [Collections.LECTURE_ARTICLE, Collections.LECTURE_VIDEO],
          default: null,
     },
     moduleId: {
          type: Types.ObjectId,
          ref: Collections.MODULE,
          required: true,
     },
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

LectureSchema.post('findOneAndDelete', async function (next) {
     // @ts-ignore
     const id = this._conditions._id as string;
     await LectureArticleModel.deleteMany({ lectureId: id }).exec();

     await LectureResourceModel.deleteMany({ lectureId: id }).exec();

     await LectureVideoModel.deleteMany({ lectureId: id }).exec();
});

const LectureModel = mongoose.model(Collections.LECTURE, LectureSchema);

export default LectureModel;
