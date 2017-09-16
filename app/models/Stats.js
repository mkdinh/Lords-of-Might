module.exports = (sequelize,DataTypes) => {
    var Stats = sequelize.define('Stats', {
        hp:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 70
        },
        mp:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 30
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        agility: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 5
        },
        recovery: {
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
        // Stats.belongsTo(models.Sprite, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })
    }

    return Stats;
}