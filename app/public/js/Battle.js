var LoM = LoM || {};
var battleInfo = {};
var user;
var enemy;
var room;
var initialized = false;

// loading game assets
LoM.Battle = function(){};

LoM.Battle = {
    preload: function(){
        var width = 24*32;
        var height = 17*32;

        this.backgroundSprite = this.game.add.tileSprite(0,0, width, height, 'battleBG');
        this.backgroundSprite.scale.x = 3.2  
        this.backgroundSprite.scale.y = 3.2  

        battleInfo = LoM.Game.battleInfo;

        user = LoM.Game.userInfo;
        room = battleInfo.room;
        delete battleInfo['room']
        
        for(role in battleInfo){
            if(battleInfo[role].id === user.id){
                battleInfo[role].controller = 'user';
                user.control = role
            }else{
                battleInfo[role].controller = 'enemy',
                enemy = battleInfo[role];
                enemy.control = role
                
            }
        }
    },
    create: function(){
            
	    this.time.advancedTiming = true;
        this.time.desiredFps = 60;

        this.spriteMap = {};
        this.tweenMap = {};
        this.state = {
            player: {},
            roleID: {
                    attacker: user.id,
                    defender: enemy.id,
                },
            turn: battleInfo.initiator.id,
            room: room
        }

        this.createReceiver(battleInfo.receiver)
        this.createInitiator(battleInfo.initiator)

        battleUpdate(battleInfo.initiator,battleInfo.receiver);
        initialized = true;
    },
    update: function(){
        if(initialized){
            if(this.state.turn === user.id ){
                $(".action-btn").prop("disabled", false);
                $('.battle-options').fadeIn();
            }else{
                $('.action-btn').prop("disabled", true);
                $('.battle-options').fadeOut();
            }

            // console.log(this.state)
            var attackerID = this.state.roleID.attacker;
                var attackerHP = this.state.player[attackerID].hp;
                var attackerMP = this.state.player[attackerID].mp;

            var defenderID = this.state.roleID.defender;
                var defenderHP = this.state.player[defenderID].hp;
                var defenderMP = this.state.player[defenderID].mp;

            $("#"+attackerID+'-HP').html("HP:"+ attackerHP)
            $("#"+attackerID+'-HP').html("HP:"+ attackerHP)

            $("#"+defenderID+'-HP').html("HP:"+ defenderHP)
            $("#"+defenderID+'-HP').html("HP:"+ defenderHP)

            if(attackerHP <= 0){

                var battle = this;
                initialized = false;

                setTimeout(function(){
                    battle.spriteMap[attackerID].animations.play('die',10, false)
                    var body = defenderID + " WON!"
                    announcement(body)
                    gameOver()
                    removeInteractionDisplay()
                },2000)
            }

            if(defenderHP <= 0){
                var battle = this;
                initialized = false;

                setTimeout(function(){
                    battle.spriteMap[defenderID].animations.play('die',10, false)
                    var body = attackerID + " WON!"
                    announcement(body)
                    gameOver()
                },2000)
            }
        }
    },
    render: function(){
        // LoM.debug.geom(menu,'#0fffff');
    },

    createInitiator: function(info){
        var spriteNum = info.sprite;
        var sprite =  this.add.sprite(160, 230, 'sprite'+spriteNum);
        sprite.frame = 40;
        sprite.scale.x = 2;
        sprite.scale.y = 2;

        sprite.data.position = "initiator";
        battleInfo.initiator.position = "initiator";
        battleInfo.initiator.weapon = {
            type: 'spear',
            damage: [1,20]
        };
   
        battleInfo.initiator.spell = {
            type: 'fire',
            damage: [100,101],
            mp: 35
        };

        battleInfo.initiator.hp = 100;
        battleInfo.initiator.mp = 100;
        
        

        this.addBattleAnimations(sprite,info.id)

        this.spriteMap[info.id] = sprite
        this.state.player[info.id] = battleInfo.initiator;
    },

    createReceiver: function(info){
        var spriteNum = info.sprite;
        var sprite =  this.add.sprite(515, 230, 'sprite'+spriteNum);
        sprite.frame = 13;
        sprite.scale.x = 2;
        sprite.scale.y = 2;
        
        sprite.data.position = "receiver";
        battleInfo.receiver.position = "receiver";
        // battleInfo.receiver.turn  = false;
        battleInfo.receiver.weapon = {
            type: 'sword',
            damage: [6,15]
        };
   
        battleInfo.receiver.spell = {
            type: 'fire',
            damage: [100,101],
            mp: 35
        };
        battleInfo.receiver.hp = 100;
        battleInfo.receiver.mp = 100;


        this.addBattleAnimations(sprite,info.id)

        this.spriteMap[info.id] = sprite;  
        this.state.player[info.id] = battleInfo.receiver; 
        
    },

    addBattleAnimations: function(sprite,id){

        var tweenT = 1500;
        var animT = 15;
        var timeOutT = 500;

        if(sprite.data.position === 'initiator'){
            this.tweenMap[id] = {}
            var spell = sprite.animations.add('spell',[39,40,41,42,43,44,44,44,44,44,44,44,44,43,42,41,40,39],true)

            spell.onStart.add(function(){

                var fireball = LoM.Battle.add.sprite(200,230,'fireball')
                var genBall = fireball.animations.add('genBall',[1,2,3,4,5],1000, false)
                var shootBall = fireball.animations.add('shootBall',[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],5000, true)
                var explodeBall = fireball.animations.add('explode', [32,33,34,35,36,37,38,39],1000, false)


                genBall.onComplete.add(function(){
                        var tweenBall =  LoM.Battle.add.tween(fireball).to({x: 500},1000, 'Linear', false);
                        tweenBall.start()
                        tweenBall.onStart.add(function(){
                            // console.log('hey')
                            fireball.animations.play('shootBall',25, true)
                        })
                        tweenBall.onComplete.add(function(){
                            fireball.animations.stop();
                            // console.log('exploded')
                            fireball.animations.play('explode',25, false)
                            explodeBall.onComplete.add(function(){
                                fireball.kill()
                            })
                    })
                })

                fireball.animations.play('genBall',10,false)
            })

            var left = sprite.animations.add('left',[117,118,119,120,121,122,123,124],true);
            left.onComplete.add(function(){
                // console.log('frame')
            })
            var right = sprite.animations.add('right',[144,145,146,147,148],true);
            var sword = sprite.animations.add('sword',[195,196,197,198,199,200,199,198,197,196,195],true);
                sprite.animations._anims.sword.onComplete.add(function(){
                    sprite.animations.play('left',10, true);
                    // this is the window object
                    var returnTween = LoM.Battle.add.tween(sprite).to({x: 160, y: 230},tweenT, 'Linear', true);
                    returnTween.onComplete.addOnce(function(){
                        sprite.animations.stop();
                        sprite.animations.play('right',50,false)
                        sprite.frame = 13;
                    })
                })
    
                this.tweenMap[id].sword = this.add.tween(sprite).to({x: 450, y: 230},tweenT, 'Linear', false);
                this.tweenMap[id].sword.onStart.add(function(){sprite.animations.play('right',animT,true)}, this);
                this.tweenMap[id].sword.onComplete.add(function(){
                    sprite.animations.stop()
                    sprite.animations.play('sword',animT,false)
                }, this);

            var spear = sprite.animations.add('spear',[247,248,249,250,251,252,253,254,255,255,254,253,252,251,250,249,248,247],true);
            
                sprite.animations._anims.spear.onComplete.add(function(){
                    sprite.animations.play('left',10, true);
                    // this is the window object
                    var returnTween = LoM.Battle.add.tween(sprite).to({x: 160, y: 230},tweenT, 'Linear', true);
                    returnTween.onComplete.addOnce(function(){
                        sprite.animations.stop();
                        sprite.animations.play('right',50,false)
                        sprite.frame = 13
                    })
                })

                this.tweenMap[id].spear = this.add.tween(sprite).to({x: 430, y: 230},tweenT, 'Linear', false);
                this.tweenMap[id].spear.onStart.add(function(){sprite.animations.play('right',animT,true)}, this);
                this.tweenMap[id].spear.onComplete.add(function(){
                    sprite.animations.stop()
                    sprite.animations.play('spear',animT,false)
                }, this);

            var bow = sprite.animations.add('bow',[247,248,249,250,251,252,253,254,255,256,257,258,259],true);

            sprite.animations._anims.bow.onComplete.add(function(){
                sprite.animations.play('left',10, true)
            })

            
            var addHealth = sprite.animations.add('potion',[260,260,260,260,260,260,260,260,261,262,262,262,261,260,260,260,143],false);

                addHealth.onStart.add(function(){

                var potionH = LoM.Game.add.sprite(210, 0,'health')
                potionH.scale.x= .25;
                potionH.scale.y= .25;
        
                falling = LoM.Game.add.tween(potionH).to({y: 330},1000,'Bounce',false)
                    falling.onComplete.add(function(){
                        potionH.kill();
                        // emit turn completed
                    })
                    
                falling.start();

            })

            var die = sprite.animations.add('die',[260,261,262,263,264,265],false)
            
    
        // TAG: anim-receiver 
        // ------------------------------------------------------------------------------------------------

        }else if(sprite.data.position === 'receiver'){


            this.tweenMap[id] = {}
            
            var spell = sprite.animations.add('spell',[13,14,15,16,17,18,18,18,18,18,18,18,18,17,16,15,14,13],true)

            spell.onStart.add(function(){

                var fireball = LoM.Battle.add.sprite(470,230,'fireball')
                var genBall = fireball.animations.add('genBall',[1,2,3,4,5],1000, false)
                var shootBall = fireball.animations.add('shootBall',[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],5000, true)
                var explodeBall = fireball.animations.add('explode', [32,33,34,35,36,37,38,39],1000, false)


                genBall.onComplete.add(function(){
                    var tweenBall =  LoM.Battle.add.tween(fireball).to({x: 150},1000, 'Linear', false);
                    tweenBall.start()
                    tweenBall.onStart.add(function(){
                        fireball.animations.play('shootBall',25, true)
                    })

                    tweenBall.onComplete.add(function(){
                        fireball.animations.stop();
                        console.log('exploded')
                        fireball.animations.play('explode',25, false)
                        explodeBall.onComplete.add(function(){
                            fireball.kill()
                            // update player stat

                            // turn finished
                        })
                    })
                })
                
                fireball.animations.play('genBall',10,false)
            })

            var left = sprite.animations.add('left',[117,118,119,120,121,122,123,124],true);
            var right = sprite.animations.add('right',[144,145,146,147,148],true);
            var sword = sprite.animations.add('sword',[169,170,171,172,173,174,173,172,171,170,169],true);

                sprite.animations._anims.sword.onComplete.add(function(){
                    sprite.animations.play('right',10, true);
                    // this is the window object
                    var returnTween = LoM.Battle.add.tween(sprite).to({x: 515, y: 230},tweenT, 'Linear', true);
                    returnTween.onComplete.addOnce(function(){
                        sprite.animations.stop();
                        sprite.animations.play('left',50,false)
                        sprite.frame = 13;
                        console.log('sword slash!')
                    })
                })

                this.tweenMap[id].sword = this.add.tween(sprite).to({x: 230, y: 230},tweenT, 'Linear', false);
                this.tweenMap[id].sword.onStart.add(function(){sprite.animations.play('left',animT,true)}, this);
                this.tweenMap[id].sword.onComplete.add(function(){
                    sprite.animations.stop()
                    sprite.animations.play('sword',animT,false)
                }, this);

            var spear = sprite.animations.add('spear',[221,222,223,224,225,226,227,228,229,229,228,227,226,225,224,223,222,221],true);
            
                sprite.animations._anims.spear.onComplete.add(function(){
                    sprite.animations.play('right',10, true);
                    // this is the window object
                    var returnTween = LoM.Battle.add.tween(sprite).to({x: 515, y: 230},tweenT, 'Linear', true);
                    returnTween.onComplete.addOnce(function(){
                        sprite.animations.stop();
                        sprite.animations.play('left',50,false)
                        sprite.frame = 13
                    })
                })

                this.tweenMap[id].spear = this.add.tween(sprite).to({x: 250, y: 230},tweenT, 'Linear', false);
                this.tweenMap[id].spear.onStart.add(function(){sprite.animations.play('left',animT,true)}, this);
                this.tweenMap[id].spear.onComplete.add(function(){
                    sprite.animations.stop()
                    sprite.animations.play('spear',animT,false)
                }, this);

            var bow = sprite.animations.add('bow',[221,222,223,224,225,226,227,228,229,229,228,227,226,225,224,223,222,221],true);
            
            sprite.animations._anims.bow.onComplete.add(function(){
                sprite.animations.play('right',10, true)
            })

            var addHealth = sprite.animations.add('potion',[260,260,260,260,260,260,260,260,261,262,262,262,261,260,260,260,117],false);
            
                addHealth.onStart.add(function(){

                var potionH = LoM.Game.add.sprite(565, 0,'health')
                potionH.scale.x= .25;
                potionH.scale.y= .25;
        
                falling = LoM.Game.add.tween(potionH).to({y: 330},1000,'Bounce',false)
                    falling.onComplete.add(function(){
                        potionH.kill();
                        // update player stat
                    })
                    
                falling.start();

            })

            var die = sprite.animations.add('die',[260,261,262,263,264,265],false)
        }
    },

    attack: function(state){
        // performing old state request
        var attackerID = state.roleID.attacker;
        var defenderID = state.roleID.defender;
        var weapon = state.player[attackerID].weapon.type;
        console.log(this.state.player[defenderID].hp)
        this.tweenMap[attackerID][weapon].start();
        setTimeout(function(){Client.actionCompleted(state)},5000)
    },

    spell: function(state){
        var attackerID = state.roleID.attacker;
        var defenderID = state.roleID.defender;
        console.log(this.state.player[defenderID].hp)
        this.spriteMap[attackerID].animations.play('spell', 10,  false)
        setTimeout(function(){Client.actionCompleted(state)},3000)
    },

    potion: function(state){
        var attackerID = state.roleID.attacker;
        var defenderID = state.roleID.defender;

        this.spriteMap[attackerID].animations.play('potion', 10,  false)
        setTimeout(function(){Client.actionCompleted(state)},2000)
    }
}

