var player;
var platforms;
var cursors;
var timeEvent = [];
var graphics;
var circle;
var tracker = 0;
var boostItem;
var item;
var shrink;
var shrinkItem;
var background;
var lifeItem;
var extraLife;
var lifeImage;

var superOPSprite = 0;

var numberOfLifes = 1;

var spriteSize = 1;
var player_speed = 200;
var random; 
var stars;
var starArray=[];
var starCounter = 0;
var score = 0;

var counter = 0;
var tempCounter = 0;
var superSpriteCounter = 0;
var scoreText = 0;
var lifeText = 0;
var bestText = 0;
var bestTime = 0;
var gameText;
var randomValue = 0;

var value = 0;

function increase_speed(){
 
    randomValue = Math.floor(Math.random()*starCounter);
    starArray[randomValue].body.velocity.x += Math.random()*100;
    starArray[randomValue].body.velocity.y += Math.random()*100;

}

function addStar(){

    random = Math.floor(Math.random()*4);




    if (random == 0){
        //top
        starArray[starCounter] = stars.create(Math.random()*800, 0, 'star');
        starArray[starCounter].body.velocity.setTo(200, 200);
       // starArray[starCounter].bringToTop();

    }
    else if(random == 1){
        //left
        starArray[starCounter] = stars.create(0, Math.random()*600, 'star'); 
        starArray[starCounter].body.velocity.setTo(200, -200);
       // starArray[starCounter].bringToTop();


    }
    else if(random == 2){
        //bottom
        starArray[starCounter] = stars.create(Math.random()*800, 600, 'star');
        starArray[starCounter].body.velocity.setTo(-200,-200);
    
            
    }            
    else if(random == 3){
        //right
        starArray[starCounter] = stars.create(800, Math.random()*600, 'star'); 
        starArray[starCounter].body.velocity.setTo(-200,-200);
            
    }       
    //  This gets it moving
    //  This makes the game world bounce-able
    starArray[starCounter].body.collideWorldBounds = true;
    
    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors. "1" is 100% energy return
    starArray[starCounter].body.bounce.set(1);
    game.world.bringToTop(stars);
    starArray[starCounter].scale.setTo(0.2, 0.2);



    starCounter++;

}


function updateCounter(){
    counter++;
    scoreText.setText('Time: ' + counter + ' Seconds');
    if (tempCounter == counter && counter > 3){
        graphics.alpha = 20000;
        //platforms.add(graphics);
        tracker = 1;
        superOPSprite = 0;
        player.alpha = 1;

    }
}


function collectStar (player, star) {
 
    numberOfLifes--;
    lifeText.setText(': ' + (numberOfLifes-1));


    if(numberOfLifes < 1){   
    // Removes the star from the screen
        var i;
        // for(i = 0; i < starCounter; i++){
        //     starArray[i].kill();
        // }
        lifeText.setText(': 0');

        player.kill();
        //circle.kill();

        for(i = 0; i < 5; i++){

            game.time.events.remove(timeEvent[i]);

        }
        button0 = game.add.button(300, 150, 'replayButton', restart, this, 2, 1, 0);
        button1 = game.add.button(300, 190, 'menuButton', returnMain , this, 2, 1, 0);

    }
    else{
        superOPSprite = 1;
        superSpriteCounter = counter;
        superSpriteCounter += 2;
        player.alpha = 0.4;
    }    
    //  Add and update the score
   // score += 10;
   // scoreText.text = 'Time: ' + score;
}

function collectBoost(){

    item.kill();
    player_speed = player_speed + 25;
}

function collectLife(){

    extraLife.kill();
    numberOfLifes++;
    lifeText.setText(': ' + (numberOfLifes-1));


}

function collectSmaller(){

    shrink.kill();
    spriteSize -= 0.1;
    player.scale.setTo(spriteSize, spriteSize);


    
}



function restart(){

    if (counter > bestTime){
        bestTime = counter;
        bestText.setText('Best Time: ' + bestTime + ' Seconds');
    }
    player_speed = 200;
    circle = null;
    item = null;
    shrink = null;
    extraLife = null;

    counter = 0;
    starCounter=0;
    spriteSize = 1;
    numberOfLifes = 1;
    superOPSprite = 0;


    game.state.start('play');

}

function returnMain(){
    if (counter > bestTime){
        bestTime = counter;
        bestText.setText('Best Time: ' + bestTime + ' Seconds');
    }
    player_speed = 200;
    circle = null;
    item = null;
    shrink = null;
    extraLife = null;
    counter = 0;
    starCounter=0;
    spriteSize = 1;
    numberOfLifes = 1;
    superOPSprite = 0;

    game.state.start('menu');

}


var playState ={



create: function() {

    //  We're going to be using physics, so enable the Arcade Physics system
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    background = game.add.tileSprite(0, 0, 640, 360, 'gameBG');



    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
/*    var ground = platforms.create(0, game.world.height - 64, 'ground');
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    //top border
    var top_border = platforms.create(0, 0, 'ground');
    top_border.scale.setTo(2, 2);
    //  This stops it from falling away when you jump on it
    top_border.body.immovable = true;
    //var left_border = platforms.create(0, game.world.height - 64, 'ground');
    //var right_border = platforms.create(0, game.world.height - 64, 'ground');

*/

    createSprite();

    //  create a simple sprite of star to fly around and dodge
    //assign it to random variable
    stars = game.add.group();
    stars.enableBody = true;

    graphics = game.add.group();
    graphics.enableBody = true;

 //   graphics.scale.setTo(300,300)
    boostItem = game.add.group();
    boostItem.enableBody = true;

    shrinkItem = game.add.group();
    shrinkItem.enableBody = true;  



    lifeItem = game.add.group();
    lifeItem.enableBody = true;  

    scoreText = game.add.text(16, 16, 'Time: 0', { font: '30px Arial', fill: '#000' });
    lifeImage = game.add.image(570, 12, 'firstaid');
    lifeImage.scale.setTo(0.6, 0.6);
    lifeText  = game.add.text(600, 12, ': 0', { font: '20px Arial', fill: '#000' });



    createEvent();


    //create the game state text for notifying player loss.
    gameText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    gameText.anchor.setTo(0.5, 0.5);
    gameText.visible = false;

    //  We will enable physics for any star that is created in this group

    //  The score

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();


function createCircle(){

    value = Math.floor(Math.random()*4);    

    if (circle != null){
            circle.kill();
            //floorSprite.destroy();
    }
    if( value < 3 ){

        value = 1;
        tracker = 0;
        circle = graphics.create(Math.random()*500, Math.random()*200, 'button');
        circle.scale.setTo(value, value);
        graphics.alpha = 0.1;
       // game.world.sendToBack(graphics);
        tempCounter = counter;
        tempCounter += 2;

    }   

}


function createSprite(){
    bestText = game.add.text(16, 50, 'Best Time: ' + bestTime, { font: '15px Arial', fill: '#000' });

    // The player and its settings
    player = game.add.sprite(300, 150, 'dude');



    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
   // player.body.bounce.y = 0;
   // player.body.gravity.y = 0;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);



}

function createEvent(){
    timeEvent[0] = game.time.events.repeat(Phaser.Timer.SECOND*5, 10000000, addStar, this);

    timeEvent[1] = game.time.events.repeat(Phaser.Timer.SECOND*5, 100000000, increase_speed, this);

    timeEvent[2] = game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    timeEvent[3] = game.time.events.repeat(Phaser.Timer.SECOND*3, 10000000, createCircle, this);


    timeEvent[4] = game.time.events.repeat(Phaser.Timer.SECOND*4, 100, createBoost, this);

/*    this.dropTimer = this.game.time.create(false);
    this.dropTimer.start();

    Grabbable.prototype.dropItem = function() { 
        //this.dropTimer.add(Phaser.Timer.SECOND * this.game.rnd.realInRange(this.coolMin, this.coolMax, this.dropItem, this));

        circle = graphics.create(Math.random()*340, Math.random()*630, 'button');

    }
     // Do something ;}; */

}
 
function createBoost(){


    value = Math.floor(Math.random()*90);

    if ( item != null){
        item.kill();
    }

    if ( shrink != null){
        shrink.kill();
    }

    if (extraLife != null){
        extraLife.kill();
    }


    if (value < 50){
        value = Math.floor(Math.random()*200);

        if (value < 50){
            item = boostItem.create(800, Math.random()*600, 'boost'); 
            item.scale.setTo(0.3, 0.3);

            item.body.velocity.setTo(-100,-100);

                //  This gets it moving
            //  This makes the game world bounce-able
            item.body.collideWorldBounds = true;
            
            //  This sets the image bounce energy for the horizontal 
            //  and vertical vectors. "1" is 100% energy return
            item.body.bounce.set(1);
        }
        else if (spriteSize > 0.2 && value > 50 && value < 100){
            shrink = shrinkItem.create(800, Math.random()*600, 'diamond');
            shrink.scale.setTo(0.3, 0.3);

            shrink.body.velocity.setTo(-100,-100);

                //  This gets it moving
            //  This makes the game world bounce-able
            shrink.body.collideWorldBounds = true;
            
            //  This sets the image bounce energy for the horizontal 
            //  and vertical vectors. "1" is 100% energy return
            shrink.body.bounce.set(1);

        }
        else if (value > 160){
            extraLife = lifeItem.create(800, Math.random()*600, 'firstaid');
            extraLife.scale.setTo(0.7, 0.7);

            extraLife.body.velocity.setTo(-100,-100);

                //  This gets it moving
            //  This makes the game world bounce-able
            extraLife.body.collideWorldBounds = true;
            
            //  This sets the image bounce energy for the horizontal 
            //  and vertical vectors. "1" is 100% energy return
            extraLife.body.bounce.set(1);

        }                  

    }

}


function render() {

    game.debug.text('Elapsed seconds: ' + this.game.time.totalElapsedSeconds(), 32, 32);
} 
},
//===== update=======
update: function() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(stars, stars);



    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    if(superOPSprite == 0){
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        if (tracker == 1){
        game.physics.arcade.overlap(player, graphics, collectStar, null, this);
    }    
    }

    game.physics.arcade.overlap(player, item, collectBoost, null, this);
    game.physics.arcade.overlap(player, shrink, collectSmaller, null, this);
    //game.physics.arcade.overlap(player, slowStars, collectSlowStars, null, this);
    game.physics.arcade.overlap(player, extraLife, collectLife, null, this);


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    let moveSpeed = this.moveSpeed;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -player_speed;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = player_speed;

        player.animations.play('right');
    }
    else{
       // player.body.velocity.x = 0;
    }

    if (cursors.down.isDown){
        //move down
        player.body.velocity.y = player_speed;

    }
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -player_speed;

    }
    else
    {
        //  Stand still
        player.body.velocity.y = 0;

     //   player.animations.stop();

        player.frame = 4;
    }





/*


function restart(){
    //game.kill();
    //game.create();


    //item.kill();

    // starCounter = 0;
    // player_speed = 200;
    // tempCounter = 0;
    // createEvent();
    // starArray = [];
    // bestText.destroy();
    // //createSprite();


    // if (counter > bestTime){
    //     bestTime = counter;
    //     bestText.setText('Best Time: ' + bestTime + ' Seconds');
    // }

    // counter = 0;
    // gameText.visible = false;
    game.state.start('menu');

}   */

}



};
