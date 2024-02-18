'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Superpower.belongsToMany(models.SuperHero, {
        through: 'abilities_to_heroes',
        foreignKey: 'ability_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Superpower.init({
    ability: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Superpower',
    tableName: 'superpowers',
    underscored: true,
  });
  return Superpower;
};