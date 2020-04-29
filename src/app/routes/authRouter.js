import { Router } from 'express';
import handleOAuth from '../middleware/handleOAuth';

const authRouter = Router();

authRouter.get('/users', (req, res) => {
  res.json();
});

authRouter.post('/signup', async (req, res) => {
  // expects the user sent a req body with username, pw, and name of role
  // find the right role and save the user
});

authRouter.post('/signin', async (req, res) => {});

authRouter.get('/oauth', handleOAuth, (req, res) => {
  res.json({ token: req.token });
});

export default authRouter;
