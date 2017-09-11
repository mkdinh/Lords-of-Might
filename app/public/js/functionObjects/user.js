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
        $('#user-inventories').empty();

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
            $('#user-inventories').append(linkWrapper)
        }
        $("#user-gold-amount").html(LoM.userInfo.based_stats.gold)
        LoM.user.updateEquipments();
    },

    updateEquipments: function(){
        var equipped = LoM.userInfo.equipments;
        equipped = {};

        let allType = ['quest','head','torso','leg','feet','hand','weapon','consumable'];
        for(i = 0; i < LoM.userInfo.inventory.length; i++){
            if(LoM.userInfo.inventory[i].equipped){
                // if equipped, find the item slot
                let slot = LoM.userInfo.inventory[i].Item.slot;
                equipped[allType[slot]] = LoM.userInfo.inventory[i].Item
            }
        }

        allType.forEach(function(type){
            if(equipped[type] === undefined){
                $('#equip-'+type).html("Not Equipped")
            }else{         
                $('#equip-'+type).html(equipped[type].name)
            }
        })

        LoM.user.updateStats(equipped);
        LoM.user.updateProfile();
    },
    updateStats: function(equipments){
        var based_stats = LoM.userInfo.based_stats;
        var modified_stats = LoM.userInfo.modified_stats;
        // modfied_stats = based_stats;

        var allAttr = ["hp","mp","attack","defense","agility","recovery"];

        for(attr in modified_stats){
                modified_stats[attr] = based_stats[attr]
        }
        
        for(item in equipments){
            for(i = 0; i < allAttr.length; i++){
                let attr = allAttr[i]   
                modified_stats[attr] += equipments[item][attr]   
            }
        }

        allAttr.forEach(function(attr){
            $('#user-'+attr).html(modified_stats[attr])
        });
    },
    updateProfile: function(){
        let profile = LoM.userInfo.profile;
        let win = LoM.userInfo.based_stats.win;
        let lose = LoM.userInfo.based_stats.lose;

        $('#user-profile').html("<img class='profile-img' src='"+profile+"'/>")
        $('#user-win').html(win)
        $('#user-lose').html(lose)
    }
}