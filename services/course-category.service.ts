import slugify from '../helpers/slugify.helper';
import CourseCategoryModel from '../models/course-category.model';
import { CreateCourseCategoryDTO, UpdateCourseCategoryDTO } from '../schema/dto/course-category.dto';
import ServiceException from '../schema/exception/service.exception';
import { CourseCategory } from '../schema/interfaces/course.interface';
import redisCache from './cache.service';
import _ from 'lodash';

export async function getAllCategories() {
     const categories = await redisCache.get<CourseCategory[]>('course-categories');

     if (!categories) {
          const categories = await CourseCategoryModel.find({}).select(['name', 'description', '_id']);
          await redisCache.set('course-categories', categories);
          return categories;
     }
     return categories;
}

export async function getSingleCategory(id: string) {
     let category = await redisCache.get<CourseCategory>(`course-categories:${id}`);

     if (!category) {
          category = await CourseCategoryModel.findById(id);
          if (!category) throw new ServiceException(404, 'Category does not exist');
          await redisCache.set(`course-categories:${id}`, category);
     }

     return category;
}

export async function createCategory(data: CreateCourseCategoryDTO) {
     const slug = slugify(data.name);
     const dbCategory = await CourseCategoryModel.findOne({ slug });

     if (dbCategory) throw new ServiceException(400, 'A category with a similar name already exists');

     return await CourseCategoryModel.create({
          name: data.name,
          description: data.description,
     });
}

export async function updateCategory(data: UpdateCourseCategoryDTO) {
     const category = await CourseCategoryModel.findByIdAndUpdate(
          data.id,
          { ..._.omit(data, 'id') },
          {
               new: true,
               runValidators: true,
          }
     );

     if (!category) throw new ServiceException(404, 'Category does not exist');
     await redisCache.set(`course-categories:${data.id}`, category);

     return category;
}

export async function deleteCategory(id: string) {
     const category = await CourseCategoryModel.findByIdAndDelete(id);

     if (!category) throw new ServiceException(404, 'Category does not exist');
     await redisCache.delete(`course-categories:${id}`);
}
