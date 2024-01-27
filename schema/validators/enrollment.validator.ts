import { object, string } from 'yup';

export const markLectureAsCompletedInput = object({
     body: object({
          lectureId: string().required('provide lectureId'),
     }),
});

export const markLectureAsUncompletedInput = object({
     body: object({
          lectureId: string().required('provide lectureId'),
     }),
});
