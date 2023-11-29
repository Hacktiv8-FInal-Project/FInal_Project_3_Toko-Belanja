'use strict';

const { hashPassword } = require('../utils/bcrypt.js');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      full_name: 'admin',
      email: 'admin@example.com',
      password: hashPassword('admin123'),
      gender: "male",
      role: 'admin',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
