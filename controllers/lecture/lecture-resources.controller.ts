import { Request } from 'express';
import asyncHandler from '../../helpers/async.helper';
import { CreateDownloadableLectureResourceDTO, CreateExternalResourceDTO } from '../../schema/dto/lecture.dto';
import {
     createDownloadableLectureResource,
     createExternalLectureResource,
     deleteLectureResource,
     getLectureResources,
} from '../../services/lecture.service';

export const createDownloadableResourceController = asyncHandler(
     async (req: Request<{ id: string }, {}, CreateDownloadableLectureResourceDTO>, res) => {
          const lectureId = req.params.id;
          const data = await createDownloadableLectureResource({ ...req.body, lectureId });

          res.status(201).json(data);
     }
);

export const createExternalResourceController = asyncHandler(
     async (req: Request<{ id: string }, {}, CreateExternalResourceDTO>, res) => {
          const lectureId = req.params.id;
          const data = await createExternalLectureResource({ ...req.body, lectureId });

          res.status(201).json(data);
     }
);

export const deleteLectureResourceController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const resourceId = req.params.id;

     await deleteLectureResource(resourceId);

     res.status(200).json({ message: 'resource deleted' });
});

export const getLectureResourcesController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const lectureId = req.params.id;

     const data = await getLectureResources(lectureId);

     res.status(200).json(data);
});
