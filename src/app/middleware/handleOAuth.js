import axios from 'axios';

const TOKEN_SERVER_URL = 'https://github.com/login/oauth/access_token';
const CLIENT_ID = '4fed029bdcad6eee948a';
const CLIENT_SECRET = '0f4e5556e75f9cc384f6896164798cdaea021788';
const API_SERVER = 'http://localhost:3000/oauth';
const REMOTE_API_ENDPOINT = 'https://api.github.com/user';

const exchangeCodeForToken = async (code) => {
  const response = await axios({
    method: 'post',
    url: TOKEN_SERVER_URL,
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: API_SERVER,
      state: 'this is unguessable! mwahahaha',
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'user-agent': 'express-app',
    },
  });
  return response.data.access_token;
};

const getRemoteUsername = async (token) => {
  const response = await axios({
    method: 'get',
    url: REMOTE_API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
      'user-agent': 'express-app',
    },
  });
  return response.data.login;
};

const getUser = async (req, username) => {
  const { User } = req.context.models;
  const [user, created] = await User.findOrCreate({ where: { username } });
  if (created) {
    console.log('Created new user:', user.username);
  }
  return user;
};

const handleOAuth = async (req, res, next) => {
  try {
    const { code } = req.query;
    console.log('(1) CODE:', code);
    const remoteToken = await exchangeCodeForToken(code);
    console.log('(2) ACCESS TOKEN:', remoteToken);
    const remoteUsername = await getRemoteUsername(remoteToken);
    console.log('(3) GITHUB USER:', remoteUsername);
    const user = await getUser(req, remoteUsername);
    console.log('(4) LOCAL USER:', user.username);
    const token = user.generateToken();
    console.log('(5) TOKEN:', token);
    req.token = token;
    next();
  } catch (error) {
    next(`OAuth Error: ${error.message}`);
  }
};

export default handleOAuth;
