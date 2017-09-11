module.exports = (sequelize,DataTypes) => {
    var Inventory = sequelize.define('Inventory', {
        equipped: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })
    
    Inventory.associate = (models) => {
        Inventory.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })

        Inventory.belongsTo(models.Item, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Inventory;
}