var body = '/img/sprites/lpc/body/male/dark.png';
var head = '/img/sprites/lpc/head/hoods/male/cloth_hood_male.png'
var torso = '/img/sprites/lpc/torso/plate/chest_male.png'
var legs = '/img/sprites/lpc/legs/armor/male/metal_pants_male.png'
var sprite = {
    body: '/img/sprites/lpc/body/male/dark.png'
}
// 
// get link
$('.add-button').on('click', function(){
    var path = $(this).attr('data-link');
    var part = $(this).attr('data-part');
    var ctx = document.getElementById('canvas').getContext('2d');
    // append link to obj
    sprite[part] = path;
    console.log(sprite)
    var order = ['body','leg','torso','head'];

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

