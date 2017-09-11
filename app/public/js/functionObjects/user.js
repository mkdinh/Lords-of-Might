var LoM = LoM || {};

LoM.user = {};

LoM.user = function(){};

LoM.user = {

    getInventory: function(){
        $.ajax({
            url: "/game/inventories/"+LoM.userInfo.id,
            type: "GET",
            success: function(inventory){
                LoM.userInfo.inventory = inventory;
                LoM.user.updateInventory();
            }
        })
    },

    updateInventory: function(){
        $('#inventory-space').empty();

        var inv = LoM.userInfo.inventory;
        for(i = 0; i < inv.length; i++){
            var linkWrapper = $("<a>");
            linkWrapper.attr('href','#/')
            var pic = $('<img>'); 
            pic.attr('src','img/Items/item-' + inv[i].Item.id + '.png')
            pic.attr('data-item-id',inv[i].Item.id)
            pic.attr('data-invent-id',inv[i].id)
            if(inv[i].equipped){
                pic.addClass('invent-item equipped');
            }else{
                pic.addClass('invent-item');
            }
            linkWrapper.append(pic)
            $('#inventory-space').append(linkWrapper)
        }
        $("#user-gold-amount").html(LoM.userInfo.game_state.gold)
        $("#invent-space-available").html('space: ' + inv.length + "/10")
        LoM.user.updateEquipments();
    },

    updateEquipments: function(){
        LoM.userInfo.equipments = {};
        var equipped = LoM.userInfo.equipments;

        // equipping to slot
        let allType = ['quest','head','torso','leg','feet','hand','weapon','consumable'];
        for(i = 0; i < LoM.userInfo.inventory.length; i++){
            if(LoM.userInfo.inventory[i].equipped){
                // if equipped, find the item slot
                let slot = LoM.userInfo.inventory[i].Item.slot;
                equipped[allType[slot]] = LoM.userInfo.inventory[i].Item
            }
        }
        console.log('update equipments', equipped)

        allType.forEach(function(type){
            if(equipped[type] === undefined){
                $('#equip-'+type).html("Not Equipped")
            }else{         
                $('#equip-'+type).html(equipped[type].name)
            }
        })

        // equipping spell
        var spells = LoM.userInfo.spells;
        for( i = 0; i < spells.length; i++){
            if(spells[i].equipped){
                equipped["spell"] = spells[i].Spell;
                $('#equip-spell').html(spells[i].Spell.name)
            }
        }

        setTimeout(function(){
            LoM.user.updateStats(equipped);
            LoM.user.updateProfile();
        },500)
    },
    updateStats: function(equipments){
        var based_stats = LoM.userInfo.based_stats;
        var modified_stats = LoM.userInfo.modified_stats;
        // modfied_stats = based_stats;
        // console.log(equipments)
        // these are the stats to be calculated 
        var allAttr = ["hp","mp","attack","defense","agility","recovery"];

        // reset modified stats to base stats so calculated stats doesnt get add onto current modifed states
        for(attr in modified_stats){
                modified_stats[attr] = based_stats[attr]
        }
        
        // check over each equipments and calculate current stats
        for(item in equipments){
            if(item !== "spell"){
                for(i = 0; i < allAttr.length; i++){
                    let attr = allAttr[i]   
                    modified_stats[attr] += equipments[item][attr]   
                }
            }
        }

        // append stats to browser
        allAttr.forEach(function(attr){
            $('#user-'+attr).html(modified_stats[attr])
        });

    },
    updateProfile: function(){
        let profile = LoM.userInfo.profile;
        let win = LoM.userInfo.game_state.win;
        let lose = LoM.userInfo.game_state.lose;

        $('#user-profile').html("<img class='profile-img' src='"+profile+"'/>")
        $('#user-win').html(win)
        $('#user-lose').html(lose)
    }
}