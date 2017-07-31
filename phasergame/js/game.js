var game = new Phaser.Game(640, 360, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
//game.state.add('lose', losewState);


game.state.start('boot');