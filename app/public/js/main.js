var LoM = LoM || {};
var width = $('#game').width();
var height = $('#game').height();
console.log(width,height)
LoM.game = new Phaser.Game(1280, 1280, Phaser.AUTO, document.getElementById('game'));
LoM.game.state.add('Boot', LoM.Boot);
LoM.game.state.add('Preload', LoM.Preload);
LoM.game.state.add('Game', LoM.Game);
LoM.game.state.add('Battle', LoM.Battle);
LoM.game.state.add('Shop', LoM.Shop);
LoM.game.state.add('Castle', LoM.Castle);
LoM.game.state.start('Boot');
console.log('starting game')


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    var errorJS = url.split('/')
    if(errorJS[errorJS.length-1] === 'Game.js' || errorJS[errorJS.length-1] === 'player.js'){
        // LoM.game.state.start('Boot');
        // location.reload()
    }
}
