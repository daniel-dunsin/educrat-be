import { Types } from 'mongoose';

const categoryId = String(new Types.ObjectId());
const courseId = String(new Types.ObjectId());

const thumbnail =
     "'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAk8AAAKZCAYAAAChoM9cAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUABSHTSURBVHgB7L1nkixJth523CMys7S6ouXMdAN8BGlGMw5WgOEKCK4AjyvA4woGWAHAFTxgBQBWgIER/='";

const request = {
     title: 'testtitle',
     subtitle: 'testsubtitle',
     description: 'testdescription',
     category: categoryId,
     preRequisites: ['testPreRequisite1', 'testPreRequisite2', 'testPreRequiste3'],
     complexityLevel: 'expert',
     learningObjectives: ['obj1', 'obj2', 'obj3'],
     language: 'English',
     status: 'draft',
};

const courseResponse = {
     _id: courseId,
     ...request,
     thumbnail,
     thumbnailId: 'TestthumbnailId',
     save: jest.fn().mockResolvedValueOnce(null),
};

const courseFixtures = {
     courseResponse,
     request,
     thumbnail,
     categoryId,
};

export default courseFixtures;
