import { ComplexityLevel, CourseStatus } from '../enums/course.enums';

export interface CreateCourseDTO {
     title: string;
     category: string;
     userId: string;
}

export interface UpdateCourseDTO {
     title?: string;
     category?: string;
     id: string;
     subtitle?: string;
     description?: string;
     language?: string;
     learningObjectives?: string[];
     preRequisites?: string[];
     complexityLevel?: ComplexityLevel;
}

export interface UpdateCourseThumbnailDTO {
     image: string;
     id: string;
}

export interface UpdateCourseStatusDTO {
     id: string;
     status: CourseStatus;
}
