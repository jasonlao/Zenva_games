var menuState = {

    preload: function() {
        //Start screen button
       // game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);

    }
    create: function() {
        game.stage.backgroundColor = '#182d3b';
        background = game.add.tileSprite(0, 0, 640, 360, 'background');

        button = game.add.button(300, 150, 'playButton', startGame, this, 0, 0, 0);
    //game.load.onLoadComplete.add(update, this);
     
    }
    startGame: function(){

// Start the state to actually start the game
        game.state.start('main');

}

}

function startGame(){

// Start the state to actually start the game
game.state.start('main');

}