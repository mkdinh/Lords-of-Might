const express = require('express');
const router = express.Router();

app.get('/', (req,res) => {
    var isLoggedIn = !!req.user;
    res.render('index',{loggedIn: isLoggedIn})
})
