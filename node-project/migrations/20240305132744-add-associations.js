'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Posts', 
      'writer', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // Users 모델에서
          key: 'id', // 그 아이디 값을 참고합니다.
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Users', // name of Source model
      'id' // key we want to remove
    );
  }
};
