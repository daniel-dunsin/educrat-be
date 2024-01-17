import LectureModel from '../models/lecture/lecture.model';
import { CreateLectureDTO, UpdateLectureDTO } from '../schema/dto/lecture.dto';
import _ from 'lodash';
import ServiceException from '../schema/exception/service.exception';

export async function createLecture(data: CreateLectureDTO) {
     return await LectureModel.create({
          moduleId: data.moduleId,
          title: data.title,
     });
}

export async function updateLecture(data: UpdateLectureDTO) {
     const lecture = await LectureModel.findByIdAndUpdate(
          data.id,
          { ..._.omit(data, 'id') },
          { new: true, runValidators: true }
     );

     if (!lecture) throw new ServiceException(404, 'Lecture does not exist');

     return lecture;
}

export async function deleteLecture(lectureId: string) {
     const lecture = await LectureModel.findByIdAndDelete(lectureId);

     if (!lecture) throw new ServiceException(404, 'Lecture does not exist');

     return lecture;
}

export async function getLectures(moduleId: string) {
     return await LectureModel.find({ moduleId });
}
