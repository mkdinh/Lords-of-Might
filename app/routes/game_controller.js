
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
    db.Game_State.find({where: {UserId: req.params.userid}}).then(user => {
        user.increment('win').then((user) => {
            res.json(user)
        })
    })
})

router.put('/battle/lose/:userid', (req,res) => {
    db.Game_State.find({where: {UserId: req.params.userid}}).then(user => {
        user.increment('lose').then((user) => {
            res.json(user)
        })
    })
})


module.exports = router;