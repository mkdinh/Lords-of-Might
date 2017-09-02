
const express = require('express');
const models = require('../models');
const Message = models.Message;
const router = express.Router();

router.get('/all', (req,res) => {

});

router.post('/new', (req,res) => {
    var query = {
        body: req.body.body,
        UserId: req.user.id
    }

    Message.create(query)
        .then((message) => {
            res.json(message)
        })
});

router.get('/id', (req,res) => {
    
})

router.put('/id', (req,res) => {
    
});

router.delete('/id', (req,res) => {
    
})

module.exports = router;