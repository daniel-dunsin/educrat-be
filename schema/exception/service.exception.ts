export default class ServiceException<T = string> extends Error {
     statusCode: number;

     constructor(statusCode: number, message: T) {
          super(message as string);
          this.statusCode = statusCode;
          Error.captureStackTrace(this, this.constructor);
     }
}
