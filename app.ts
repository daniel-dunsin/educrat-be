import express from 'express';
import cors from 'cors';
import errorHandler from './helpers/error.helper';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use(cors());
app.use(errorHandler);
app.all('*', (req, res, next) => {
     res.status(404).json({ error: 'route/method does not exist' });
});

export default app;
