"use strict";

let Nightmare = require('nightmare');
let expect = require('chai').expect;

describe("Lords of Might", function(){
    var login = ('#login-btn');

    this.timeout(20000);
    it('should require me to login', function(done){
        Nightmare({show: true})
            .goto('https://stormy-citadel-20684.herokuapp.com/')
            .wait(login)
            .click(login)
            .evaluate(function(){
                return document.title;
            })
            .then(function(title){
                expect(title).to.equal('Lords of Might');
                done()
            })    
    })

    it('should log me in', function(done){
        Nightmare({show: true})
            .goto('https://stormy-citadel-20684.herokuapp.com/')
            .wait(login)
            .click(login)
            .wait('input[placeholder="What is your name, Peasant?"]')
            .type('input[placeholder="What is your name, Peasant?"]','mkdinh94@gmail.com')
            .type('input[placeholder="What is your name, Peasant?"]','dinh0824')
            .evaluate(function(){
                return document.title;
            })
            .then(function(title){
                expect(title).to.equal('Lords of Might');
                done()
            }) 
    })

    it('should sign me up', function(done){
        Nightmare({show: false})
            .goto('https://stormy-citadel-20684.herokuapp.com/')
            .wait(login)
            .click(login)
            .wait('input[placeholder="What is your name, Peasant?"]')
            .type('input[placeholder="What is your name, Peasant?"]','mkdinh94@gmail.com')
            .type('input[placeholder="What is your name, Peasant?"]','dinh0824')
            .evaluate(function(){
                return document.title;
            })
            .then(function(title){
                expect(title).to.equal('Lords of Might');
                done()
            }) 
    })

    it('should sign me up', function(done){
        Nightmare({show: false})
            .goto('https://stormy-citadel-20684.herokuapp.com/')
            .wait(login)
            .click(login)
            .wait('input[placeholder="What is your name, Peasant?"]')
            .type('input[placeholder="What is your name, Peasant?"]','mkdinh94@gmail.com')
            .type('input[placeholder="What is your name, Peasant?"]','dinh0824')
            .evaluate(function(){
                return document.title;
            })
            .then(function(title){
                expect(title).to.equal('Lords of Might');
                done()
            }) 
    })
})