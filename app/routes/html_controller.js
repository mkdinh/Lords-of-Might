const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    var isLoggedIn = !!req.user;
    res.render('index', {
        loggedIn: isLoggedIn
    })
})

router.get('/signUp', function (req, res) {
    res.render('signUp', {})
})

router.get('/sprite', (req,res) => {
    res.render('sprite')
})

router.get('/game', (req,res) => {

    var isLoggedIn = !!req.user;
    res.render('game', {
        loggedIn: isLoggedIn
    })
})

module.exports = router;
