import supertest from 'supertest';
import app from '../app';

const api = supertest(app);

describe('test index route', () => {
     it('should route to documentation', async () => {
          const { redirect } = await api.get('/');
          expect(redirect).toBe(true);
     });
});
