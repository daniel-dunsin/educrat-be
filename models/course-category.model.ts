import mongoose from 'mongoose';
import createSchema from '.';
import { CourseCategory } from '../schema/interfaces/course.interface';
import Collections from '../schema/enums/collections.enums';

const CourseCategorySchema = createSchema<CourseCategory>({
     name: { type: String, required: true },
     description: { type: String, default: '' },
});

const CourseCategoryModel = mongoose.model(Collections.COURSE_CATEGORY, CourseCategorySchema);

export default CourseCategoryModel;
