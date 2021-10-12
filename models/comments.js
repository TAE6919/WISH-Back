'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users);
    }
  }
  comments.init(
    {
      commentID: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      postingID: DataTypes.INTEGER,
      authorID: DataTypes.INTEGER,
      authorName: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'comments',
    }
  );

  return comments;
};
