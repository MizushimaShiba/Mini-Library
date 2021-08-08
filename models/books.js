'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Books.belongsTo(models.Students, {
        foreignKey: 'studentsId'
      })
    }
  };
  Books.init({
    bookName: DataTypes.STRING,
    borrowedAt: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    returnedAt: DataTypes.DATE,
    studentsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};