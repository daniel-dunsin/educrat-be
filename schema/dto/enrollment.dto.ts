export interface EnrollmentDTO {
     userId: string;
     courseId: string;
}

export interface CompletedLectureDTO {
     lectureId: string;
     enrollmentId: string;
}
