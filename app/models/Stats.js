module.exports = (sequelize,DataTypes) => {
    var Stats = sequelize.define('Stats', {
        hp:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        mp:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 50
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        heal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        }
    })
    
    Stats.associate = (models) => {
        Stats.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Stats;
}