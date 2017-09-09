module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
        body: {
            type: DataTypes.STRING,
            validate: {
                len: [1,100]
            }        // date: {
        //     type: DataTypes.DATE,
        //     allowNull: true
        //     }   
        }
    })

    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    
    return Message;
}