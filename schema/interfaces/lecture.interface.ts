import Collections from '../enums/collections.enums';
import { LectureResourceSource } from '../enums/course.enums';
import { Relations } from '../types/base.type';
import { Course } from './course.interface';
import { DefaultModel } from './index.interface';
import { Module } from './module.interface';

export interface Lecture extends DefaultModel {
     title: string;
     description: string;
     moduleId: Relations<Module>;
     contentType: Collections.LECTURE_ARTICLE | Collections.LECTURE_VIDEO;
     content: LectureArticle | LectureVideo;
     resources: LectureResource[];
}

export interface LectureArticle extends DefaultModel {
     title: string;
     body: string;
     viewSpan: number;
     lectureId: Relations<Lecture>;
}

export interface LectureVideo extends DefaultModel {
     title: string;
     viewSpan: number;
     url: string;
     lectureId: Relations<Lecture>;
}

export interface LectureResource extends DefaultModel {
     source: LectureResourceSource;
     title: string;
     url: string;
     publicId: string;
     type: string;
     lectureId: Relations<Lecture>;
}
