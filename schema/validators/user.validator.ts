import { object, string } from 'yup';

export const updateUserInput = object({
     body: object({
          about: string().default(''),
     }),
});

export const becomeInstructorInput = object({
     body: object({
          about: string().default(''),
     }),
});
