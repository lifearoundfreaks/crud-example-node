'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'Users',
            'isAdmin',
            Sequelize.BOOLEAN,
            {
                allowNull: false,
                defaultValue: false,
            }
        )
    },

    down: async queryInterface => {
        await queryInterface.removeColumn(
            'Users',
            'isAdmin',
        )
    }
}
