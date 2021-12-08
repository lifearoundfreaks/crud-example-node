'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Profiles', 'UserId', {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'Users',
                key: 'id',
            },
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Profiles', 'UserId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
        })
    }
};
