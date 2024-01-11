import { object, string } from 'yup';

export const updateCategoryInput = object({
     params: object({
          id: string().required('Id is required'),
     }),
     body: object({
          name: string().notRequired(),
          description: string().notRequired(),
     }),
});

export const createCategoryInput = object({
     body: object({
          name: string().required('name is required'),
          description: string().required('description is required'),
     }),
});
