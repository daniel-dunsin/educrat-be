import { Request } from 'express';
import asyncHandler from '../../helpers/async.helper';
import { CreateLectureArticleDTO, CreateLectureVideoDTO } from '../../schema/dto/lecture.dto';
import {
     createLectureArticle,
     createLectureVideo,
     deleteLectureArticle,
     deleteLectureVideo,
     getLectureContent,
} from '../../services/lecture.service';

export const createLectureArticleController = asyncHandler(
     async (req: Request<{ id: string }, {}, CreateLectureArticleDTO>, res) => {
          const lectureId = req.params.id;
          const data = await createLectureArticle({ ...req.body, lectureId });

          res.status(201).json(data);
     }
);

export const createLectureVideoController = asyncHandler(
     async (req: Request<{ id: string }, {}, CreateLectureVideoDTO>, res) => {
          const lectureId = req.params.id;

          const data = await createLectureVideo({ ...req.body, lectureId });

          res.status(201).json(data);
     }
);

export const deleteLectureArticleController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const articleId = req.params.id;

     await deleteLectureArticle(articleId);

     res.status(200).json({ message: 'article deleted' });
});

export const deleteLectureVideoController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const videoId = req.params.id;

     await deleteLectureVideo(videoId);

     res.status(200).json({ message: 'video deleted' });
});

export const getLectureContentController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const lectureId = req.params.id;

     const data = await getLectureContent(lectureId);

     res.status(200).json(data);
});
