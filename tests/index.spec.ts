import supertest from 'supertest';
import app from '../app';

const api = supertest(app);

describe('test index route', () => {
     it('should not exist', async () => {
          const { statusCode } = await api.get('/');
          expect(statusCode).toBe(404);
     });
});
