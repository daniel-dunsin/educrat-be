import CourseModel from '../models/course/course.model';
import {
     CreateCourseDTO,
     UpdateCourseDTO,
     UpdateCourseStatusDTO,
     UpdateCourseThumbnailDTO,
} from '../schema/dto/course.dto';
import _ from 'lodash';
import ServiceException from '../schema/exception/service.exception';
import { deleteResource, uploadResource } from '../config/upload.config';
import { CourseStatus } from '../schema/enums/course.enums';
import { isCoursePublishable } from '../helpers/course.helper';
import redisCache from './cache.service';
import { Course } from '../schema/interfaces/course.interface';

export async function createCourse(data: CreateCourseDTO) {
     return await CourseModel.create(data);
}

export async function updateCourse(data: UpdateCourseDTO) {
     const course = await CourseModel.findByIdAndUpdate(
          data.id,
          { ..._.omit(data, 'id') },
          {
               new: true,
               runValidators: true,
          }
     );

     if (!course) throw new ServiceException(404, 'Course does not exist');

     await redisCache.delete(`course:${data.id}`);

     return course;
}

export async function updateCourseThumbnail(data: UpdateCourseThumbnailDTO) {
     const course = await CourseModel.findById(data.id).select('+thumbnailId');

     if (!course) throw new ServiceException(404, 'Course does not exist');

     const thumbnailId = course.thumbnailId;
     const thumbnail = course.thumbnail;

     const { public_id, url } = await uploadResource(data.image);

     if (thumbnailId) await deleteResource(thumbnailId);

     course.thumbnailId = public_id;
     course.thumbnail = url;

     return await course.save();
}

export async function updateCourseStatus(data: UpdateCourseStatusDTO) {
     const course = await CourseModel.findById(data.id);

     if (!course) throw new ServiceException(404, 'Course does not exist');

     if (data.status === CourseStatus.PUBLISHED) {
          if (!isCoursePublishable(course)) {
               throw new ServiceException(
                    404,
                    'Course must have title, description, category and thumbnail before it can be published'
               );
          }
     }

     course.status = data.status;

     return await course.save();
}

export async function getSingleCourse(id: string) {
     let course = await redisCache.get<Course>(`course:${id}`);

     if (!course) {
          course = await CourseModel.findById(id)
               .populate({ path: 'category', select: ['name', 'description', '_id'] })
               .populate({ path: 'userId', select: '-profilePictureId' })
               .populate({
                    path: 'modules',
                    select: '-courseId',
                    populate: {
                         path: 'lectures',
                         select: '-moduleId',
                         populate: [
                              { path: 'content', select: '-lectureId' },
                              { path: 'resources', select: '-lectureId' },
                         ],
                    },
               });

          if (!course) throw new ServiceException(404, 'Course does not exist');
          await redisCache.set(`course:${id}`, course);

          return course;
     }

     return course;
}

export async function getCourses() {
     return await CourseModel.find({})
          .populate({ path: 'category', select: ['name', 'description', '_id'] })
          .populate({ path: 'userId', select: '-profilePictureId' });
}

export async function getUserCourses(userId: string) {
     return await CourseModel.find({ userId })
          .populate({ path: 'category', select: ['name', 'description', '_id'] })
          .populate({ path: 'userId', select: '-profilePictureId' });
}
