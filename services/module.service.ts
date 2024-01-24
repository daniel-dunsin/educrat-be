import ModuleModel from '../models/module/module.model';
import { CreateModuleDTO, UpdateModuleDTO } from '../schema/dto/module.dto';
import ServiceException from '../schema/exception/service.exception';
import { getSingleCourse } from './course.service';
import _ from 'lodash';

export async function createModule(data: CreateModuleDTO) {
     const course = await getSingleCourse(data.courseId);

     return await ModuleModel.create({
          courseId: course?._id,
          title: data.title,
          learningObjective: data.learningObjective,
     });
}

export async function updateModule(data: UpdateModuleDTO) {
     const module = await ModuleModel.findByIdAndUpdate(
          data.id,
          { ..._.omit(data, 'id') },
          { new: true, runValidators: true }
     );

     if (!module) throw new ServiceException(404, 'Module does not exist');

     return module;
}

export async function deleteModule(moduleId: string) {
     const module = await ModuleModel.findOneAndDelete({ _id: moduleId });

     if (!module) throw new ServiceException(404, 'Module does not exist');

     return module;
}

export async function getModules(courseId: string) {
     return await ModuleModel.find({ courseId }).populate({
          path: 'lectures',
          populate: [{ path: 'content' }, { path: 'resources' }],
     });
}

export async function getSingleModule(moduleId: string) {
     const module = await ModuleModel.findById(moduleId).populate({
          path: 'lectures',
          populate: [{ path: 'content' }, { path: 'resources' }],
     });

     if (!module) throw new ServiceException(404, 'Module does non exist');

     return module;
}
