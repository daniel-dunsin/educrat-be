import { Request } from 'express';
import asyncHandler from '../../helpers/async.helper';
import {
     createCategory,
     deleteCategory,
     getAllCategories,
     getSingleCategory,
     updateCategory,
} from '../../services/course-category.service';
import { CreateCourseCategoryDTO, UpdateCourseCategoryDTO } from '../../schema/dto/course-category.dto';

export const getAllCatgoriesController = asyncHandler(async (req, res) => {
     const data = await getAllCategories();

     res.status(200).json(data);
});

export const getSingleCategoryController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     const data = await getSingleCategory(req.params.id);

     res.status(200).json(data);
});

export const deleteCategoryController = asyncHandler(async (req: Request<{ id: string }>, res) => {
     await deleteCategory(req.params.id);

     res.status(200).json({ message: 'category deleted successfully' });
});

export const updateCategoryController = asyncHandler(
     async (req: Request<{ id: string }, {}, UpdateCourseCategoryDTO>, res) => {
          const id = req.params.id;

          const data = await updateCategory({ ...req.body, id });

          res.status(200).json(data);
     }
);

export const createCategoryController = asyncHandler(async (req: Request<{}, {}, CreateCourseCategoryDTO>, res) => {
     const data = await createCategory(req.body);

     res.status(201).json(data);
});
