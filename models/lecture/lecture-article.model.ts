import mongoose, { Types } from 'mongoose';
import createSchema from '..';
import { LectureArticle } from '../../schema/interfaces/lecture.interface';
import Collections from '../../schema/enums/collections.enums';

const LectureArticleSchema = createSchema<LectureArticle>({
     title: { type: String, required: true },
     body: { type: String, required: true },
     duration: { type: Number, required: true },
     lectureId: { type: Types.ObjectId, ref: Collections.LECTURE },
});

const LectureArticleModel = mongoose.model(Collections.LECTURE_ARTICLE, LectureArticleSchema);

export default LectureArticleModel;
