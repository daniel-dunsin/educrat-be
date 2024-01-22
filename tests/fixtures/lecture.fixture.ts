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
     file: 'application/pdf;base64,JVBERi0xLjcKCjQgMCBvYmoKKElkZW50aXR5KQplbmRvYmoKNSAwIG9iagooQWRvYmUpCmVuZG9iago4IDAgb2JqCjw8Ci9GaWx0ZXIgL0ZsYXRlRGVjb2RlCi9MZW5ndGggNzMyNDAKL0xlbmd0aDEgMzQ3MzkyCi9UeXBlIC9TdHJlYW0KPj4Kc3RyZWFtCnic7J0JYFTVvfD',
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
