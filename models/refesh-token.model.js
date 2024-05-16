module.exports = (sequelize ,DataTypes , Model) =>{
  
  class RefreshToken extends Model {}
  
  RefreshToken.init(
    {
      // Model attributes are defined here
      token: { type: DataTypes.STRING },
      expires: { type: DataTypes.DATE },
      created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      createdByIp: { type: DataTypes.STRING },
      revoked: { type: DataTypes.DATE },
      replacedByToken: { type: DataTypes.STRING },
      isExpired: {
        type: DataTypes.VIRTUAL,
        get() {
          return Date.now() >= this.expires;
        },
      },
      isActive: {
        type: DataTypes.VIRTUAL,
        get() {
          return !this.revoked && !this.isExpired;
        },
      },
  
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'RefreshToken', // We need to choose the model name
    },
  );
  
  
  return RefreshToken;
  
  };
  