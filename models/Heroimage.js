'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HeroImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HeroImage.belongsTo(models.SuperHero, {
        foreignKey: 'hero_id'
      });// define association here
    }
  }
  HeroImage.init({
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'HeroImage',
    tableName: 'hero_images',
    underscored:true
  });
  return HeroImage;
};