const bcrypt = require('bcrypt-node');

module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull:false,
            // unique: true,
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
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [1,20],
            },
            defaultValue: "Nooby Noob" 
        },
        profile: {
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue: "http://s7d2.scene7.com/is/image/PetSmart/5141661?$sclp-prd-main_large$"
        },
        online: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
        
    })

    User.associate = (models) => {
        
        User.hasMany(models.Message, {
            onDelete: "CASCADE"
        })      
        User.hasMany(models.Inventory, {
            onDelete: "CASCADE"
        })
        User.hasMany(models.Spell_Inventory,{
            onDelete: "CASCADE"
        })
        User.hasOne(models.Sprite, {
            onDelete: "CASCADE"
        })
        User.hasOne(models.Game_State, {
            onDelete: "CASCADE"
        })
        User.hasOne(models.Stats, {
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
            // console.log(res)
            fn(err,res)
        })
    }

    return User;
}