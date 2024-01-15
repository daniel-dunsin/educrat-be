import { array, object, string } from 'yup';
import { ComplexityLevel, CourseStatus } from '../enums/course.enums';
import DEFAULT_MATCHERS from '../../constants/regex.const';

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
          complexityLevel: string()
               .notRequired()
               .equals(
                    Object.values(ComplexityLevel),
                    `Complexity level must be either ${ComplexityLevel.BEGINNER}, ${ComplexityLevel.INTERMEDIATE} or ${ComplexityLevel.EXPERT}`
               ),
     }),
});

export const updateCourseThumbnailInput = object({
     body: object({
          image: string().required('image is required').matches(DEFAULT_MATCHERS.base64, 'Upload base64 image'),
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
