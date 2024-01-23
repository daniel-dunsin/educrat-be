import { number, object, string } from 'yup';
import DEFAULT_MATCHERS from '../../constants/regex.const';

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

export const createDownloadableResourceInput = object({
     params: object({
          id: string().required('lecture id is required'),
     }),

     body: object({
          title: string().required('title is required'),
          file: string().required('file is required').matches(DEFAULT_MATCHERS.base64, 'Upload a valid base64'),
          type: string().required('file type is required'),
     }),
});

export const createExternalResourceInput = object({
     params: object({
          id: string().required('lecture id is required'),
     }),

     body: object({
          title: string().required('title is required'),
          url: string().required('url is required'),
     }),
});

export const createLectureVideoInput = object({
     params: object({
          id: string().required('lecture id is required'),
     }),

     body: object({
          title: string().required('title is required'),
          file: string().required('file is required').matches(DEFAULT_MATCHERS.base64, 'Upload a base64 video as file'),
          duration: number().required('video duration is required'),
     }),
});

export const createLectureArticleInput = object({
     params: object({
          id: string().required('lecture id is required'),
     }),

     body: object({
          title: string().required('title is required'),
          body: string().required('body is required'),
     }),
});
