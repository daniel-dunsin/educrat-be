import mongoose, { Collection, Types } from 'mongoose';
import createSchema from '..';
import Collections from '../../schema/enums/collections.enums';
import { Course } from '../../schema/interfaces/course.interface';
import { ComplexityLevel, CourseStatus } from '../../schema/enums/course.enums';
import slugify from '../../helpers/slugify.helper';

const CourseSchema = createSchema<Course>({
     title: {
          type: String,
          required: true,
          trim: true,
     },
     slug: { type: String, select: false },
     subtitle: { type: String, default: '' },
     description: { type: String, default: '' },
     language: { type: String },
     thumbnail: { type: String },
     thumbnailId: { type: String, select: false },
     category: {
          type: Types.ObjectId,
          ref: Collections.COURSE_CATEGORY,
          required: true,
     },
     learningObjectives: {
          type: [{ type: String }],
          default: [],
     },
     preRequisites: {
          type: [{ type: String }],
          default: [],
     },
     complexityLevel: {
          type: String,
          enum: Object.values(ComplexityLevel),
     },
     status: {
          type: String,
          enum: Object.values(CourseStatus),
          default: CourseStatus.DRAFT,
     },
     userId: {
          type: Types.ObjectId,
          ref: Collections.USER,
          required: true,
     },
});

CourseSchema.virtual('modules', {
     ref: Collections.MODULE,
     localField: '_id',
     foreignField: 'courseId',
     justOne: false,
});

CourseSchema.pre('save', function () {
     if (this.isModified('title')) {
          this.slug = slugify(this.title);
     }
     return;
});

CourseSchema.index({ title: 1, slug: 1, status: 1 });

const CourseModel = mongoose.model(Collections.COURSE, CourseSchema);

export default CourseModel;
