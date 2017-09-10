
const express = require('express');
const db = require('../models');
const fs = require('fs');
const path = require('path');
const router = express.Router();
var spriteSheetFolder = path.join(__dirname,'../public/img/players');
var spriteSheetID = {}

router.get('/all', (req,res) => {
    db.User.findAll({
        include: [db.Game_State, db.Sprite, db.Stats, 
            {model: db.Inventory , include: [db.Item]}]
    })
    .then((playerDB) => {
        res.json(playerDB)
    })
});


module.exports = router;