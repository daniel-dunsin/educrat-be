import CourseCategoryModel from '../models/course/course-category.model';
import { CourseCategories } from '../schema/enums/course.enums';
import { CourseCategory } from '../schema/interfaces/course.interface';
import redisCache from '../services/cache.service';

export default async function seed() {
     const data: Pick<CourseCategory, 'name' | 'description'>[] = [];

     const dbCategories = await CourseCategoryModel.find({});

     Object.values(CourseCategories).forEach((category) => {
          const categoryInDb = dbCategories?.find((dbCategory) => dbCategory.name === category);

          if (!categoryInDb) {
               data.push({
                    name: category,
                    description: `This is ${category} category`,
               });
          }
     });

     if (data.length > 0) {
          await CourseCategoryModel.create(data);
     }
}
