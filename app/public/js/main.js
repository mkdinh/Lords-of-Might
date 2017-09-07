var LoM = LoM || {};
LoM.game = new Phaser.Game(800, 600, Phaser.AUTO, document.getElementById('game'));
LoM.game.state.add('Boot', LoM.Boot);
LoM.game.state.add('Preload', LoM.Preload);
LoM.game.state.add('Game', LoM.Game);
LoM.game.state.add('Battle', LoM.Battle);
// LoM.game.state.add('Game', LoM.Game);
LoM.game.state.start('Boot');
console.log('starting game')


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    var errorJS = url.split('/')
    if(errorJS[errorJS.length-1] === 'Game.js'){
        // LoM.game.state.start('Boot');
        location.reload()
    }
}
