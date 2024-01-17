import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../../helpers/async.helper';
import { CreateModuleDTO, UpdateModuleDTO } from '../../schema/dto/module.dto';
import { createModule, deleteModule, getModules, updateModule } from '../../services/module.service';

export const createModuleController = asyncHandler(async (req: Request<{ id: string }, {}, CreateModuleDTO>, res) => {
     const courseId = req.params.id;
     const data = await createModule({ ...req.body, courseId });

     res.status(201).json(data);
});

export const updateModuleController = asyncHandler(async (req: Request<{ id: string }, {}, UpdateModuleDTO>, res) => {
     const moduleId = req.params.id;
     const data = await updateModule({ ...req.body, id: moduleId });

     res.status(200).json(data);
});

export const getModulesController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const courseId = req.params.id;
     const data = await getModules(courseId);

     res.status(200).json(data);
});

export const deleteModuleController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const moduleId = req.params.id;
     await deleteModule(moduleId);

     res.status(200).json({ message: 'module deleted' });
});
