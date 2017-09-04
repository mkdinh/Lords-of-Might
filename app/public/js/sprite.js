var body = '/img/sprites/lpc/body/male/dark.png';
var head = '/img/sprites/lpc/head/hoods/male/cloth_hood_male.png'
var torso = '/img/sprites/lpc/torso/plate/chest_male.png'
var legs = '/img/sprites/lpc/legs/armor/male/metal_pants_male.png'
var dataObj = {};
console.log(dataObj)

function draw(part,source) {
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    img.onload = function() {
        var imgData = ctx.getImageData(0,0,832,1344);
            dataObj[part] = imgData;
            ctx.drawImage(img,0,128,64,64,0,0,256,256);
    }
    img.src = source   
}


function undo(part) {
    imgData = dataObj[part];
    console.log(imgData)
    var ctx = document.getElementById('canvas').getContext('2d');
    var img = new Image();
    ctx.putImageData(imgData,0,0)  
}


draw('body',body);


$('#add-head').on('click', function(){
    draw('head',head)
})

$('#add-torso').on('click', function(){
    draw('torso',torso)
})

$('#add-legs').on('click', function(){
    draw('legs',legs)
})

$('#undo-head').on('click', function(){
    undo('head')
});


$('#undo-torso').on('click', function(){
    undo('torso')
})


$('#undo-legs').on('click', function(){
    undo('legs')
})

