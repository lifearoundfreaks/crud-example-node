module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define(
        'Profile', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female'),
            allowNull: false,
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    Profile.associate = models => {
        Profile.belongsTo(models.User)
    }

    return Profile
}
