const scoreSheet = (sequelize, DataTypes) => {
  const ScoreSheet = sequelize.define('scoreSheet', {
    problemName: DataTypes.STRING,
  });

  ScoreSheet.associate = (models) => {
    ScoreSheet.belongsTo(models.ScoreSheet);
  };

  return ScoreSheet;
};

export default scoreSheet;
