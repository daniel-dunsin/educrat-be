import DEFAULT_MATCHERS from '../constants/regex.const';

export function isBase64(resource: string): boolean {
     const matcher = DEFAULT_MATCHERS.base64;

     return matcher.test(resource);
}

export function getFileType(base64: string): string {
     const data = base64.substring(base64.indexOf('/') + 1, base64.indexOf(';base64'));

     return data;
}
