import { array, object, string } from 'yup';
import DEFAULT_MATCHERS from '../../constants/regex.const';

export const updateUserInput = object({
     body: object({
          about: string().notRequired(),
          headline: string().notRequired(),
     }),
});

export const becomeInstructorInput = object({
     body: object({
          about: string().required('about is required'),
          profilePicture: string()
               .required('profilePicture is required')
               .matches(DEFAULT_MATCHERS.base64, 'Upload image base64'),
          headline: string().required('headline is required'),
          socials: array(object({ type: string(), url: string() })).default([]),
     }),
});

export const updateProfilePictureInput = object({
     body: object({
          profilePicture: string()
               .required('profilePicture is required')
               .matches(DEFAULT_MATCHERS.base64, 'Upload image base64'),
     }),
});

export const updateSocialsInput = object({
     body: object({
          socials: array(object({ type: string(), url: string() })).default([]),
     }),
});
