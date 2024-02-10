import { Request } from 'express';
import asyncHandler from '../../helpers/async.helper';
import { CreateLectureDTO, UpdateLectureDTO } from '../../schema/dto/lecture.dto';
import {
     createLecture,
     deleteLecture,
     getLectures,
     getSingleLecture,
     updateLecture,
} from '../../services/lecture.service';

export const createLectureController = asyncHandler(async (req: Request<{ id: string }, {}, CreateLectureDTO>, res) => {
     const moduleId = req.params.id;

     const data = await createLecture({ ...req.body, moduleId });

     res.status(201).json(data);
});

export const updateLectureController = asyncHandler(async (req: Request<{ id: string }, {}, UpdateLectureDTO>, res) => {
     const lectureId = req.params.id;

     const data = await updateLecture({ ...req.body, id: lectureId });

     res.status(200).json(data);
});

export const deleteLectureController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const lectureId = req.params.id;

     await deleteLecture(lectureId);

     res.status(200).json({ message: 'lecture deleted' });
});

export const getLecturesController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const moduleId = req.params.id;

     const data = await getLectures(moduleId);

     res.status(200).json(data);
});

export const getSingleLectureController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const lectureId = req.params.id;

     const data = await getSingleLecture(lectureId);

     res.status(200).json(data);
});
