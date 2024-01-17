import Collections from '../enums/collections.enums';
import { Relations } from '../types/base.type';
import { Course } from './course.interface';
import { DefaultModel } from './index.interface';
import { Lecture } from './lecture.interface';

export interface Module extends DefaultModel {
     title: string;
     learningObjective: string;
     courseId: Relations<Course>;
     lectures: Lecture[];
}
