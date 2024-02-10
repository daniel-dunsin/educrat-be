import { Relations } from '../types/base.type';
import { Course } from './course.interface';
import { DefaultModel } from './index.interface';
import { Lecture } from './lecture.interface';
import { User } from './user.interface';

export interface Enrollment extends DefaultModel {
     courseId: Relations<Course>;
     userId: Relations<User>;
     completedLectures: CompletedLecture[];
     progress: number;
}

export interface CompletedLecture extends DefaultModel {
     lectureId: Relations<Lecture>;
     enrollmentId: Relations<Enrollment>;
}
