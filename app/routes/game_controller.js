
const express = require('express');
const db = require('../models');
const fs = require('fs');
const path = require('path');
const router = express.Router();
var spriteSheetFolder = path.join(__dirname,'../public/img/players');
var spriteSheetID = {}

router.get('/all', (req,res) => {
    db.User.findAll({
        include: [db.Game_State,
            {model: db.Sprite}, 
            {model: db.Stats},
            {model: db.Inventory , include: [db.Item]},
            {model: db.Spell_Inventory, include: [db.Spell]}
        ]
    })
    .then((playerDB) => {
        res.json(playerDB)
    })
});

router.get('/inventories/:userId', (req,res) => {
    var userId = req.params.userId;
    // search for all items belongs to user
    db.Inventory.findAll({where: {userId: userId},include: [db.Item]})
    .then((inventory) => {

        // update equipments slot
        // ---------------------------------------------------------------
        var equipped = {};
        // equipping to slot
        let allType = ['quest','head','torso','leg','feet','hand','weapon','consumable'];

        for(i = 0; i < inventory.length; i++){
            if(inventory[i].equipped){
                // if equipped, find the item slot
                let slot = inventory[i].Item.slot;
                equipped['slot-'+slot] = inventory[i].Item
                // console.log(slot,equipped[slot])
            }
        }
        console.log(equipped)
        
        // equipments stats stats
        // -----------------------------------------------------------------
        

        // return info to be updated to the game
        // -----------------------------------------------------------------
        var userInfo = {
            inventory: inventory,
            equipped: equipped,
        }

        res.json(userInfo)
    })
})

router.put('/inventories/:id', (req,res) => {
    // grab data from req.body
    var inventId = req.params.id;
    var equipped = req.body;
    // perform sequelize update on item id
    db.Inventory.update(equipped, {where: {id: inventId}}).then( () =>{
        res.json(equipped)
    })
    
})

router.put('/battle/win/:userid', (req,res) => {

    var gold = randomInt(100,200);
    var exp = randomInt(200,300);

    db.Game_State.find({where: {UserId: req.params.userid}}).then(user => {
        user.increment({
            'win': 1,
            'gold': gold,
            'exp': exp
        }).then((user) => {
            var rewards = {
                gold: gold,
                exp: exp
            }
            res.json(rewards)
        })
    })
})

router.get('/shop/all', (req,res) => {
    db.Item.findAll({}).then((items) => {
        res.json(items)
    })
})

router.post('/shop/:id', (req,res) => {
    var user_id = req.body.user_id;
    var item_id = req.params.id;
    var cost = req.body.cost;

    db.Inventory.create({Itemid: item_id, userId: id}).then(() => {
        db.Game_State.find({where: {UserId: id}}).then((game_state) => {
            game_state.decrement('gold', cost)
            res.json({success: 'success'})
        })
    })
})

router.put('/battle/lose/:userid', (req,res) => {
    
    var gold = randomInt(50,100);
    var exp = randomInt(200,300);

    db.Game_State.find({where: {UserId: req.params.userid}}).then(user => {
        user.increment({
            'win': 1,
            'gold': gold,
            'exp': exp
        }).then((user) => {
            var rewards = {
                gold: gold,
                exp: exp
            }
            res.json(rewards)
        })
    })
})

function randomInt (low,high){
    return Math.floor(Math.random() * (high - low) + low);
}



module.exports = router;