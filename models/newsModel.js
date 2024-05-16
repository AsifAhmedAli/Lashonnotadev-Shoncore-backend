module.exports = (sequelize, DataTypes, Model) => {
  class News extends Model {}

  News.init(
    {
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Image: {
        type: DataTypes.JSON, // Define Image as JSON type to store object data
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "News",
    }
  );

  return News;
};
