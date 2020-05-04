import { Router } from 'express';
import bearerAuth from '../middleware/bearerAuth';

const usersRouter = Router();

usersRouter.get('/users', bearerAuth, async (req, res) => {
  const { User } = req.context.models;
  const users = await User.findAll();
  res.json(users);
});

usersRouter.get('/user/:login', bearerAuth, async (req, res) => {
  const { User } = req.context.models;
  const user = await User.findByLogin(req.params.login);
  res.json(user);
});

export default usersRouter;
