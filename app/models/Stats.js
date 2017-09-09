module.exports = (sequelize,DataTypes) => {
    var Stats = sequelize.define('Stats', {
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
        },
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
    
    Stats.associate = (models) => {
        Stats.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Stats;
}