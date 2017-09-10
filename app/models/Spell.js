module.exports = (sequelize,DataTypes) => {
    var Spell = sequelize.define('Spell', {
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        equipped: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        damage_min: {
            type: DataTypes.INTEGER,
        },
        damage_max: {
            type: DataTypes.INTEGER,
        },
        pic: {
            type: DataTypes.STRING,
        }
    })

    Spell.assosiate = (models) => {
        Spell.hasMany(models.Items, {
            onDelete: "CASCADE"
        })
    }

    return Spell;
}