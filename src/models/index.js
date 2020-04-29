import Sequelize from 'sequelize';

const { DATABASE, DATABASE_USER, DATABASE_PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
  dialect: 'postgres',
});

const models = {
  User: sequelize.import('./user'),
  ScoreSheet: sequelize.import('./scoresheet.js'),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
