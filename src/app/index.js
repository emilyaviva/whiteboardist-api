import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRouter from './routes/authRouter';
import rolesRouter from './routes/rolesRouter';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

import models from '../models';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(async (req, res, next) => {
  req.context = {
    models,
    // me: models.User.findByLogin('')
  };
  next();
});

app.use(authRouter);
app.use(rolesRouter);
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('it lives');
});

export default app;
