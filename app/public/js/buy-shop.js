var chest = [
    {
        image: "img/open-chest.png"
    },
    {
        image: "img/chest.png"
    }
]

$("#sword").click(function () {

    $("#chest").attr('src', chest[0].image);

    var swordsArray = [1, 10, 15, 6, 11, 12, 13, 14, 18];

    $("#itemHere").empty();

    swordsArray.forEach(function (item) {
        $('#itemHere').append('<img id=swordItem src="/img/items/item-' + item + '.png"/>')

        if (true) {
            $("#swordItem").click(function () {
                console.log($(this).attr('src'))
            });
        }
    })



})


$("#helmet").click(function () {

    $("#chest").attr('src', chest[0].image);

    var helmetsArray = [21, 22];

    $("#itemHere").empty();

    helmetsArray.forEach(function (item) {
        $('#itemHere').append('<img id=helmetItem src="/img/items/item-' + item + '.png"/>')
    })
})

$("#legs").click(function () {

    $("#chest").attr('src', chest[0].image);


    var legsArray = [3, 8, 16];

    $("#itemHere").empty();

    legsArray.forEach(function (item) {
        $('#itemHere').append('<img id=legItem src="/img/items/item-' + item + '.png"/>')
    })

});

$("#boots").click(function () {

    $("#chest").attr('src', chest[0].image);


    var bootsArray = [4, 9, 17];

    $("#itemHere").empty();

    bootsArray.forEach(function (item) {
        $('#itemHere').append('<img id=legItem src="/img/items/item-' + item + '.png"/>')
    })

});

$("#armor").click(function () {

    $("#chest").attr('src', chest[0].image);

    var armorsArray = [2, 7, 19, 20];


    $("#itemHere").empty();

    armorsArray.forEach(function (item) {
        $('#itemHere').append('<img id=legItem src="/img/items/item-' + item + '.png"/>')
    })


});
