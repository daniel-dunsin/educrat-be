import { getEnrollmentProgress } from '../helpers/course.helper';
import CompletedLectureModel from '../models/enrollment/completed-lectures.model';
import EnrollmentModel from '../models/enrollment/enrollment.model';
import { EnrollmentDTO, CompletedLectureDTO } from '../schema/dto/enrollment.dto';
import ServiceException from '../schema/exception/service.exception';

export async function createEnrollment(data: EnrollmentDTO) {
     const { courseId, userId } = data;

     const dbEnrollment = await EnrollmentModel.findOne({ userId, courseId });

     if (dbEnrollment) throw new ServiceException(400, 'User is already enrolled to this course');

     return await EnrollmentModel.create({ courseId, userId });
}

export async function getSingleEnrollment(enrollmentId: string) {
     const enrollment = await EnrollmentModel.findById(enrollmentId)
          .populate([
               {
                    path: 'courseId',
                    populate: {
                         path: 'modules',
                         populate: {
                              path: 'lectures',
                              populate: [{ path: 'content' }, { path: 'resources' }],
                         },
                    },
               },
               {
                    path: 'completedLectures',
               },
          ])
          .select('-userId');

     if (!enrollment) throw new ServiceException(404, 'Enrollment does not exist');

     enrollment.progress = await getEnrollmentProgress(enrollment?.id, enrollment?.courseId as string);

     return enrollment;
}

export async function getUserEnrollments(userId: string) {
     let enrollments = await EnrollmentModel.find({ userId }).populate([{ path: 'courseId' }, { path: 'progress' }]);

     enrollments = await Promise.all(
          enrollments.map(async (enrollment) => {
               enrollment.progress = await getEnrollmentProgress(enrollment?.id, enrollment?.courseId as string);
               return enrollment;
          })
     );

     return enrollments;
}

export async function markLectureAsCompleted(data: CompletedLectureDTO) {
     return await EnrollmentModel.findById(data.enrollmentId).then(async (enrollment) => {
          if (!enrollment) throw new ServiceException(404, 'Enrollment not found');

          const lecture = await CompletedLectureModel.findOne({
               lectureId: data.lectureId,
               enrollmentId: data.enrollmentId,
          });
          if (lecture) throw new ServiceException(400, 'Lecture has been marked as completed');
          return await CompletedLectureModel.create({
               lectureId: data.lectureId,
               enrollmentId: data.enrollmentId,
          });
     });
}

export async function markLectureAsUncompleted(data: CompletedLectureDTO) {
     return await EnrollmentModel.findById(data.enrollmentId).then(async (enrollment) => {
          if (!enrollment) throw new ServiceException(404, 'Enrollment not found');
          const lecture = await CompletedLectureModel.findOneAndDelete({
               lectureId: data.lectureId,
               enrollmentId: data.enrollmentId,
          });

          if (!lecture) throw new ServiceException(400, 'Lecture as not been marked as completed');
     });
}
