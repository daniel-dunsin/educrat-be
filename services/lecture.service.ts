import LectureModel from '../models/lecture/lecture.model';
import {
     CreateDownloadableLectureResourceDTO,
     CreateExternalResourceDTO,
     CreateLectureDTO,
     UpdateLectureDTO,
} from '../schema/dto/lecture.dto';
import _ from 'lodash';
import ServiceException from '../schema/exception/service.exception';
import LectureResourceModel from '../models/lecture/lecture-resource.model';
import { deleteResource, uploadResource } from '../config/upload.config';
import { LectureResourceSource } from '../schema/enums/course.enums';

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
     const lecture = await LectureModel.findOneAndDelete({ _id: lectureId });

     if (!lecture) throw new ServiceException(404, 'Lecture does not exist');

     return lecture;
}

export async function getLectures(moduleId: string) {
     return await LectureModel.find({ moduleId }).populate({ path: 'resources' });
}

export async function createDownloadableLectureResource(data: CreateDownloadableLectureResourceDTO) {
     const { url, public_id } = await uploadResource(data.file);

     const resource = await LectureResourceModel.create({
          url,
          title: data.title,
          publicId: public_id,
          type: data.type,
          lectureId: data.lectureId,
          source: LectureResourceSource.DOWNLOADABLE,
     });

     return resource;
}

export async function createExternalLectureResource(data: CreateExternalResourceDTO) {
     const resource = await LectureResourceModel.create({
          url: data.url,
          title: data.title,
          lectureId: data.lectureId,
          source: LectureResourceSource.EXTERNAL,
     });

     return resource;
}

export async function deleteLectureResource(resourceId: string) {
     const resource = await LectureResourceModel.findById(resourceId);

     if (!resource) throw new ServiceException(404, 'Resource does not exist');

     if (resource?.source === LectureResourceSource.DOWNLOADABLE && resource.publicId) {
          await deleteResource(resource.publicId);
     }

     await resource.deleteOne();
}

export async function getLectureResources(lectureId: string) {
     const resources = await LectureResourceModel.find({ lectureId });

     return resources;
}
