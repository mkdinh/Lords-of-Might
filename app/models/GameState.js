module.exports = (sequelize,DataTypes) => {
    var Game_State = sequelize.define('Game_State', {
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Game'
        },
        lastX: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 500
        },
        lastY: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 500
        },
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
            allowNull:false,
            defaultValue: 100
        }
    })
    
    Game_State.associate = (models) => {
        Game_State.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Game_State;
}