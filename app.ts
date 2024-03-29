import express from 'express';
import cors from 'cors';
import errorHandler from './helpers/error.helper';
import routes from './routes';
import yamljs from 'yamljs';
import swagger from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';
import { join } from 'path';
import secrets from './constants/secrets.const';

const app = express();

const ONE_HOUR = 1000 * 60 * 60;
const MAX_REQUESTS = 300;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cors());
app.use(rateLimit({ windowMs: ONE_HOUR, max: MAX_REQUESTS }));

const doc_path = join(__dirname, secrets.nodeEnv === 'production' ? '../docs/v1.yaml' : './docs/v1.yaml');
const doc = yamljs.load(doc_path);
app.use('/api/v1/doc', swagger.serve, swagger.setup(doc));
app.use('/api/v1', routes);
app.get('/', (req, res) => res.redirect('/api/v1/doc'));

app.use(errorHandler);
app.all('*', (req, res, next) => {
     res.status(404).json({ error: 'route/method does not exist' });
});

export default app;
