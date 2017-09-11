module.exports = (sequelize,DataTypes) => {
    var Spell_Inventory = sequelize.define('Spell_Inventory', {
        equipped: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })
    
    Spell_Inventory.associate = (models) => {
        Spell_Inventory.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })

        Spell_Inventory.belongsTo(models.Spell, {
            foreignKey: {
                allowNull: false
            }
        })

        // Inventory.belongsTo(models.Spell, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })
    }

    return Spell_Inventory;
}