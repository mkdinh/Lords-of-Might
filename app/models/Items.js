module.exports = (sequelize,DataTypes) => {
    var Item = sequelize.define('Item', {
        item_name: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.INTEGER
        }
    })

    return Item;
}