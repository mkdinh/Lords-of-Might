var LoM = LoM || {};

LoM.interaction = {};


LoM.interaction = {

    npcInteractions: function(player,npc){
        var state = LoM.userInfo.world.state;

        if(player.data.role === 'player'){
            player = player
            npc = npc
        }else{
            var placeholder = player;
            player = npc;
            npc = placeholder
        }
        
        if(LoM.eventActive.state === false){
            console.log(npc)
            switch(npc.data.name){
                case 'Mysterious Stranger':
                    LoM.eventActive.state = true
                    break

                case 'Shop Owner':
                    var profile = "<img class='npc-profile' src='img/npc/profile-1.png' />"
                    $('.npc-interaction').append(profile)
                    $('.npc-profile').fadeIn(1000,function(){
                        var text = $('<div class="npc-message">')
                        text.append('<h5>Welcome to my Shop!</h5>'
                        +'<p>My name is Fooz, I used to be an adventurer just like you, until I took an arrow to the knee</p>'
                        +'<p>Now I just look cool in my golden armour and run the store, you want to check out the goods?</p>'
                        +'</div>')
                        shop = "<a class='action-btn waves-effect waves-light btn right' id='shop-btn' target='_blank' href='/'>Shop</a>"
                        $('.npc-interaction').append(text);
                        text.append(shop)

                        text.fadeIn(function(){
                            setTimeout(function(){
                                $('#shop-btn').animate({opacity: 1},1000)
                            },1000)
                        })
                    });
                    LoM.eventActive.state = true
                    break       
            }
            LoM.eventActive.state = true;
        }
    },

    playerInteractions: function(target){
        var state = LoM.userInfo.world.state;

        if(LoM.eventActive.state === false){
            if(target.data.id !== this.userInfo.id){
                
                LoM.battleInfo.initiator = LoM.userInfo;
                LoM.battleInfo.receiver = LoM.playerMaster[target.data.id]
                genBattleInteraction()
                // setTimeout(function(){removeInteractionDisplay()},10000)
            }else{
                removeInteractionDisplay()
                console.log('why keep hitting yourself?')
                return;
            }
            LoM.eventActive.state = true
        }
    },

    pointerOverIndicator(target){
        target.alpha = 0.5
    },

    pointerOutIndicator(target){
        target.alpha = 1
    },
    
    wallCollisions: function(){
            // var state = LoM.userInfo.world.state;

            // if(!LoM.eventActive.state){
            //     console.log('hit a wall')
            //     LoM.eventActive.state = true
            // }
    },

    shopInteractions: function(player,building){
        var state = LoM.userInfo.world.state;
        if(!LoM.eventActive.state){
            // announcement('New Shop! Open Soon!')
            LoM.playerMaster[LoM.userInfo.id].world.state = "Shop"
            var user = LoM.playerMaster[LoM.userInfo.id]

            // LoM.eventActive.state = true;
            Client.changeState(user);
            LoM.eventActive.state = true
        }
    },
    trainerInteractions: function(player,building){
        var state = LoM.userInfo.world.state;
        if(!LoM.eventActive.state){
            // announcement('New Shop! Open Soon!')
            LoM.playerMaster[LoM.userInfo.id].world.state = "Shop"
            var user = LoM.playerMaster[LoM.userInfo.id]

            // LoM.eventActive.state = true;
            Client.changeState(user);
            LoM.eventActive.state = true
        }
    },

    innInteractions: function(player,building){
        var state = LoM.userInfo.world.state;

        if(!LoM.eventActive.state){
            // console.log(building)
            // if(building.role === 'shop'){
                var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 400, align: "center", backgroundColor: "#ffff00" };
                
                var t = this.add.text(this.camera.x + (this.width/2), this.camera.y + (this.height/2), "New inn, open soon!", style);
                t.fixedToCamera = true;
                t.cameraOffset.setTo(200, 500);
                setTimeout(function(){t.destroy()},4000)
            // }
        LoM.eventActive.state = true;
        }
    }

}
// combine interaction object and Town
// LoM.Town = Object.assign(LoM.Town,interaction);
// LoM.Shop = Object.assign(LoM.Shop,interaction);
// LoM.Castle = Object.assign(LoM.Castle,interaction)