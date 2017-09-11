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

//once user clicks the next button

$("#button").click(function () {
    
    //removes initial divs and tags
    $( "label" ).remove();
    $( "#createName" ).remove();
    $( "#createPass" ).remove();
    $(".three").remove();
    
    //creating new divs and ids
    $( "#signup-wrapper" ).append( "<div id=sexContainer>" + "<input id=male type=submit value=MALE >OR " + 
                                    "<input id=female type=submit value=FEMALE >" + "<div id=picContainer>" +
                                    "<p>CHOOSE YOUR CHARACTER PROFILE" + "</p>"+ "<img id=picOne>" + 
                                    "<img id=picTwo>" + "<img id=picThree>" + "<img id=picFour>" +
                                    "</div>" );
    
    
      //once user clicks the male button
     $("#male").click(function(){
        
        $("#picOne").attr("src", male[0].image);
        $("#picTwo").attr("src", male[1].image);
        $("#picThree").attr("src", male[2].image);
        $("#picFour").attr("src", male[3].image);
        
        
        $("#picOne").click(function(){
            console.log("Pic One");
        });
        $("#picTwo").click(function(){
            console.log("Pic Two");
        });
        $("#picThree").click(function(){
            console.log("Pic Three");
        });
        $("#picFour").click(function(){
            console.log("Pic Four");
        });
         
         
          if ($('#picContainer').contents().length !== 0) {
               
                  $("#female").click(function(){
    

                    $("#picOne").attr("src", female[0].image);
                    $("#picTwo").attr("src", female[1].image);
                    $("#picThree").attr("src", female[2].image);
                    $("#picFour").attr("src", female[3].image);


                    $("#picOne").click(function(){
                        console.log("Pic One");
                    });
                    $("#picTwo").click(function(){
                        console.log("Pic Two");
                    });
                    $("#picThree").click(function(){
                        console.log("Pic Three");
                    });
                    $("#picFour").click(function(){
                        console.log("Pic Four");
                    });

                });
              
            }
         
 
    });
    
    //once user clicks the female button
     $("#female").click(function(){
        
        
        $("#picOne").attr("src", female[0].image);
        $("#picTwo").attr("src", female[1].image);
        $("#picThree").attr("src", female[2].image);
        $("#picFour").attr("src", female[3].image);
        
        
        $("#picOne").click(function(){
            console.log("Pic One");
        });
        $("#picTwo").click(function(){
            console.log("Pic Two");
        });
        $("#picThree").click(function(){
            console.log("Pic Three");
        });
        $("#picFour").click(function(){
            console.log("Pic Four");
        });
         
          if ($('#picContainer').contents().length !== 0) {
               
                  $("#male").click(function(){

                    $("#picOne").attr("src", male[0].image);
                    $("#picTwo").attr("src", male[1].image);
                    $("#picThree").attr("src", male[2].image);
                    $("#picFour").attr("src", male[3].image);


                    $("#picOne").click(function(){
                        console.log("Pic One");
                    });
                    $("#picTwo").click(function(){
                        console.log("Pic Two");
                    });
                    $("#picThree").click(function(){
                        console.log("Pic Three");
                    });
                    $("#picFour").click(function(){
                        console.log("Pic Four");
                    });

                });
              
            }
         
    });
          
        
});
