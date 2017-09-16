// Initializing game states
var LoM = LoM || {};
var width = $('#game').width();

console.log(width,height)
LoM.game = new Phaser.Game(width, 500, Phaser.CANVAS, document.getElementById('game'));
LoM.game.state.add('Boot', LoM.Boot);
LoM.game.state.add('Preload', LoM.Preload);
LoM.game.state.add('Town', LoM.Town);
LoM.game.state.add('Battle', LoM.Battle);
LoM.game.state.add('Shop', LoM.Shop);
LoM.game.state.add('Castle', LoM.Castle);
LoM.game.state.start('Boot');
console.log('starting game')

// error handling on game loading error
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    var errorJS = url.split('/')
    if(errorJS[errorJS.length-1] === 'Town.js' || errorJS[errorJS.length-1] === 'player.js'){
        LoM.game.state.start('Boot');
        // location.reload()
    }
}
