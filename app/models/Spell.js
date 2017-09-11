module.exports = (sequelize,DataTypes) => {
    var Spell = sequelize.define('Spell', {
        name: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        class: {
            type: DataTypes.STRING,
        },
        damage_min: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        damage_max: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        level:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pic: {
            type: DataTypes.STRING,
        }
    })

    Spell.assosiate = (models) => {
        Spell.hasMany(models.Spell_Inventory, {
            onDelete: "CASCADE"
        })
    }

    return Spell;
}