'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      resetpasswordtoken: {
        type: Sequelize.STRING
      },
      resetpasswordexpires: {
        type: Sequelize.STRING
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};