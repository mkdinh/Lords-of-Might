module.exports = (sequelize,DataTypes) => {
    var Stats = sequelize.define('Stats', {
        win: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        lose: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gold: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
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