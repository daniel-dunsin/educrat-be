import { object, string } from 'yup';

export const signUpInput = object({
     body: object({
          email: string().required('email is required').email('enter a valid email'),
          username: string().required('username is required'),
          password: string().required('password is required').min(8, 'password should not be less than 8 characters'),
          firstName: string().required('firstName is required'),
          lastName: string().notRequired().default(''),
     }),
});
