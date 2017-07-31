var loadState = {

    preload: function() {
        //Start screen button
      //  game.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 10, 10);
        game.load.image('sky', 'assets/sky.png');
        game.load.image('background', 'assets/sky.png');
        game.load.image('gameBG', 'assets/sky.png');

        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
        game.load.image('button', 'assets/button.png');

        game.load.image('playButton', 'assets/playButton.png');
        game.load.image('replayButton', 'assets/replayButton.png');
        game.load.image('firstaid', 'assets/firstaid.png');
        game.load.image('slowdown', 'assets/slowdown.png');


        game.load.image('menuButton', 'assets/menuButton.png');

        game.load.image('boost', 'assets/boost.png');
        game.load.image('diamond', 'assets/diamond.png');
        game.load.audio('song', 'assets/Defense-Line.mp3')


    },
   
// Start the state to actually start the game
	create: function(){
		
		game.state.start('menu');
	}


};