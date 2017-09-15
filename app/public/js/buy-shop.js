var shopInvent = {}

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
            console.log(shopInvent)
        }
    })
})

$("#sword").click(function () {
    var swordsArray = [1, 10, 15, 6, 11, 12, 13, 14, 18];
    $("#itemHere").empty();
    swordsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item" src="/img/items/item-' + item + '.png"/>')
    });
});


$("#helmet").click(function () {
    var helmetsArray = [21, 22];
    $("#itemHere").empty();
    helmetsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item" src="/img/items/item-' + item + '.png"/>')
    })
})

$("#legs").click(function () {
    var legsArray = [3, 8, 16];
    $("#itemHere").empty();
    legsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item" src="/img/items/item-' + item + '.png"/>')
    })
});

$("#boots").click(function () {
    var bootsArray = [4, 9, 17];
    $("#itemHere").empty();
    bootsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item" src="/img/items/item-' + item + '.png"/>')
    })
});

$("#armor").click(function () {
    var armorsArray = [2, 7, 19, 20];
    $("#itemHere").empty();
    armorsArray.forEach(function (item) {
        $('#itemHere').append('<img class="item" src="/img/items/item-' + item + '.png"/>')
    })
})


$("#itemHere").on('click',".item", function () {
    $('#checkContainer').animate({opacity: 1}, 'fast')
    $('.stat').empty();
    $('#item-pic').empty();
    $('#item-name').empty();

    var src = $(this).attr('src')
    $('#item-pic').append('<img src="'+src+'"/>');
});

