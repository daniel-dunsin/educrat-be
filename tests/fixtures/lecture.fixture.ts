import { Types } from 'mongoose';

const moduleId = String(new Types.ObjectId());
const lectureId = String(new Types.ObjectId());
const resourceId = String(new Types.ObjectId());

const lectureRequest = {
     title: 'testtitle',
     description: 'testdescription',
};

const downloadableResourceRequest = {
     title: 'testtitle',
     file: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAk8AAAKZCAYAAAChoM9cAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUABSHTSURBVHgB7L1nkixJth523CMys7S6ouXMdAN8BGlGMw5WgOEKCK4AjyvA4woGWAHAFTxgBQBWgIER/=`,
     type: 'application/pdf',
};

const externalResourceRequest = {
     title: 'testtitle',
     url: 'testurl.com',
};

const resourceResponse = {
     title: 'testtitle',
     url: 'testurl',
     source: 'downloadble/external',
     lectureId,
     type: 'testtype',
     deleteOne: jest.fn().mockResolvedValueOnce(null),
};

const lectureResponse = {
     ...lectureRequest,
     contentType: 'testContentType',
     resources: [resourceResponse],
};

const lectureFixtures = {
     lectureResponse,
     resourceResponse,
     resourceId,
     lectureId,
     externalResourceRequest,
     downloadableResourceRequest,
     lectureRequest,
     moduleId,
};

export default lectureFixtures;
