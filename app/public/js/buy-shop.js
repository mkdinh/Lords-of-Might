var chest = [
    {
        image: "img/open-chest.png"
    },
    {
        image: "img/chest.png"
    }
]


var items = [
    {
        image: "img/items/item-1.png"
    },
    {
        image: "img/items/item-2.png"
    },
    {
        image: "img/items/item-3.png"
    },
    {
        image: "img/items/item-4.png"
    },
    {
        image: "img/items/item-5.png"
    },
    {
        image: "img/items/item-6.png"
    },
    {
        image: "img/items/item-7.png"
    },
    {
        image: "img/items/item-8.png"
    },
    {
        image: "img/items/item-9.png"
    },
    {
        image: "img/items/health.png"
    }
]


//if user clicks the button SWORDS first//

$("#sword").click(function () {

    $("#chest").attr('src', chest[0].image);

    $("#itemHere").empty();

    $('#itemHere').prepend('<img id=swordItem src=' + items[0].image + ' />')
    $('#itemHere').prepend('<img id=swordItem src=' + items[5].image + ' />')

    if ($('#itemHere').contents().length !== 0) {

        $("#helmet").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=helmetItem src=' + items[4].image + ' />')

        })

        $("#legs").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=legItem  src=' + items[2].image + ' />')
            $('#itemHere').prepend('<img id=legItem  src=' + items[7].image + ' />')

        });

        $("#boots").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=bootsItem src=' + items[3].image + ' />')
            $('#itemHere').prepend('<img id=bootsItem src=' + items[8].image + ' />')

        });

        $("#armor").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=armorItem src=' + items[1].image + ' />')
            $('#itemHere').prepend('<img id=armorItem src=' + items[6].image + ' />')


        });

        $("#health").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=healthItem src=' + items[9].image + ' />')

        });


    };


});

//if user clicks the button HELMETS first//

$("#helmet").click(function () {

    $("#chest").attr('src', chest[0].image);

    $("#itemHere").empty();

    $('#itemHere').prepend('<img id=helmetItem src=' + items[4].image + ' />')

    if ($('#itemHere').contents().length !== 0) {

        $("#sword").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=swordItem src=' + items[0].image + ' />')
            $('#itemHere').prepend('<img id=swordItem src=' + items[5].image + ' />')

        });


        $("#legs").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=legItem  src=' + items[2].image + ' />')
            $('#itemHere').prepend('<img id=legItem  src=' + items[7].image + ' />')

        });

        $("#boots").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=bootsItem src=' + items[3].image + ' />')
            $('#itemHere').prepend('<img id=bootsItem src=' + items[8].image + ' />')

        });

        $("#armor").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=armorItem src=' + items[1].image + ' />')
            $('#itemHere').prepend('<img id=armorItem src=' + items[6].image + ' />')

        });

        $("#health").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=healthItem src=' + items[9].image + ' />')


        });


    };


});

//if user clicks the button LEGS first//

$("#legs").click(function () {

    $("#chest").attr('src', chest[0].image);

    $("#itemHere").empty();

    $('#itemHere').prepend('<img id=legItem  src=' + items[2].image + ' />')
    $('#itemHere').prepend('<img id=legItem  src=' + items[7].image + ' />')

    if ($('#itemHere').contents().length !== 0) {

        $("#sword").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=swordItem src=' + items[0].image + ' />')
            $('#itemHere').prepend('<img id=swordItem src=' + items[5].image + ' />')

        });


        $("#helmet").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=helmetItem src=' + items[4].image + ' />')

        });

        $("#boots").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=bootsItem src=' + items[3].image + ' />')
            $('#itemHere').prepend('<img id=bootsItem src=' + items[8].image + ' />')

        });

        $("#armor").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=armorItem src=' + items[1].image + ' />')
            $('#itemHere').prepend('<img id=armorItem src=' + items[6].image + ' />')

        });

        $("#health").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=healthItem src=' + items[9].image + ' />')


        });


    };


});

//if user clicks the button BOOTS first//

$("#boots").click(function () {

    $("#chest").attr('src', chest[0].image);

    $("#itemHere").empty();

    $('#itemHere').prepend('<img id=bootsItem src=' + items[3].image + ' />')
    $('#itemHere').prepend('<img id=bootsItem src=' + items[8].image + ' />')

    if ($('#itemHere').contents().length !== 0) {

        $("#sword").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=swordItem src=' + items[0].image + ' />')
            $('#itemHere').prepend('<img id=swordItem src=' + items[5].image + ' />')

        });


        $("#helmet").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=helmetItem src=' + items[4].image + ' />')

        });

        $("#legs").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=legItem  src=' + items[2].image + ' />')
            $('#itemHere').prepend('<img id=legItem  src=' + items[7].image + ' />')

        });

        $("#armor").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=armorItem src=' + items[1].image + ' />')
            $('#itemHere').prepend('<img id=armorItem src=' + items[6].image + ' />')

        });

        $("#health").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=healthItem src=' + items[9].image + ' />')


        });



    };


});

//if user clicks the button ARMOR first//

$("#armor").click(function () {

    $("#chest").attr('src', chest[0].image);

    $("#itemHere").empty();

    $('#itemHere').prepend('<img id=armorItem src=' + items[1].image + ' />')
    $('#itemHere').prepend('<img id=armorItem src=' + items[6].image + ' />')

    if ($('#itemHere').contents().length !== 0) {

        $("#sword").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=swordItem src=' + items[0].image + ' />')
            $('#itemHere').prepend('<img id=swordItem src=' + items[5].image + ' />')

        });


        $("#helmet").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=helmetItem src=' + items[4].image + ' />')

        });

        $("#legs").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=legItem  src=' + items[2].image + ' />')
            $('#itemHere').prepend('<img id=legItem  src=' + items[7].image + ' />')

        });

        $("#boots").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=bootsItem src=' + items[3].image + ' />')
            $('#itemHere').prepend('<img id=bootsItem src=' + items[8].image + ' />')


        });

        $("#health").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=healthItem src=' + items[9].image + ' />')


        });


    };


});

//if user clicks the button ARMOR first//

$("#health").click(function () {

    $("#chest").attr('src', chest[0].image);

    $("#itemHere").empty();

    $('#itemHere').prepend('<img id=healthItem src=' + items[9].image + ' />')

    if ($('#itemHere').contents().length !== 0) {

        $("#sword").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=swordItem src=' + items[0].image + ' />')
            $('#itemHere').prepend('<img id=swordItem src=' + items[5].image + ' />')

        });


        $("#helmet").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=helmetItem src=' + items[4].image + ' />')

        });

        $("#legs").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=legItem  src=' + items[2].image + ' />')
            $('#itemHere').prepend('<img id=legItem  src=' + items[7].image + ' />')

        });

        $("#boots").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=bootsItem src=' + items[3].image + ' />')
            $('#itemHere').prepend('<img id=bootsItem src=' + items[8].image + ' />')


        });

        $("#armor").click(function () {

            $("#itemHere").empty();

            $('#itemHere').prepend('<img id=armorItem src=' + items[1].image + ' />')
            $('#itemHere').prepend('<img id=armorItem src=' + items[6].image + ' />')


        });


    };


});
