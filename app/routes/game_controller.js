
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
        // return items to be updated to the game
        res.json(inventory)
    })
})

router.put('/inventories/:id', (req,res) => {
    // grab data from req.body
    var inventId = req.params.id;
    var equipped = req.body;
    console.log(equipped, inventId)
    // perform sequelize update on item id
    db.Inventory.update(equipped, {where: {id: inventId}}).then( () =>{
        res.json(equipped)
    })
    
})

module.exports = router;