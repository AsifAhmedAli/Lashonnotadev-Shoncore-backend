module.exports = (sequelize, DataTypes, Model) => {
  class Product extends Model {}

  Product.init(
    {
      productowner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Image: {
        type: DataTypes.JSON, // Define Image as JSON type to store object data
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );

  return Product;
};
