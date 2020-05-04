import { Router } from 'express';
import handleOAuth from '../middleware/handleOAuth';

const authRouter = Router();

// TODO make better env config settings
const FRONTEND_URL = 'http://localhost:3001';

authRouter.get('/oauth', handleOAuth, (req, res) => {
  res.set('Auth', req.token).redirect(FRONTEND_URL);
});

authRouter.get('/startOAuth', (req, res) => {
  const options = {
    client_id: '4fed029bdcad6eee948a',
    redirect_uri: 'http://localhost:3000/oauth',
    scope: 'read:user',
    state: 'this is unguessable! mwahahaha',
  };

  const qs = Object.keys(options)
    .map((key) => `${key}=${encodeURIComponent(options[key])}`)
    .join('&');

  // const response = await axios({
  //   method: 'get',
  //   url: 'https://github.com/login/oauth/authorize' + qs,
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'user-agent': 'express-app',
  //   },
  // });
  res.redirect('https://github.com/login/oauth/authorize' + qs);
});

export default authRouter;
