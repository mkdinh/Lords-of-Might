module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
        body: {
            type: DataTypes.STRING,
            validate: {
                len: [1,100]
            }
        }
    })

    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            }
        })
    }
    
    return Message;
}