import { object, string } from 'yup';

export const createModuleInput = object({
     params: object({
          id: string().required('course id is required'),
     }),
     body: object({
          title: string().required('title is required'),
          learningObjective: string().required('learningObjective is required'),
     }),
});

export const updateModuleInput = object({
     params: object({
          id: string().required('module id is required'),
     }),
     body: object({
          title: string().notRequired(),
          learningObjective: string().notRequired(),
     }),
});
