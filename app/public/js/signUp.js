var male = [
    {
        image: "img/profilePics/male/bald_head.jpeg"
    },
    {
        image: "img/profilePics/male/tormund.jpg"
    },
    {
        image: "img/profilePics/monsters/orc.jpg"
    },
    {
        image: "img/profilePics/monsters/skeleton.jpg"
    }
];

var female = [
    {
        image: "img/profilePics/female/female-knight.png"
    },
    {
        image: "img/profilePics/female/female_archer.png"
    },
    {
        image: "img/profilePics/female/female_fighter2.jpg"
    },
    {
        image: "img/profilePics/monsters/female-orc.jpg"
    }
];

$(document).ready(function(){

//once user clicks the next button

$("#button").click(function () {
    
    //removes initial divs and tags
    $( "label" ).remove();
    $( "#createName" ).remove();
    $( "#createPass" ).remove();
    $( "#createNickname" ).remove();
    $( "#createEmail" ).remove();
    $(".three").remove();
    
    //creating new divs and ids
    $( "#signup-wrapper" ).append( "<div id=sexContainer>" + "<p>CHOOSE YOUR CHARACTER PROFILE" + "</p>"+
                                    "<input id=male type=submit value=MALE >OR " + 
                                    "<input id=female type=submit value=FEMALE >" + "<div id=picContainer>" +
                                    "<div id=picture>" + "</div>" +"</div>");
    
    
      //once user clicks the male button
     $("#male").click(function(){
        
        $( "#picture" ).empty();
         
        $('#picture').prepend('<img id="picFour" src=' + male[3].image  +' />')        
        $('#picture').prepend('<img id="picThree" src=' + male[2].image  +' />')
        $('#picture').prepend('<img id="picTwo" src=' + male[1].image  +' />')
        $('#picture').prepend('<img id="picOne" src=' + male[0].image  +' />')
         
         
        $("#picOne").click(function(){
            console.log("Pic One male");
        });
        $("#picTwo").click(function(){
            console.log("Pic Two male");
        });
        $("#picThree").click(function(){
            console.log("Pic Three male");
        });
        $("#picFour").click(function(){
            console.log("Pic Four male");
        });
         
         
          if ($('#picContainer').contents().length !== 0) {
               
                  $("#female").click(function(){
    
                    $( "#picture" ).empty();

                    $('#picture').prepend('<img id="picFour" src=' + female[3].image  +' />')        
                    $('#picture').prepend('<img id="picThree" src=' + female[2].image  +' />')
                    $('#picture').prepend('<img id="picTwo" src=' + female[1].image  +' />')
                    $('#picture').prepend('<img id="picOne" src=' + female[0].image  +' />')


                    $("#picOne").click(function(){
                        console.log("Pic One female");
                    });
                    $("#picTwo").click(function(){
                        console.log("Pic Two female");
                    });
                    $("#picThree").click(function(){
                        console.log("Pic Three female");
                    });
                    $("#picFour").click(function(){
                        console.log("Pic Four female");
                    });

                });
              
            }
         
 
    });
    
    //once user clicks the female button
     $("#female").click(function(){
        
        $( "#picture" ).empty();

        $('#picture').prepend('<img id="picFour" src=' + female[3].image  +' />')        
        $('#picture').prepend('<img id="picThree" src=' + female[2].image  +' />')
        $('#picture').prepend('<img id="picTwo" src=' + female[1].image  +' />')
        $('#picture').prepend('<img id="picOne" src=' + female[0].image  +' />')
        
        $("#picOne").click(function(){
            console.log("Pic One female");
        });
        $("#picTwo").click(function(){
            console.log("Pic Two female");
        });
        $("#picThree").click(function(){
            console.log("Pic Three female");
        });
        $("#picFour").click(function(){
            console.log("Pic Four female");
        });
         
          if ($('#picContainer').contents().length !== 0) {
               
                  $("#male").click(function(){

                    $( "#picture" ).empty();

                    $('#picture').prepend('<img id="picFour" src=' + male[3].image  +' />')        
                    $('#picture').prepend('<img id="picThree" src=' + male[2].image  +' />')
                    $('#picture').prepend('<img id="picTwo" src=' + male[1].image  +' />')
                    $('#picture').prepend('<img id="picOne" src=' + male[0].image  +' />')


                    $("#picOne").click(function(){
                        console.log("Pic One male");
                    });
                    $("#picTwo").click(function(){
                        console.log("Pic Two male");
                    });
                    $("#picThree").click(function(){
                        console.log("Pic Three male");
                    });
                    $("#picFour").click(function(){
                        console.log("Pic Four male");
                    });

                });
              
            }
         
    });
          
        
});
    
});

