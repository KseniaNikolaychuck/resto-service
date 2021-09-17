module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reservations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      table_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: 'Tables',
          key: 'id',
          onUpdate: 'CASCADE',
        },
      },
      dateTime: {
        allowNull: false,
        field: 'date_time',
        type: Sequelize.DATE,
      },
      timeInterval: {
        field: 'time_interval',
        type: Sequelize.INTEGER,
        defaultValue: 90,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  },
};
