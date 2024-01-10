import DEFAULT_MATCHERS from '../constants/regex.const';

export function isBase64(resource: string): boolean {
     const matcher = DEFAULT_MATCHERS.base64;

     return matcher.test(resource);
}
