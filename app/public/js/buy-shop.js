// DECLARING GLOBAL VARIABLES
// ---------------------------------------------------------------------
var shopInvent = {};
var userInvent = {};
var user = JSON.parse(localStorage.getItem('user'));
var id = user.user_id;
var selected;

// GRAB PLAYER INVENTORY ON LOAD
// ---------------------------------------------------------------------
$(document).ready(function(){

$.ajax({
    url: '/game/inventories/'+id,
    method: 'GET',
    success: function(user){
        console.log(user.inventory)
        for(i = 0; i < user.inventory.length; i++){
            var inventId = user.inventory[i].id;
            console.log(inventId)
            userInvent[inventId] = user.inventory[i]
        }
        console.log(userInvent)
    }
})

// GRAB ALL ITEMS IN ITEM TABLE 
// ---------------------------------------------------------------------

    $.ajax({
        url: 'game/shop/all',
        method: 'GET',
        success: function(items){
            // console.log(items)
            for(i = 0; i < items.length; i++){
                var itemId = items[i].id
                shopInvent[itemId] = items[i];
            }
        }
    })
})

// DYNAMIC DOM INTERACTION ON BUTTON CLICK
// ---------------------------------------------------------------------

$("#sword").click(function () {
    var swordsArray = [1, 10, 15, 6, 11, 12, 13, 14, 18];
    $("#itemHere").empty();
    swordsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold" data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    });

    $('.tooltipped').tooltip({delay: 50});
});


$("#helmet").click(function () {
    var helmetsArray = [21, 22];
    $("#itemHere").empty();
    helmetsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold"  data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    })
    $('.tooltipped').tooltip({delay: 50});
})

$("#legs").click(function () {
    var legsArray = [3, 8, 16];
    $("#itemHere").empty();
    legsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold"  data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    })
    $('.tooltipped').tooltip({delay: 50});
});

$("#boots").click(function () {
    var bootsArray = [4, 9, 17];
    $("#itemHere").empty();
    bootsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold"  data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    })
    $('.tooltipped').tooltip({delay: 50});
});

$("#armor").click(function () {
    var armorsArray = [2, 7, 19, 20];
    $("#itemHere").empty();
    armorsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold"  data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    })
    $('.tooltipped').tooltip({delay: 50});
})

// APPENDING SELECT ITEM IN BUY DIV
// ---------------------------------------------------------------------

$("#itemHere").on('click',".item", function () {
    $('#checkContainer').animate({opacity: 1}, 'fast')
    $('.stat').empty();
    $('#item-pic').empty();
    $('#item-name').empty();

    var src = $(this).attr('src')
    var id = $(this).attr('data-id');
    selected = id;

    $('#item-pic').append('<img src="'+src+'"/>');
    $('#item-name').text(shopInvent[id].name)
    statsArray = ['hp','mp','attack','defense','agility','recovery'];
    
    statsArray.forEach(function(attr){
        $('#item-'+attr).text(shopInvent[id][attr])
    })
});

// AJAX CALLS TO SEND SELECTED TO DATABASE
// ---------------------------------------------------------------------

$('#buy-item').on('click', function(){
    var userGold = $('#user-gold').text();
    var cost = shopInvent[selected].buy;
    console.log(selected)
    for(inventItem in userInvent){
        console.log(userInvent[inventItem].ItemId)
        
        // if user already have the item in inventory, return
        //  this is a bug that need to be fixed by converting LoM.userInfo.inventory into nested objects rather than array
        if(userInvent[inventItem].ItemId === parseInt(selected)){
            Materialize.toast("You already purchase this item", 2000) 
            return
        }
    }

    // if user have enough hold to buy the item, update inventory table with the itemid and userid
    // else send a toast to indicate that user doesn't have enough money
    if(userGold-cost >= 0){
        var shopData = {
            cost: cost
        }

        // call ajax
        $.ajax({
            url: 'game/shop/'+selected,
            method: 'POST',
            data: shopData,
            success: function(res){
                var updatedGold = userGold - cost;
                $('#user-gold').text(updatedGold);
                Materialize.toast("Thank you for your purchase!", 2000) 
            }
        })
    }else{
        Materialize.toast("You don't have enough money!", 2000) 
    }

})

