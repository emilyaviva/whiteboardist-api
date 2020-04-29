import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const { User } = req.context.models;
  const users = await User.findAll();
  return res.send(users);
});

userRouter.get('/:userId', async (req, res) => {
  const { User } = req.context.models;
  const user = await User.findByPk(req.params.userId);
  return res.send(user);
});

export default userRouter;
