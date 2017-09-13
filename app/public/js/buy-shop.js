var chest = [
    {
        image: "img/open-chest.png"
    },
    {
        image: "img/chest.png"
    }
]



$("#sword").click(function () {
    
    $( "#chest" ).remove()
            
    $('#right').append('<img src=' + chest[0].image  +' />')        
    
    console.log('sword');
    
});


$("#helmet").click(function () {
    
    $( "#chest" ).remove()
            
    $('#right').append('<img src=' + chest[0].image  +' />')  
    
    console.log('helmet');
});

$("#legs").click(function () {
    
    $( "#chest" ).remove()
            
    $('#right').append('<img src=' + chest[0].image  +' />')  
    
    console.log('legs');
});

$("#boots").click(function () {
    
    $( "#chest" ).remove()
            
    $('#right').append('<img src=' + chest[0].image  +' />')  
    
    console.log('boots');
});

$("#armor").click(function () {
    
    $( "#chest" ).remove()
            
    $('#right').append('<img src=' + chest[0].image  +' />')  
    
    console.log('armor');
});