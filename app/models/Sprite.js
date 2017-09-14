module.exports = (sequelize,DataTypes) => {
    var Sprite = sequelize.define('Sprite', {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        head: {
            type: DataTypes.STRING,
            allowNull: true
        },
        leg: {
            type: DataTypes.STRING,
            allowNull: true
        },
        feet: {
            type: DataTypes.STRING,
            allowNull: true
        },
        torso: {
            type: DataTypes.STRING,
            allowNull: true
        },
        weapon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        spell: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Sprite.assosiate = (models) => {
        // Sprite.hasOne(models.User, {
        //     foreignKey:{
        //         allowNull: false
        //     }
        // })

        Sprite.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })

        // Sprite.belongsTo(models.Stats, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })
        
        // Sprite.belongsTo(models.Spell, {
        //     foreignKey: {
        //         allowNull: false
        //     }
        // })
    }

    return Sprite;
}