var LoM = LoM || {};

LoM.user = {};

LoM.user = function(){};

LoM.user = {

    getInventory: function(fn){
        $.ajax({
            url: "/game/inventories/"+LoM.userInfo.id,
            type: "GET",
            success: function(userInfo){
                console.log('get inventories')
                LoM.userInfo.inventory = userInfo.inventory;
                LoM.userInfo.equipments = userInfo.equipped;
                LoM.user.updateInventory();
                LoM.user.updateEquipments();
                LoM.user.updateStats();
                LoM.user.updateSpells();
                fn()
            }
        })
    },

    updateInventory: function(){
        $('#inventory-space').empty();

        var inv = LoM.userInfo.inventory;
        // console.log(inv)
        for(i = 0; i < inv.length; i++){
            var linkWrapper = $("<a>");
            linkWrapper.attr('href','#/')
            var pic = $('<img>'); 
            pic.attr('src','img/Items/item-' + inv[i].Item.id + '.png')
            pic.attr('data-item-id',inv[i].Item.id)
            pic.attr('data-invent-id',inv[i].id)
            pic.attr('data-array-index', i )
            pic.attr('data-item-slot',inv[i].Item.slot)
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
    },

    updateEquipments: function(){
        equipped = LoM.userInfo.equipments;
        // var equipped = LoM.userInfo.equipments;
        console.log(equipped)

        // // equipping to slot
        let allType = ['quest','head','torso','leg','feet','hand','weapon','consumable'];
        
        allType.forEach(function(type){
            if(equipped[type] === undefined){
                $('#equip-'+type).html("Not Equipped")
            }else{         
                $('#equip-'+type).html(equipped[type].name)
            }
        })

        // for(i = 0; i < LoM.userInfo.inventory.length; i++){
        //     if(LoM.userInfo.inventory[i].equipped){
        //         // if equipped, find the item slot
        //         let slot = LoM.userInfo.inventory[i].Item.slot;
        //         equipped[allType[slot]] = LoM.userInfo.inventory[i].Item
        //     }
        // }
            // console.log('update equipments', equipped)
            console.log(equipped)
            for(i = 0; i < allType.length; i++){
                if(equipped['slot-'+i] === undefined){
                    $('#equip-'+allType[i]).html("Not Equipped")
                }else{         
                    $('#equip-'+allType[i]).html(equipped['slot-'+[i]].name)
                }
            };
        
        // setTimeout(function(){
        //     LoM.user.updateStats(equipped);
        //     LoM.user.updateProfile();
        // },500)
    },

    updateSpells: function(equipped){
        // convert spell array into object
        var equipped = LoM.userInfo.equipments; 
        // equipping spell
        var spells = LoM.userInfo.spells;
        for( i = 0; i < spells.length; i++){

            let spellInfo  = spells[i].Spell;
            let spellName  = spellInfo.name;
                // spellObj[spellName] = spellInfo;

            if(spells[i].equipped){
                equipped["spell"] = spells[i].Spell;
                $('#equip-spell').html(spellName)
            }
            console.log('equipping spells')
            console.log(equipped)
            // LoM.userInfo.spells = spellObj
            // console.log(spellObj)
        }       
    },

    updateStats: function(){
        LoM.userInfo.modified_stats = {};
        var modified_stats = LoM.userInfo.modified_stats;
        var based_stats = LoM.userInfo.based_stats;
        var equipped = LoM.userInfo.equipments;
        console.log(equipped);
        console.log(based_stats)
        var allAttr = ["hp","mp","attack","defense","agility","recovery"];

        // reset modified stats to base stats so calculated stats doesnt get add onto current modifed states
        for(attr in based_stats){
            modified_stats[attr] =  based_stats[attr]
        }
        console.log(modified_stats)
        
        for(item in equipped){
            if(item !== 'spell'){
                for(i = 0; i < allAttr.length; i++){
                    let attr = allAttr[i];   
                    if(item[attr] !== 0){    
                        modified_stats[attr] += equipped[item][attr] 
                    }
                }
            }
        }

        // append stats to browser
        allAttr.forEach(function(attr){
            $('#user-'+attr).html(modified_stats[attr])
        });

        LoM.user.updateProfile();
    },
    updateProfile: function(){
        let name = LoM.userInfo.name;
        let level = 1
        let profile = LoM.userInfo.profile;
        let win = LoM.userInfo.game_state.win;
        let lose = LoM.userInfo.game_state.lose;
        let exp = LoM.userInfo.game_state.exp;

        $('#user-name').html(name)
        $('#user-profile').html("<img class='profile-img card' src='/img/profilePics/monsters/"+ LoM.userInfo.profile +"'/>")
        $('#user-level').html(level)
        $('#user-win').html(win)
        $('#user-lose').html(lose)
        $('#user-exp').html(exp)
    }
}