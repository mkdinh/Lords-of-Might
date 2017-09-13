var LoM = LoM || {};
var user;
var enemy;
var room;
var initialized = false;
var initiatorReady = receiverReady = false;

// loading game assets
LoM.Battle = function(){};

LoM.Battle = {
    preload: function(){
        loadingGIF();

        var width = 25*32;
        var height = 16*32;
        var gameWidth = $('#game').width();
        var gameHeight = $('#game').width();
        LoM.Battle.offsetX = (gameWidth - width)/2;

        $("body").css('background-color','#201A1A');
        game.stage.backgroundColor = '#201A1A'

        this.backgroundSprite = this.game.add.tileSprite(LoM.Battle.offsetX ,0, width, height, 'battleBG');
        this.backgroundSprite.scale.x = 1
        this.backgroundSprite.scale.y = 1

        LoM.battleInfo;
        user = LoM.userInfo;
        
        room =LoM.battleInfo.room;
        delete LoM.battleInfo['room']

        for(role in LoM.battleInfo){
            if(LoM.battleInfo[role].id === user.id){
                LoM.battleInfo[role].controller = 'user';
                user.control = role
            }else{
                LoM.battleInfo[role].controller = 'enemy',
                enemy = LoM.battleInfo[role];
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
            turn: LoM.battleInfo.initiator.id,
            room: room
        }

        // console.log(battleInfo.receiver)
        setTimeout(function(){
            LoM.Battle.createInitiator(LoM.battleInfo.initiator)
            LoM.Battle.createReceiver(LoM.battleInfo.receiver)
            battleUpdate(LoM.battleInfo.initiator, LoM.battleInfo.receiver);
            $('.progress').fadeOut(function(){
                $('.progress').remove();
                initialized = true;
            })
        },1000)
        
    },
    update: function(){
        if(initiatorReady && receiverReady && initialized){
            if(this.state.turn === user.id ){
                $(".action-btn").prop("disabled", false);
                $('.battle-options').fadeIn();
            }else{
                $('.action-btn').prop("disabled", true);
                $('.battle-options').fadeOut();
            }

                var userHP = this.state.player[user.id].battle.hp;
                var userMP = this.state.player[user.id].battle.mp;

                var enemyHP = this.state.player[enemy.id].battle.hp;
                var enemyMP = this.state.player[enemy.id].battle.mp;
            
            $("#"+user.id+'-hp').html("HP: "+ userHP)
            $("#"+user.id+'-mp').html("MP: "+ userMP)

            $("#"+enemy.id+'-hp').html("HP: "+ enemyHP)
            $("#"+enemy.id+'-mp').html("MP: "+ enemyMP)

            if(userHP <= 0){

                var battle = this;
                initialized = false;

                battle.spriteMap[user.id].animations.play('die',10, false)
                
                $.ajax({
                    url: '/game/battle/lose/'+user.id+'?_method=PUT',
                    type: 'POST',
                    success: function(rewards){    
                        console.log(rewards)
                        var body = enemy.name + " win!"
                        LoM.userInfo.game_state.lose++
                        announcement(body)

                        setTimeout(function(){
                            Materialize.toast('+ ' + rewards.exp + ' Exp', 2000) // 4000 is the duration of the toast
                            Materialize.toast('+ ' + rewards.gold + ' Gold', 2000,'',function(){
                                console.log('hey')
                                gameOver()
                                removeInteraction('.battle-info')
                                removeInteraction('.battle-options')
                            }) 
                        },5000)

                    }
                })

            }
            
            if(enemyHP <= 0){
                var battle = this;
                initialized = false;

                battle.spriteMap[enemy.id].animations.play('die',10, false)
                $.ajax({
                    url: '/game/battle/win/'+user.id+'?_method=PUT',
                    type: 'POST',
                    success: function(rewards){    
                        var body = user.name + " win!"
                        announcement(body)
                        console.log(user)
                        LoM.userInfo.game_state.win++

                        setTimeout(function(){
                            Materialize.toast('+ ' + rewards.exp + ' Exp', 2000) // 4000 is the duration of the toast
                            Materialize.toast('+ ' + rewards.gold + ' Gold', 2000,'',function(){
                                gameOver()
                                removeInteraction('.battle-info')
                                removeInteraction('.battle-options')
                            }) 
                        },5000)
                    }
                })
            }
        }
    },
    render: function(){
        // LoM.debug.geom(menu,'#0fffff');
    },

    createInitiator: function(info){
        // console.log(info)
        var sprite =  this.add.sprite(LoM.Battle.offsetX +175, 230, info.sprite);
        sprite.frame = 40;
        sprite.scale.x = 1;
        sprite.scale.y = 1;

        sprite.data.position = "initiator";
        LoM.battleInfo.initiator.position = "initiator";
        LoM.battleInfo.initiator.weapon = {
            type: info.equipments['slot-6'].class,
            damage: [(info.modified_stats.attack/3), (info.modified_stats.attack + info.equipments['slot-6'].attack)/2]
        };
        
        var spell = info.equipments.spell;
        LoM.battleInfo.initiator.spell = {
            name: spell.name,
            type: spell.type,
            damage: [spell.min_damage,spell.max_damage],
            mp: spell.mp
        };
        
        LoM.battleInfo.initiator.battle = {
            // hp: info.modified_stats.hp,
            hp: 1,
            mp: info.modified_stats.mp,
            potion: 1
        }
        
        this.addBattleAnimations(sprite,info)

        this.spriteMap[info.id] = sprite
        this.state.player[info.id] = LoM.battleInfo.initiator;

        initiatorReady = true;
    },

    createReceiver: function(info){
        var sprite =  this.add.sprite(LoM.Battle.offsetX  + 560, 230, info.sprite);
        sprite.frame = 13;
        sprite.scale.x = 1;
        sprite.scale.y = 1;
        
        sprite.data.position = "receiver";
        LoM.battleInfo.receiver.position = "receiver";
        // LoM.battleInfo.receiver.turn  = false;
        LoM.battleInfo.receiver.weapon = {
            type: info.equipments['slot-6'].class,
            damage: [(info.modified_stats.attack/3), (info.modified_stats.attack + info.equipments['slot-6'].attack)/2]
        };
        // console.log(info)
        var spell = info.equipments.spell;

        LoM.battleInfo.receiver.spell = {
            name: spell.name,
            type: spell.type,
            damage: [spell.min_damage,spell.max_damage],
            mp: spell.mp
        };

        LoM.battleInfo.receiver.battle = {
            // hp: info.modified_stats.hp,
            hp: 1,
            mp: info.modified_stats.mp,
            potion: 1
        }
        


        this.addBattleAnimations(sprite,info)

        this.spriteMap[info.id] = sprite;  
        this.state.player[info.id] = LoM.battleInfo.receiver; 

        receiverReady = true;
        
    },

    addBattleAnimations: function(sprite,info){

        var tweenT = 1500;
        var animT = 15;
        var timeOutT = 500;

        if(sprite.data.position === 'initiator'){
            this.tweenMap[info.id] = {}
            var spell = sprite.animations.add('spell',[39,40,41,42,43,44,44,44,44,44,44,44,44,43,42,41,40,39],true)
            spell.onStart.add(function(){
                var fireball = LoM.Battle.add.sprite(LoM.Battle.offsetX  + 170,190, info.equipments.spell.type)
                var genBall = fireball.animations.add('genBall',[1,2,3,4,5],1000, false)
                var shootBall = fireball.animations.add('shootBall',[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],5000, true)
                var explodeBall = fireball.animations.add('explode', [32,33,34,35,36,37,38,39],1000, false)


                genBall.onComplete.add(function(){
                        var tweenBall =  LoM.Battle.add.tween(fireball).to({x: LoM.Battle.offsetX  +  520},750, 'Linear', false);
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

            switch(info.equipments['slot-6'].class){
                case 'sword':
                var sword = sprite.animations.add('sword',[195,196,197,198,199,200,199,198,197,196,195],true);
                    sprite.animations._anims.sword.onComplete.add(function(){
                        sprite.animations.play('left',10, true);
                        // this is the window object
                        var returnTween = LoM.Battle.add.tween(sprite).to({x:LoM.Battle.offsetX  +  175, y: 230},tweenT, 'Linear', true);
                        returnTween.onComplete.addOnce(function(){
                            sprite.animations.stop();
                            sprite.animations.play('right',50,false)
                            sprite.frame = 13;
                        })
                    })
        
                this.tweenMap[info.id].sword = this.add.tween(sprite).to({x: LoM.Battle.offsetX  +  520, y: 230},tweenT, 'Linear', false);
                this.tweenMap[info.id].sword.onStart.add(function(){sprite.animations.play('right',animT,true)}, this);
                this.tweenMap[info.id].sword.onComplete.add(function(){
                    sprite.animations.stop()
                    sprite.animations.play('sword',animT,false)
                }, this);

                break;
            
            case "spear":

                var spear = sprite.animations.add('spear',[247,248,249,250,251,252,253,254,255,255,254,253,252,251,250,249,248,247],true);
                
                    sprite.animations._anims.spear.onComplete.add(function(){
                        sprite.animations.play('left',10, true);
                        // this is the window object
                        var returnTween = LoM.Battle.add.tween(sprite).to({x: LoM.Battle.offsetX + 175, y: 230},tweenT, 'Linear', true);
                        returnTween.onComplete.addOnce(function(){
                            sprite.animations.stop();
                            sprite.animations.play('right',50,false)
                            sprite.frame = 13
                        })
                    })

                    this.tweenMap[info.id].spear = this.add.tween(sprite).to({x: LoM.Battle.offsetX  +  520, y: 230},tweenT, 'Linear', false);
                    this.tweenMap[info.id].spear.onStart.add(function(){sprite.animations.play('right',animT,true)}, this);
                    this.tweenMap[info.id].spear.onComplete.add(function(){
                        sprite.animations.stop()
                        sprite.animations.play('spear',animT,false)
                    }, this);

                    break;

            case "bow":
            
                var bow = sprite.animations.add('bow',[247,248,249,250,251,252,253,254,255,256,257,258,259],true);

                sprite.animations._anims.bow.onComplete.add(function(){
                    sprite.animations.play('left',10, true)
                })
                
                break
        }

            
            var addHealth = sprite.animations.add('potion',[260,260,260,260,260,260,260,260,261,262,262,262,261,260,260,260,143],false);

                addHealth.onStart.add(function(){

                var potionH = LoM.Town.add.sprite(LoM.Battle.offsetX + 195, 0,'health')
                potionH.scale.x= .25;
                potionH.scale.y= .25;
        
                falling = LoM.Town.add.tween(potionH).to({y: 270},1000,'Bounce',false)
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


            this.tweenMap[info.id] = {}
            
            var spell = sprite.animations.add('spell',[13,14,15,16,17,18,18,18,18,18,18,18,18,17,16,15,14,13],true)

            spell.onStart.add(function(){

                var fireball = LoM.Battle.add.sprite(LoM.Battle.offsetX + 480,190,info.equipments.spell.type)
                var genBall = fireball.animations.add('genBall',[1,2,3,4,5],1000, false)
                var shootBall = fireball.animations.add('shootBall',[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],5000, true)
                var explodeBall = fireball.animations.add('explode', [32,33,34,35,36,37,38,39],1000, false)


                genBall.onComplete.add(function(){
                    var tweenBall =  LoM.Battle.add.tween(fireball).to({x: LoM.Battle.offsetX  +  130},750, 'Linear', false);
                    tweenBall.start()
                    tweenBall.onStart.add(function(){
                        fireball.animations.play('shootBall',25, true)
                    })

                    tweenBall.onComplete.add(function(){
                        fireball.animations.stop();
                        // console.log('exploded')
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

            switch(info.equipments['slot-6'].class){

                case "sword":                    
                    var sword = sprite.animations.add('sword',[169,170,171,172,173,174,173,172,171,170,169],true);

                        sprite.animations._anims.sword.onComplete.add(function(){
                            sprite.animations.play('right',10, true);
                            // this is the window object
                            var returnTween = LoM.Battle.add.tween(sprite).to({x: LoM.Battle.offsetX  +  560, y: 230},tweenT, 'Linear', true);
                            returnTween.onComplete.addOnce(function(){
                                sprite.animations.stop();
                                sprite.animations.play('left',50,false)
                                sprite.frame = 13;
                                // console.log('sword slash!')
                            })
                        })

                        this.tweenMap[info.id].sword = this.add.tween(sprite).to({x: LoM.Battle.offsetX  +  210, y: 230},tweenT, 'Linear', false);
                        this.tweenMap[info.id].sword.onStart.add(function(){sprite.animations.play('left',animT,true)}, this);
                        this.tweenMap[info.id].sword.onComplete.add(function(){
                            sprite.animations.stop()
                            sprite.animations.play('sword',animT,false)
                        }, this);
                        break;
                
                case "spear":
                     var spear = sprite.animations.add('spear',[221,222,223,224,225,226,227,228,229,229,228,227,226,225,224,223,222,221],true);
            
                    sprite.animations._anims.spear.onComplete.add(function(){
                        sprite.animations.play('right',10, true);
                        // this is the window object
                        var returnTween = LoM.Battle.add.tween(sprite).to({x: LoM.Battle.offsetX  +  560, y: 230},tweenT, 'Linear', true);
                        returnTween.onComplete.addOnce(function(){
                            sprite.animations.stop();
                            sprite.animations.play('left',50,false)
                            sprite.frame = 13
                        })
                    })

                    this.tweenMap[info.id].spear = this.add.tween(sprite).to({x: LoM.Battle.offsetX   +  220, y: 230},tweenT, 'Linear', false);
                    this.tweenMap[info.id].spear.onStart.add(function(){sprite.animations.play('left',animT,true)}, this);
                    this.tweenMap[info.id].spear.onComplete.add(function(){
                        sprite.animations.stop()
                        sprite.animations.play('spear',animT,false)
                    }, this);
                    break;

                case "bow":
                    var bow = sprite.animations.add('bow',[221,222,223,224,225,226,227,228,229,229,228,227,226,225,224,223,222,221],true);
                
                    sprite.animations._anims.bow.onComplete.add(function(){
                        sprite.animations.play('right',10, true)
                    })
                    break;
                }

            var addHealth = sprite.animations.add('potion',[260,260,260,260,260,260,260,260,261,262,262,262,261,260,260,260,117],false);
            
                addHealth.onStart.add(function(){

                var potionH = LoM.Town.add.sprite(LoM.Battle.offsetX + 580, 0,'health')
                potionH.scale.x= .25;
                potionH.scale.y= .25;
        
                falling = LoM.Town.add.tween(potionH).to({y: 270},1000,'Bounce',false)
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
        this.tweenMap[attackerID][weapon].start();
        setTimeout(function(){Client.actionCompleted(state)},5000)
    },

    spell: function(state){
        var attackerID = state.roleID.attacker;
        var defenderID = state.roleID.defender;
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

function resetBattleInfo(){
    LoM.battleInfo = {};
    initiatorReady = receiverReady = initialized = false;
    delete LoM.userInfo.battle;
    $('.battle-info').empty();
}

