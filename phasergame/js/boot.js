var bootState = {

  
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
        music = game.add.audio('song');
        music.play();
     
    }
   

};

