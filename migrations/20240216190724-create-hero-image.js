'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('hero_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      heroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'hero_id', 
        references: {
          model: 'super_heroes',
          key: 'id'
        }
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:"created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field:"updated_at"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('hero_images');
  }
};