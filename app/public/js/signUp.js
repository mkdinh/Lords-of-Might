//initial start of the page

$("#button").click(function () {
    $( "label" ).remove();
    $( "#createName" ).remove();
    $( "#createPass" ).remove();
    $(".three").remove();
    
    $( "#signup-wrapper" ).append("<label>CREATE USERNAME: " + "</label>" + 
                                    "<div style=width: 50%; >" + "<input type=text >" +  "</div>" );
    
    
});
