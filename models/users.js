'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.postings, { foreignKey: 'authorID' });
    }
  }
  users.init(
    {
      userID: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nick: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  return users;
};
