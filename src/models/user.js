import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.ScoreSheet);
  };

  User.findByLogin = async (login) => {
    let user = await User.findOne({
      where: { username: login },
    });
    if (!user) {
      user = await User.findOne({
        where: { email: login },
      });
    }
    return user;
  };

  User.authenticateToken = async (token) => {
    try {
      const tokenObject = jwt.verify(token, JWT_SECRET);
      if (!tokenObject.username) {
        return Promise.reject(new Error('Token is malformed: no username'));
      }
      const user = await User.findByLogin(tokenObject.username);
      return user;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  User.prototype.generateToken = function () {
    const tokenData = {
      id: this.id,
      username: this.username,
      permissions: this.permissions || [],
    };
    return jwt.sign(tokenData, JWT_SECRET);
  };

  return User;
};

export default user;
