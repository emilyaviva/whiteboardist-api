const bearerAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return next('No authorization header');
  }
  const { User } = req.context.models;
  const token = req.headers.authorization.split(' ').pop();
  User.authenticateToken(token)
    .then((validUser) => {
      req.context.user = validUser;
      next();
    })
    .catch((error) => {
      next(error);
    });
};

export default bearerAuth;
