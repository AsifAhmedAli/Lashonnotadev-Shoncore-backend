module.exports = (sequelize, DataTypes, Model) => {
  class Order extends Model {}

  Order.init(
    {
      userorder: {
        type: DataTypes.INTEGER,
        allownull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pinCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      paymentInfo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderAt: {
        type: DataTypes.DATE,
        allowNull: false, // Corrected from 'required: true'
      },
      itemsPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      taxPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      shippingPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      orderStatus: {
        type: DataTypes.STRING,
        defaultValue: "processing",
      },
      // productItems: {
      //   type: DataTypes.ARRAY(DataTypes.JSON),
      //   allowNull: false,
      // },
      deliveredAt: DataTypes.DATE,
      user: {
        // type: DataTypes.INTEGER,
        // allowNull: false,
        // references: {
        //   model: "users",
        //   key: "id",
        // },
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productItems: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  return Order;
};
