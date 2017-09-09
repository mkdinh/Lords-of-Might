module.exports = (sequelize,DataTypes) => {
    var Sprite = sequelize.define('Sprite', {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        head: {
            type: DataTypes.STRING,
            allowNull: false
        },
        leg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        torso: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weapon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        spell: {
            type: DataTypes.STRING,
            allowNull: false
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        heal: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Sprite.assosiate = (models) => {
        Sprite.hasOne(models.User, {
            foreignKey:{
                allowNull: false
            }
        })
    }

    return Sprite;
}