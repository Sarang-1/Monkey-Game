var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,ground;
var gameState,time;
var PLAY=1;
var END=0;
var eat,over;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  eat=loadSound("eat.wav");
  over=loadSound("over.wav");
}



function setup() {
  createCanvas(500,500);

  monkey=createSprite(150,300,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.15;
  
  
  ground=createSprite(250,400,900,10);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  monkey.setCollider("circle",0,0,300);
  
  score=0;
  gameState=PLAY;
 
  time=0;
}


function draw() {
  background("white");
     
  drawSprites();
  
  if(gameState===PLAY){
  ground.velocityX=-4;
  
  if(ground.x===50){
  ground.x=250;
  }  
    
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(keyDown("space")&&monkey.y>=347){
    monkey.velocityY=-14;
  }
    
  bananas();
  obstacles();
    
  time=time+Math.round(getFrameRate()/60);
    
     if(monkey.isTouching(obstacleGroup)){
       gameState=END;
       over.play();
     }
    
    if(monkey.isTouching(FoodGroup)){
      score=score+1;
      FoodGroup.destroyEach();
      eat.play();
    }
    
    
  } else if(gameState===END){
    textSize(20);
    fill("green");
    text("Press R to restart",180,200);
    
    monkey.velocityY=0;
    monkey.visible=false;
    
    ground.velocityX=0;
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    
    if(gameState===END && keyDown("r")){
    gameState=PLAY;
      
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
      
    monkey.visible=true;
          
    score=0;
    time=0;
    }
  }
  
  textSize(20)
  fill("crimson")
  text("Bananas: "+score,250,70);
  
  monkey.collide(ground);

}

function bananas(){
  if(frameCount%80===0){
    banana=createSprite(300,300,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6-time/80;
    banana.x=600;
    banana.y=Math.round(random(165,250));
    banana.lifetime=140;
    
    FoodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%150===0){
    obstacle=createSprite(600,375,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5-time/80;
    obstacle.lifetime=140;
    obstacleGroup.add(obstacle);
    
  }
}



