var shopInvent = {}

var user = JSON.parse(localStorage.getItem('user'));
var id = user.user_id;

var selected;

$(document).ready(function(){
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

$("#sword").click(function () {
    var swordsArray = [1, 10, 15, 6, 11, 12, 13, 14, 18];
    $("#itemHere").empty();
    swordsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold" data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    });
<<<<<<< HEAD

    $('.tooltipped').tooltip({delay: 50});
=======
<<<<<<< HEAD

    $(".swordItem").click(function () {

        if ($('#buyItem').contents().length === 0) {

            $(this).detach().appendTo("#buyItem");

        } else {
            Materialize.toast("Don't get greedy, only one item at a time.", 1500)
        }
    });

=======
>>>>>>> b63a1855684d15ecd9f41d1c9eb0e7b795231bc3
>>>>>>> c20fc8ea5e78fac862286885b636c33a6d75719b
});


$("#helmet").click(function () {
    var helmetsArray = [21, 22];
    $("#itemHere").empty();
    helmetsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold"  data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    })
<<<<<<< HEAD

    $(".helmetItem").click(function () {

        if ($('#buyItem').contents().length === 0) {

            $(this).detach().appendTo("#buyItem");

        } else {

            Materialize.toast("Don't get greedy, only one item at a time.", 1500)
        }
    });


=======
>>>>>>> b63a1855684d15ecd9f41d1c9eb0e7b795231bc3
})

$("#legs").click(function () {
    var legsArray = [3, 8, 16];
    $("#itemHere").empty();
    legsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold"  data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    })
<<<<<<< HEAD

    $(".legItem").click(function () {

        if ($('#buyItem').contents().length === 0) {

            $(this).detach().appendTo("#buyItem");

        } else {

            Materialize.toast("Don't get greedy, only one item at a time.", 1500)
        }
    });


=======
>>>>>>> b63a1855684d15ecd9f41d1c9eb0e7b795231bc3
});

$("#boots").click(function () {
    var bootsArray = [4, 9, 17];
    $("#itemHere").empty();
    bootsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold"  data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    })
<<<<<<< HEAD

    $(".bootsItem").click(function () {

        if ($('#buyItem').contents().length === 0) {

            $(this).detach().appendTo("#buyItem");

        } else {

            Materialize.toast("Don't get greedy, only one item at a time.", 1500)
        }
    });


=======
>>>>>>> b63a1855684d15ecd9f41d1c9eb0e7b795231bc3
});

$("#armor").click(function () {
    var armorsArray = [2, 7, 19, 20];
    $("#itemHere").empty();
    armorsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item tooltipped" data-delay="50" data-position="bottom" data-tooltip="'+ shopInvent[item].buy +' gold"  data-id="'+item+'" src="/img/items/item-' + item + '.png"/>')
    })
})


<<<<<<< HEAD
    $(".armorsItem").click(function () {

        if ($('#buyItem').contents().length === 0) {

            $(this).detach().appendTo("#buyItem");

        } else {

            Materialize.toast("Don't get greedy, only one item at a time.", 1500)
        }
    });
=======
$("#itemHere").on('click',".item", function () {
    $('#checkContainer').animate({opacity: 1}, 'fast')
    $('.stat').empty();
    $('#item-pic').empty();
    $('#item-name').empty();
>>>>>>> b63a1855684d15ecd9f41d1c9eb0e7b795231bc3

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

$('#buy-item').on('click', function(){
    var userGold = $('#user-gold').text();
    var cost = shopInvent[selected].buy;

    if(userGold-cost > 0){

        var shopData = {
            cost: cost,
            user_id: user_id,
            id: selected
        }

        // call ajax
        $.ajax({
            url: 'game/shop/'+selected,
            method: 'POST',
        })
    }else{
        Materialize.toast("You don't have enough money!", 2000) 
    }

})

