module.exports = (sequelize,DataTypes) => {
    var Avatar = sequelize.define('Avatar', {
        profilePic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stationary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        movement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        attack: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Avatar.assosiate = (models) => {
        Avatar.hasOne(models.User, {
            foreignKey:{
                allowNull: false
            }
        })
    }

    return Avatar;
}