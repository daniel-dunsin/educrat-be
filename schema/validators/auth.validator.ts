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

export const verifyAccountInput = object({
     body: object({
          code: string().required('code is required'),
          token: string().required('token is required'),
     }),
});

export const requestVerificationInput = object({
     body: object({
          email: string().required('email is required').email('enter a valid email'),
     }),
});

export const signInInput = object({
     body: object({
          credential: string().required('credential is required'),
          password: string().required('password is required').min(8, 'Password should not be less than 8 characters'),
     }),
});

export const googleAuthInput = object({
     body: object({
          accessToken: string().required('accessToken is required'),
     }),
});
