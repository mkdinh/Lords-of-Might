module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            validate: { len: [6,20] }
        },
        password: {
            type: DataTypes.STRING,
            validate: { len: [6,20]}
        }
    })

    return User;
}