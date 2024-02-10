import CompletedLectureModel from '../models/enrollment/completed-lectures.model';
import LectureModel from '../models/lecture/lecture.model';
import ModuleModel from '../models/module/module.model';
import { Course } from '../schema/interfaces/course.interface';

export function isCoursePublishable(course: Course): boolean {
     const requiredFields: Array<keyof Course> = ['title', 'description', 'category', 'thumbnail'];

     return requiredFields.every((field) => course[field]);
}

export function getArticleDuration(body: string): number {
     const AVERAGE_WORDS_PER_MINUTE = 200;

     let words = body.split(/[,\s]+/);

     words = words.filter((word) => word.length > 0);

     const minutes = words.length / AVERAGE_WORDS_PER_MINUTE;

     return minutes * 60;
}

export async function getEnrollmentProgress(courseId: string, enrollmentId: string): Promise<number> {
     return await ModuleModel.find({ courseId }).then(async (modules) => {
          const modulesId = modules.map((module) => ({ moduleId: module._id }));
          const lectures = await LectureModel.find({ $or: modulesId });
          const completedLectures = await CompletedLectureModel.find({ enrollmentId });

          return completedLectures.length / lectures.length;
     });
}
