import { Router } from 'express';

const sessionRouter = Router();

sessionRouter.get('/', async (req, res) => {
  const user = await req.context.models.User.findByPk(req.context.me.id);
  return res.send(user);
});

export default sessionRouter;
