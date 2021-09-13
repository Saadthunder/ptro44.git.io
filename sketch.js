/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;
var kangaroo;
var inv_g;
var shrub;
var finish;
function preload(){
  kangaroo_running =   loadAnimation("assets/mario1.png","assets/mario2.png","assets/mario3.png");
  kangaroo_collided = loadAnimation("assets/mariocollided.png");


  
  jungleImage = loadImage("assets/bg1.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/coin1.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/obstacle1.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 500);

  jungle = createSprite(100,100,800,1000);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=.8;
  
  kangaroo=createSprite(200,400,80,80);
  kangaroo.addAnimation("running", kangaroo_running);
  kangaroo.addAnimation("collided", kangaroo_collided);
  kangaroo.scale=.29;

  inv_g=createSprite(400,420,1005,15);
  inv_g.visible=false;

  finish=createSprite(400,100,400,20);
  finish.addImage(gameOverImg);
  finish.visible=false;

  restart=createSprite(400,300,20,20);
  restart.addImage(restartImg);
  restart.visible=false;
  restart.scale=.1;
  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  

  kangaroo.setCollider("circle",0,0,180);
  
 
  kangaroo.x=camera.position.x-270;
  spawnShrubs();
  spawnObstacles();
  
  if (gameState===PLAY){

    jungle.velocityX=-7

    if(jungle.x<50)
    {
       jungle.x=200;
    }
   console.log(kangaroo.y)
    if(keyDown("space")&& kangaroo.y>270) {
      jumpSound.play();
      kangaroo.velocityY = -16;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8
    spawnShrubs();
    spawnObstacles();

    kangaroo.collide(inv_g);
    
    if(obstaclesGroup.isTouching(kangaroo)){
      collidedSound.play();
      gameState = END;
    }
    if(shrubsGroup.isTouching(kangaroo)){
      score=score+1;
      shrubsGroup.destroyEach();
    }
     
  }
  else if (gameState === END) {
    //set velcity of each game object to 0
    kangaroo.velocityY = 0;
    jungle.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);
    
    
    
    //change the trex animation
    kangaroo.changeAnimation("collided",kangaroo_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    finish.visible=true;
    restart.visible=true;
    
  }
  
   
      if(mousePressedOver(restart)) {
        reset();
        restart.visible=false;
        finish.visible=false;
      }
      drawSprites();
    textSize(20);
    text("Score:"+score, 700,50);
    if(score>=5 ){
      textSize(40);
      stroke(1000);
      fill("black");
      text("CONGRATS!!!!!YOU WIN",200,200);
      kangaroo.velocityY = 0;
      jungle.velocityX = 0;
      obstaclesGroup.setVelocityXEach(0);
      shrubsGroup.setVelocityXEach(0);
      kangaroo.changeAnimation("collided", kangaroo_collided);
      restart.visible=true;
  
      }
  
  
}
function reset(){
  gameState=PLAY;
  score=0;
  shrubsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  kangaroo.changeAnimation("running", kangaroo_running)

}


function spawnShrubs(){
if (frameCount % 150===0){
shrub=createSprite(camera.position.x+500,405,20,20);
shrub.addImage(shrub2);
shrub.scale=.09;
shrub.velocityX=-7;
shrubsGroup.add(shrub);
shrub.lifetime=200;
}

}

function spawnObstacles(){
  if (frameCount % 86===0){
  obstacle=createSprite(camera.position.x+700,405,20,20);
  obstacle.addImage(obstacle1);
  obstacle.scale=.31;
  obstacle.velocityX=-7;
 // obstacle.debug=true;
  obstacle.setCollider("circle",0,0,125);
  obstaclesGroup.add(obstacle);
  obstacle.lifetime=200;
  }
  
  }












