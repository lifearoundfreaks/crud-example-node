module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    })

    User.associate = models => {
        User.hasMany(models.Profile, {
            onDelete: 'CASCADE',
            hooks: true, 
        })
    }

    return User
}
