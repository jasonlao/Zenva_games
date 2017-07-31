var music;
var menuState = {

    
    create: function() {
        game.stage.backgroundColor = '#182d3b';
        background = game.add.tileSprite(0, 0, 640, 360, 'background');
        bestText = game.add.text(16, 16, 'Best Time: ' + bestTime + ' Seconds', { font: '30px Arial', fill: '#000' });


        button = game.add.button(300, 150, 'playButton', start, this, 0, 0, 0);


    //game.load.onLoadComplete.add(update, this);

    function start(){
    	game.state.start('play');
    }
     
    } 
   

// // Start the state to actually start the game
// 	create: function(){
//     	game.state.start('play');
//     }

};