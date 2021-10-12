'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: 'authorID' });
    }
  }
  postings.init(
    {
      postingID: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      authorID: DataTypes.INTEGER,
      title: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'postings',
    }
  );
  return postings;
};
