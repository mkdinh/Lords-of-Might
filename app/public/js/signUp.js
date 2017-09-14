

$(document).ready(function () {
    var newUser = {};

    // INITIALIZE MATERIALS CSS
    $('select').material_select();

    $('#signup-wrapper').fadeIn('slow');
    // $("#createSprite").fadeIn('slow');
    var male = ["/male/bald_head.jpeg","/male/tormund.jpg","/monsters/orc.jpg", "/monsters/skeleton.jpg"];
    
    var female = ["/female/female-knight.png", "/female/female_archer.png", "/female/female_fighter2.jpg", "/monsters/female-orc.jpg"];

    //once newUser clicks the next button

    $("#button").click(function () {

        newUser.username = $('#user-email').val().trim();
        newUser.password = $('#user-password').val().trim();
        newUser.name = $('#user-name').val().trim();

        //removes initial divs and tags
        $('#new-user-info').css('display','none');
        $('#sexContainer').fadeIn('slow');

        //once user clicks the female button
        $("#female").click(function(){
            $("#picture").empty();
            for(i = 0; i < female.length; i++){
                $('#picture').prepend('<img data-pic="'+ female[i] +'" class="profile-pic" src="img/profilePics' + female[i] + '"/>')
            }
        
        }) 

        $("#male").click(function(){
            $("#picture").empty();
            for(i = 0; i < male.length; i++){
                $('#picture').prepend('<img data-pic="'+ male[i] +'" class="profile-pic" src="img/profilePics' + male[i] + '"/>')
            }
        })

        $('#sexContainer').on('click', '.profile-pic', function(){
            newUser.profile = $(this).attr('data-pic');
            $('#picContainer').empty();
            $("#signup-wrapper").append("<button id='submitProfile' type=submit>Ready</button>");
        })

        //hide 

        $("#signup-wrapper").on('click', '#submitProfile', function (ev) {
            $("#signup-wrapper").hide();
            $("#createSprite").fadeIn('slow');
        });

    });

    newUser.sprite = {}
    // 
    // get link
    $('select').on('change', function(){
        console.log($(this).children(':selected').attr('data-link'))
        var path = $(this).children(':selected').attr('data-link');
        var part = $(this).children(':selected').attr('data-part');
        console.log(path)
        var ctx = document.getElementById('canvas').getContext('2d');
        // append link to obj
        newUser.sprite[part] = path;
        var order = ['body','leg','torso','head','feet'];

        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        order.forEach(function(part){
            if(newUser.sprite[part] === undefined){
                console.log('no part')
            }else{
                console.log(part)
                //  create new image
                var img = new Image();
        
                // draw on canvas in specific order
                //  add link to image
                img.onload = function() {
                    ctx.drawImage(img,0,0,832,1344,0,0,832,1344);
                }
                img.src = newUser.sprite[part]
                }
        })
    })


    // COMPILING USER INFO
    $('#weapon-select').on('change', function(){
        weapon = $(this).children(':selected').attr('data-item');
        newUser.item_inventory = weapon
    })

    $('#spell-select').on('change', function(){
        spell = $(this).children(':selected').attr('data-spell');
        newUser.spell_inventory = spell
    })

    $('#create').on('click', function(){
        var imgData = getImageData();
        newUser.spritesheet = imgData;

        $.ajax({
            url: '/user/new',
            method: 'POST',
            dataType: 'json',
            data: {newUser: JSON.stringify(newUser)},
            success: function(user){
                var loginInfo = {
                    username: newUser.username,
                    password: newUser.password,
                    user_id: user.id
                }
                autoLogin(loginInfo)
            },
            error: function(xhr,status,error){
                console.log(error)
            }
        })
    })

    function getImageData(){
        var sprite = document.getElementById('canvas');
        // var ctx = sprite.getContext('2d')
        // var width = 832;
        // var height= 1344;
        // var imgData = ctx.getImageData(0,0,width,height);
        var rawData = sprite.toDataURL('image/png')
        var imgData = rawData.replace(/^data:image\/png;base64,/, "");
        // asArray = new Uint8Array(data.length);   
        // var blob = new Blob( [ asArray.buffer ], {type: "image/png"} ); 
        // console.log(blob)
        return imgData;
    }

});

function autoLogin(info){
    $.ajax({
        url: '/user/login',
        method: 'POST',
        data: info,
        success: function(){
            localStorage.setItem('user',JSON.stringify(info));
            window.location.replace("/user")
        }
    })
}




