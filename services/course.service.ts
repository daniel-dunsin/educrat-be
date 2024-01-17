import CourseModel from '../models/course.model';
import {
     CreateCourseDTO,
     UpdateCourseDTO,
     UpdateCourseStatusDTO,
     UpdateCourseThumbnailDTO,
} from '../schema/dto/course.dto';
import _ from 'lodash';
import ServiceException from '../schema/exception/service.exception';
import { deleteResource, uploadResource } from '../config/upload.config';

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
     const course = await CourseModel.findByIdAndUpdate(
          data.id,
          { status: data.status },
          { new: true, runValidators: true }
     );

     if (!course) throw new ServiceException(404, 'Course does not exist');

     return course;
}

export async function getSingleCourse(id: string) {
     const course = await CourseModel.findById(id)
          .populate({ path: 'category', select: ['name', 'description', '_id'] })
          .populate({ path: 'userId', select: '-profilePictureId' });

     if (!course) throw new ServiceException(404, 'Course does not exist');

     return course;
}

export async function getCourses() {
     return await CourseModel.find({})
          .populate({ path: 'category', select: ['name', 'description', '_id'] })
          .populate({ path: 'userId', select: '-profilePictureId' });
}