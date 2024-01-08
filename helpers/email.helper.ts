import { Data, renderFile } from 'ejs';
import { join } from 'path';
import ServiceException from '../schema/exception/service.exception';
import secrets from '../constants/secrets.const';

export function renderEmailTemplate<T extends Data = {}>(template: string, data: T): string {
     const path = join(__dirname, secrets.nodeEnv === 'production' ? '../../templates/' : '../templates/', template);

     let html = '';

     renderFile(path, data, (error, result) => {
          if (error) {
               throw new ServiceException(400, `Unable to render template ${error.message || error}`);
          }
          html = result;
     });

     return html;
}
