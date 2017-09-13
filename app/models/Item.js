module.exports = (sequelize,DataTypes) => {
    var Item = sequelize.define('Item', {
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        type:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        class:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        slot:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 7
            }
        },
        hp:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        mp:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        agility: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        recovery: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        buy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        sell: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    
    Item.associate = (models) => {
        Item.hasMany(models.Inventory, {
            onDelete: "CASCADE"
        })
    }

    return Item;
}