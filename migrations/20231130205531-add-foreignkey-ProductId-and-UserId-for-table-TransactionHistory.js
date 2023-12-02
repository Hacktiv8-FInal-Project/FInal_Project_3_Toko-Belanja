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
    await queryInterface.addColumn('TransactionHistories', 'ProductId', {
      type: Sequelize.INTEGER,
    })
    await queryInterface.addConstraint('TransactionHistories', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'fk_TransactionHistories_ProductId',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addColumn('TransactionHistories', 'UserId', {
      type: Sequelize.INTEGER,
    })
    await queryInterface.addConstraint('TransactionHistories', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_TransactionHistories_UserId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('TransactionHistories', 'ProductId')
    await queryInterface.removeConstraint('TransactionHistories', 'fk_TransactionHistories_ProductId')
    await queryInterface.removeColumn('TransactionHistories', 'UserId')
    await queryInterface.removeConstraint('TransactionHistories', 'fk_TransactionHistories_UserId')
  }
};
