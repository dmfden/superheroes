'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('abilities_to_heroes', { 
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      heroId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'hero_id',
        references: {
          model: 'super_heroes',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      abillityId: {
        type: Sequelize.INTEGER,
        allowNull: false ,
        field: 'ability_id',
        references: {
          model: 'superpowers',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      }

     });

     await queryInterface.addConstraint('abilities_to_heroes', {
      fields: ['hero_id', 'ability_id'],
      type: 'unique',
      name: 'unique_pair_constraint'
     })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('abilities_to_heroes');
  }
};
