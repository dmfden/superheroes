'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuperHero extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      SuperHero.hasMany(models.HeroImage, {
        foreignKey: 'hero_id'
      });


      SuperHero.belongsToMany(models.Superpower, {
        through: 'abilities_to_heroes',
        foreignKey: 'hero_id'
      })// define association here
    }
  }
  SuperHero.init({
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    realName: {
      type: DataTypes.STRING,
      field: "real_name",
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    originDescription: {
      type: DataTypes.TEXT,
      field: "origin_description",
    },
    catchPhrase: {
      type: DataTypes.STRING,
      field: 'catch_phrase'
    }
  }, {
    sequelize,
    modelName: 'SuperHero',
    tableName: 'super_heroes',
    underscored: true,
  });
  return SuperHero;
};