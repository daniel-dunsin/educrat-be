import { ComplexityLevel, CourseCategories, CourseStatus } from '../enums/course.enums';
import { Relations } from '../types/base.type';
import { DefaultModel } from './index.interface';
import { Module } from './module.interface';
import { User } from './user.interface';

export interface Course extends DefaultModel {
     title: string;
     slug: string;
     subtitle: string;
     description: string;
     language: string;
     thumbnail: string;
     thumbnailId: string;
     category: Relations<CourseCategory>;
     learningObjectives: string[];
     preRequisites: string[];
     complexityLevel: ComplexityLevel;
     status: CourseStatus;
     userId: Relations<User>;
     modules: Module[];
}

export interface CourseCategory extends DefaultModel {
     name: CourseCategories | string;
     description: string;
     slug: string;
}
