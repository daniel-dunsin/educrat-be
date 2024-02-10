import LectureModel from '../models/lecture/lecture.model';
import {
     CreateDownloadableLectureResourceDTO,
     CreateExternalResourceDTO,
     CreateLectureArticleDTO,
     CreateLectureDTO,
     CreateLectureVideoDTO,
     UpdateLectureDTO,
} from '../schema/dto/lecture.dto';
import _ from 'lodash';
import ServiceException from '../schema/exception/service.exception';
import LectureResourceModel from '../models/lecture/lecture-resource.model';
import { deleteResource, uploadResource } from '../config/upload.config';
import { LectureResourceSource } from '../schema/enums/course.enums';
import LectureArticleModel from '../models/lecture/lecture-article.model';
import Collections from '../schema/enums/collections.enums';
import LectureVideoModel from '../models/lecture/lecture-video.model';
import { LectureArticle, LectureVideo } from '../schema/interfaces/lecture.interface';
import { getArticleDuration } from '../helpers/course.helper';

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

export async function getSingleLecture(lectureId: string) {
     const lecture = await LectureModel.findById(lectureId).populate([{ path: 'resources' }, { path: 'content' }]);

     return lecture;
}

export async function getLectures(moduleId: string) {
     return await LectureModel.find({ moduleId }).populate({ path: 'resources' }).populate({ path: 'content' });
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

export async function createLectureArticle(data: CreateLectureArticleDTO) {
     const duration = getArticleDuration(data.body);

     const article = await LectureArticleModel.create({
          lectureId: data.lectureId,
          title: data.title,
          body: data.body,
          duration,
     });

     await LectureModel.findByIdAndUpdate(
          data.lectureId,
          { contentType: Collections.LECTURE_ARTICLE },
          { new: true, runValidators: true }
     );

     return article;
}

export async function createLectureVideo(data: CreateLectureVideoDTO) {
     const { url, public_id } = await uploadResource(data.file, { resource_type: 'video' });

     const video = await LectureVideoModel.create({
          lectureId: data.lectureId,
          title: data.title,
          url,
          publicId: public_id,
          duration: data.duration,
     });

     await LectureModel.findByIdAndUpdate(
          data.lectureId,
          { contentType: Collections.LECTURE_VIDEO },
          { new: true, runValidators: true }
     );

     return video;
}

export async function deleteLectureArticle(articleId: string) {
     const article = await LectureArticleModel.findOneAndDelete({ _id: articleId });
     if (!article) throw new ServiceException(404, 'Lecture article does not exist');

     await LectureModel.findByIdAndUpdate(article.lectureId, { contentType: null }, { new: true, runValidators: true });
}

export async function deleteLectureVideo(videoId: string) {
     const video = await LectureVideoModel.findOneAndDelete({ _id: videoId }).select('publicId');
     if (!video) throw new ServiceException(404, 'Lecture Video does not exist');
     await deleteResource(video.publicId);

     await LectureModel.findByIdAndUpdate(video.lectureId, { contentType: null }, { new: true, runValidators: true });
}

export async function getLectureContent(lectureId: string) {
     let content: LectureVideo | LectureArticle | null = null;

     const lecture = await LectureModel.findById(lectureId);

     if (!lecture) throw new ServiceException(404, 'Lecture does not exist');
     if (lecture.contentType === Collections.LECTURE_ARTICLE) {
          content = await LectureArticleModel.findOne({ lectureId });
     } else if (lecture.contentType === Collections.LECTURE_VIDEO) {
          content = await LectureVideoModel.findOne({ lectureId });
     }

     return content;
}
