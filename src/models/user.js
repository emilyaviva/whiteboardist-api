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
