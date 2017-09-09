module.exports = (sequelize,DataTypes) => {
    var Item = sequelize.define('Item', {
        item_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        quantity: {
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
            allowNull: false,
            defaultValue: 0
        },
        link: {
            type: DataTypes.STRING
        },
        data_point: {
            type: DataTypes.INTEGER
        },
    })
    
    Item.associate = (models) => {
        Item.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Item;
}