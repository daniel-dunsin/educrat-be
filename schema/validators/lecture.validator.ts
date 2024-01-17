import { object, string } from 'yup';

export const createLectureInput = object({
     params: object({
          id: string().required('module id is required'),
     }),
     body: object({
          title: string().required('title is required'),
     }),
});

export const updateLectureInput = object({
     params: object({
          id: string().required('lecture id is required'),
     }),

     body: object({
          title: string().notRequired().strict(),
          description: string().notRequired().strict(),
     }),
});
