import { array, object, string } from 'yup';
import { CourseStatus } from '../enums/course.enums';

export const createCourseInput = object({
     body: object({
          title: string().required('title is required'),
          category: string().required('category is required'),
     }),
});

export const updateCourseInput = object({
     body: object({
          title: string().notRequired(),
          subtitle: string().notRequired(),
          description: string().notRequired(),
          language: string().notRequired(),
          category: string().notRequired(),
          learningObjectives: array(string()).notRequired(),
          preRequisites: array(string()).notRequired(),
          complexityLevel: string().notRequired(),
     }),
});

export const updateCourseThumbnailInput = object({
     body: object({
          image: string().required('image is required'),
     }),
});

export const updateCourseStatusInput = object({
     body: object({
          status: string().equals(
               Object.values(CourseStatus),
               `Status must be either ${CourseStatus.DRAFT}, ${CourseStatus.PUBLISHED} or ${CourseStatus.REJECTED}`
          ),
     }),
});
