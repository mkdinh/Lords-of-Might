

$(document).ready(function () {
    
    // INITIALIZE MATERIALS CSS
    $('select').material_select();

    // $('#signup-wrapper').fadeIn('slow');
    $("#createSprite").fadeIn('slow');
    var male = ["/male/bald_head.jpeg","/male/tormund.jpg","/monsters/orc.jpg", "/monsters/skeleton.jpg"];
    
    var female = ["/female/female-knight.png", "/female/female_archer.png", "/female/female_fighter2.jpg", "/monsters/female-orc.jpg"];

    //once user clicks the next button

    $("#button").click(function () {

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
            $('#picContainer').empty();
            $("#signup-wrapper").append("<button id='submitProfile' type=submit>Ready</button>");
        })

        //hide 

        $("#signup-wrapper").on('click', '#submitProfile', function (ev) {
            $("#signup-wrapper").hide();
            $("#createSprite").fadeIn('slow');
        });

    });

});

var sprite = {
}
// 
// get link
$('select').on('change', function(){
    console.log($(this).children(':selected').attr('data-link'))
    var path = $(this).children(':selected').attr('data-link');
    var part = $(this).children(':selected').attr('data-part');
    console.log(path)
    var ctx = document.getElementById('canvas').getContext('2d');
    // append link to obj
    sprite[part] = path;
    var order = ['body','leg','torso','head','feet'];

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    order.forEach(function(part){
        if(sprite[part] === undefined){
            console.log('no part')
        }else{
            console.log(part)
            //  create new image
            var img = new Image();
    
            // draw on canvas in specific order
            //  add link to image
            img.onload = function() {
                ctx.drawImage(img,0,128,64,64,0,0,256,256);
            }
            img.src = sprite[part]
            }
    })
})


