
// Initializing Materialize


        

// create interaction div
function genBattleInteraction(){

    var interaction = $('.interaction');
    var option = $('.battle-options');
    var wrapper = $("<div class='wrapper'>");
    var battleReq = $("<button class='battle-btn' id='battle-request'>Request Battle</button>");
    var battleAccept = $("<button class='battle-btn' id='battle-accept'>Accept Battle</button>");
    var battleDecline = $("<button class='battle-btn' id='battle-decline'>Decline Battle</button>");


    wrapper.append(battleReq,battleAccept,battleDecline);
    interaction.empty();
    interaction.append(wrapper);
    interaction.fadeIn();
    option.fadeIn();
}


function removeInteractionDisplay(){
    $('.interaction').fadeOut(function(){
        $('.interaction').empty();
    });
    
    // $('.announcement').empty();
}

function announcement(body){
    var announcement = $('.announcement');
    announcement.empty();
    
    var item = $("<p class='announcement-item'>")
    // item.css('display','none')
    item.text(body)

    announcement.append(item)
    item.fadeIn();
    setTimeout(function(){
        item.fadeOut(function(){
        item.remove()})
    },3000)
}

$('.interaction').on('click','#battle-request', function(ev){
    ev.preventDefault();
    Client.battleRequest();
})

$('.interaction').on('click','#battle-accept', function(ev){
    ev.preventDefault();
    Client.battleAccept(LoM.Town.battleInfo);
})


$('.interaction').on('click','#battle-decline', function(ev){
    ev.preventDefault();
    Client.battleDecline();
})


// BATTLE STATE

function battleUpdate(initiator,receiver){
    var menu = $('.battle-info');
    var iStats = $("<div class='stats-wrapper'>")
    var rStats = $("<div class='stats-wrapper'>")

    var iName = "<p class='stats-name'>"+initiator.name+"</p>";
    var iHP = "<p class='stats-hp' id='"+initiator.id+"-hp'>HP:"+initiator.battle.hp+"</p>";
    var iMP= "<p class='stats-mp' id='"+initiator.id+"-mp'>HP:"+initiator.battle.mp+"</p>";
    iStats.append(iName,iHP,iMP)

    var rName = "<p class='stats-name'>"+receiver.name+"</p>";
    var rHP = "<p class='stats-hp' id='"+receiver.id+"-hp'>HP:"+receiver.battle.hp+"</p>";
    var rMP= "<p class='stats-mp' id='"+receiver.id+"-mp'>HP:"+receiver.battle.mp+"</p>";

    rStats.append(rName,rHP,rMP);
    menu.append(iStats,rStats);
    menu.fadeIn();
  

    addBattleButton()
}

function removeBattleInteractions(){
    $('.battle-info').fadeOut();
    $('.battle-options').fadeOut();
}

function addBattleButton(){
    
    var attack;
    var spell;
    var health;

    attack = "<button class='action-btn' id='attack-btn'>Attack</button>"
    spell = "<button class='action-btn' id='spell-btn'>Spell</button>"
    health = "<button class='action-btn' id='health-btn'>Potion</button>"

    $('.battle-options').append(attack,spell,health)
}

function gameOver(){
    var button = $("<button class='action-btn' id='battle-return'>");
    button.text('Return');
    $('.battle-options').append(button);
    $('.battle-options').fadeIn();
}

var enableSubmit = function(ele) {
    $(ele).removeAttr("disabled");
}


$('.battle-options').on('click','#attack-btn', function(ev){
    ev.preventDefault();
    var state = LoM.Battle.state;
    state.action = 'attack';

    Client.battleAction(state);
})


$('.battle-options').on('click','#spell-btn', function(ev){
    ev.preventDefault();
    var state = LoM.Battle.state;
    var currentMP = state.player[LoM.userInfo.id].battle.mp;
    var spellcost = state.player[LoM.userInfo.id].spell.mp;
    var newMP = currentMP - spellcost;

    if(newMP < 0){
        var body = "You do not have enough MP"
        announcement(body);
        setTimeout(function(){LoM.Battle.state.turn = LoM.userInfo.id},500);
    }else{
        state.action = 'spell';
        Client.battleAction(state);
    }
})

$('.battle-options').on('click','#health-btn', function(ev){
    ev.preventDefault();
    var state = LoM.Battle.state;
    state.action = 'potion';

    Client.battleAction(state);
})

$('.battle-options').on('click','#battle-return', function(){
    $('#battle-return').prop('disabled',true)
    announcement('Returning to town!')
    removeBattleInteractions();
    setTimeout(function(){
        // LoM.game.state.start('Town')
        LoM.playerMaster[LoM.userInfo.id].world.location = "Town"
        var user = LoM.playerMaster[LoM.userInfo.id]

        Client.changeState(user);
    },3000)
    
})

$('.battle-options').on('click','.action-btn', function(){
    LoM.Battle.state.turn = enemy.id;
})

// INVENTORY INTERACTIONS

// on click on an item
$('#user-inventories').on('click',".invent-item",function(ev){
    ev.preventDefault();
    // grab sequelize information
    var item = this;
    var iventId = $(this).attr('data-invent-id');
    var equipped;
    // unequip the item if it is equip
    if($(this).hasClass('equipped')){
        equipped = {equipped: 0};
    }else{
        equipped = {equipped: 1};
    }
    // console.log(equipped)
    // perform an ajax call to change the equip state on server,
    $.ajax({
        url: 'game/inventories/'+iventId+'?_method=PUT',
        type: "POST",
        dataType: 'json',
        data: equipped,
        success: function(res){
            console.log(res)
            // on success remove equip class if return false
            if(parseInt(res.equipped) === 1){
                $(item).addClass('equipped');
            }else{
                $(item).removeClass('equipped');
                // console.log('unequipped')
            }
            // run updateEquipments function
            LoM.user.updateEquipments()
            // console.log(LoM.userInfo)
            // also resend out update to ther players 
            // Client.userUpdate(user)
        }
    })
});

// SIDE BAR TAB FUNCTION
$('.user-info-tab').on('click', function(){
    LoM.user.getInventory()
})

// CHAT FUNCTION
$('.message-input').on('focusin',function(){
    LoM.game.input.enabled = false;
})

$('.message-input').on('focusout',function(){
    LoM.game.input.enabled = true;
})

$('#game').on('click','canvas',function(){
    $('.message-input').blur();
    var xCoord = LoM.game.input.mousePointer.x +LoM.game.camera.x - 32; 
    var yCoord = LoM.game.input.mousePointer.y+LoM.game.camera.y - 42;

    LoM.player.getCoordinates
});



$('#global-message-input').on('keypress', function(ev){
    if(ev.which === 13){
        var message = {
            body: $('#global-message-input').val().trim(),
            user: LoM.userInfo.id
        };
        $.ajax({
            url: 'messages/new',
            method: 'POST',
            data: message,
            success: function(){
                Client.sendGlobalMessage(message)
                $('#global-message-input').val('');
            }
        })
    }
})


$('#private-message-input').on('keypress', function(ev){
    if(ev.which === 13){
        var message = {
            body: $('#global-message-input').val().trim(),
            user: LoM.userInfo.id,
            room: LoM.Battle.battleInfo.room
        };

        Client.sendPrivateMessage(message)
        $('#private-message-input').val('');
    }
})
    
