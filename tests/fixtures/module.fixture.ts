import { Types } from 'mongoose';

const moduleId = String(new Types.ObjectId());
const courseId = String(new Types.ObjectId());

const request = {
     title: 'TestTitle',
     learningObjective: 'TestLearningObjective',
     courseId,
};

const moduleResponse = {
     ...request,
     lectures: [],
     _id: moduleId,
};

const moduleFixtures = {
     moduleResponse,
     request,
     moduleId,
};

export default moduleFixtures;
