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
        $('#itemHere').append('<img class=swordItem src="/img/items/item-' + item + '.png"/>')

        if (true) {
            $(".swordItem").click(function () {

                $("#buyItem").append($(this))

            });
        }
    })



})


$("#helmet").click(function () {

    $("#chest").attr('src', chest[0].image);

    var helmetsArray = [21, 22];

    $("#itemHere").empty();

    helmetsArray.forEach(function (item) {
        $('#itemHere').append('<img class=helmetItem src="/img/items/item-' + item + '.png"/>')

        if (true) {

            $(".helmetItem").click(function () {

                $("#buyItem").append($(this))

            });
        }

    })
})

$("#legs").click(function () {

    $("#chest").attr('src', chest[0].image);


    var legsArray = [3, 8, 16];

    $("#itemHere").empty();

    legsArray.forEach(function (item) {
        $('#itemHere').append('<img class=legItem src="/img/items/item-' + item + '.png"/>')

        if (true) {
            $(".legItem").click(function () {

                $("#buyItem").append($(this))

            });
        }

    })

});

$("#boots").click(function () {

    $("#chest").attr('src', chest[0].image);


    var bootsArray = [4, 9, 17];

    $("#itemHere").empty();

    bootsArray.forEach(function (item) {
        $('#itemHere').append('<img class=bootsItem src="/img/items/item-' + item + '.png"/>')

        if (true) {
            $(".bootsItem").click(function () {

                $("#buyItem").append($(this))

            });
        }
    })

});

$("#armor").click(function () {

    $("#chest").attr('src', chest[0].image);

    var armorsArray = [2, 7, 19, 20];


    $("#itemHere").empty();

    armorsArray.forEach(function (item) {
        $('#itemHere').append('<img class=armorsItem src="/img/items/item-' + item + '.png"/>')

        if (true) {
            $(".armorsItem").click(function () {

                $("#buyItem").append($(this))

            });
        }
    })


});
