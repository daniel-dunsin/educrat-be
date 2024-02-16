import { Types } from 'mongoose';

const courseId = String(new Types.ObjectId());
const lectureId = String(new Types.ObjectId());
const userId = String(new Types.ObjectId());
const enrollmentId = String(new Types.ObjectId());

const request = {
     courseId,
     userId,
};

const completedLectures = [{ enrollmentId, lectureId }];

const response = {
     ...request,
     _id: enrollmentId,
};

const enrollmentFixture = {
     response,
     request,
     completedLectures,
     courseId,
     lectureId,
     userId,
     enrollmentId,
};

export default enrollmentFixture;
