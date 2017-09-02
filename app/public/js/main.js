var LoM = LoM || {};
LoM.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, document.getElementById('game'));
LoM.game.state.add('Boot', LoM.Boot);
LoM.game.state.add('Preload', LoM.Preload);
LoM.game.state.add('Game', LoM.Game);
// LoM.game.state.add('Game', LoM.Game);
LoM.game.state.start('Boot');