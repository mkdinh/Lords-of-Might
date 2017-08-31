const bcrypt = require('bcrypt-node');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate: {
                len: [6,50],
                isEmail : true
            }
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [6,100],
            }
        },
        online: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
            }
        }
        
    })

    User.associate = (models) => {
        User.hasMany(models.Item, {
            onDelete: "CASCADE"
        })
    }

    User.prototype.printStuff = function(){
        console.log(this.username, this.password)
    }

    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    
    User.prototype.comparePassword = function(password, fn){
        var hash = this.password;

        return bcrypt.compare(password, hash, function(err, res) {
            console.log(res)
            fn(err,res)
        })
    }

    return User;
}