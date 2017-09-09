module.exports = (sequelize,DataTypes) => {
    var Stats = sequelize.define('Stats', {
        HP:{
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        MP:{
            type: Datatypes.INTEGER,
            allowNull: false,
            defaultValue: 50
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
    
    Stats.associate = (models) => {
        Stats.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Stats;
}