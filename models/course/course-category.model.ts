import mongoose from 'mongoose';
import createSchema from '..';
import { CourseCategory } from '../../schema/interfaces/course.interface';
import Collections from '../../schema/enums/collections.enums';
import { CourseCategories } from '../../schema/enums/course.enums';
import slugify from '../../helpers/slugify.helper';

const CourseCategorySchema = createSchema<CourseCategory>({
     name: {
          type: String,
          required: true,
          unique: true,
          trim: true,
     },
     slug: { type: String },
     description: { type: String, default: '' },
});

CourseCategorySchema.pre('save', function () {
     if (this.isModified('name')) {
          this.slug = slugify(this.name);
     }

     return;
});

const CourseCategoryModel = mongoose.model(Collections.COURSE_CATEGORY, CourseCategorySchema);

export default CourseCategoryModel;
