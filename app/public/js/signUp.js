

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

        if( !isValidEmailAddress(newUser.username) ) {
            Materialize.toast("Your email need to be in valid format", 2000, 'indigo darken-4') 
            return
        }else if(newUser.password.length <6){
            Materialize.toast("Your password need to be greater than 6 characters", 2000, 'indigo darken-4') 
            return
        }else if(newUser.name.length === 0){
            Materialize.toast("What do you call yourself?", 2000, 'indigo darken-4') 
            return
        }else if(newUser.name.length > 12){
            Materialize.toast("Your name need to be less than 12 characters", 2000, 'indigo darken-4')
            return 
        }

        $.ajax({
            url: '/user/email',
            method: 'POST',
            data: {email: newUser.username},
            success: function(email){
                if(!email.available){
                    Materialize.toast("Your email is already in the system!", 2000, 'indigo darken-4') 
                }else{
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
                }
            }
        })
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
        var order = ['body','leg','torso','head','feet','weapon'];

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

        if(newUser.sprite.body === undefined){
            Materialize.toast("Can't have a floating hat, select a body!", 2000, 'indigo darken-4') 
        }
        else if(newUser.item_inventory === undefined){
            Materialize.toast("Can't fight without a weapon!", 2000, 'indigo darken-4') 
        }else if(newUser.spell_inventory === undefined){
            Materialize.toast("You gonna want to cast some magic", 2000, 'indigo darken-4') 
        }else if(newUser.sprite.leg === undefined){
            Materialize.toast("For the love of god put on some pants", 2000, 'indigo darken-4') 
        }else{
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
        }
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

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

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




