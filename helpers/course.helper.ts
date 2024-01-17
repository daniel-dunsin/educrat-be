import { Course } from '../schema/interfaces/course.interface';

export function isCoursePublishable(course: Course): boolean {
     const requiredFields: Array<keyof Course> = ['title', 'description', 'category', 'thumbnail'];

     return requiredFields.every((field) => course[field]);
}
