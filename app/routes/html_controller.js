const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    var isLoggedIn = !!req.user;
    res.render('index',{loggedIn: isLoggedIn})
})

router.get('/game', (req,res) => {
    var isLoggedIn = !!req.user;
    res.render('game', {loggedIn: isLoggedIn})
})

module.exports = router;