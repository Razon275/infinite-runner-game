var PLAY=1;
var END=0;
var GameState=PLAY;
var road,car,nitroImage,carImage,police,policeImage,roadImage;
var nitro;
var invisibleGround1,invisibleGround2;
var carcrash,racingcar,boost,gameoverImage,gameover;

function preload(){
 carImage=loadImage("cars.jpg");
 policeImage=loadImage("police.jpg");
 nitroImage=loadImage("nitro.jpg");
 roadImage=loadImage("betterroad.jpg");
 gameoverImage=loadImage("Game over.png")
}

function setup() {
 createCanvas(600,400);
  background(200);
  car=createSprite(100,250,10,10);
  car.addImage(carImage)
  car.scale=0.3;
  
  road=createSprite(400,250);
  road.addImage(roadImage);
  road.scale=1.5
  road.width=road.width/2;
  road.depth=car.depth;
  car.depth=car.depth+1;
  
  gameover=createSprite(300,200,100,100);
  gameover.addImage(gameoverImage);
  gameover.scale=0.2;
  gameover.visible=false;
  
  nitroGroup=createGroup();
  policeGroup=createGroup();
  score=0;
}

function draw() {
  background(255,255,255)
  textSize(20)
  
  if (GameState===PLAY){
    
    score = score + Math.round(frameCount/60);
    road.velocityX=-14;
  if (road.x < 200){
      road.x = road.width/1;
    }
  if (keyDown("up")){
    car.y=car.y-10;
  }
  
  if (keyDown("down")){
    car.y=car.y+10;
  }
  nitrous();
  police();
  gameover.visible=false;
if(car.isTouching(nitroGroup)){
       nitroGroup.destroyEach();
      score=score+500;
     
    }
    
  }
  
  
  
  
  else if(GameState===END){
    if(mousePressedOver(gameover)){
         reset();
        Gamestate=PLAY;
       }
    road.velocityX=0;
    nitroGroup.setLifetimeEach(-1);
    policeGroup.setLifetimeEach(-1);
    nitroGroup.setVelocityXEach(0);
    policeGroup.setVelocityXEach(0);
    gameover.visible=true;
    

  }
  if (policeGroup.isTouching(car)){
    GameState=END;
    
    }
  
 drawSprites();
  text("Score:"+score,500,50);
}

function nitrous(){
  if (frameCount%200===0){
    var nitro=createSprite(600,200,20,20);
    nitro.y=Math.round(random(100,400));
    nitro.addImage(nitroImage);
    nitro.velocityX=-12;
    nitro.lifetime=100;
   
    nitro.scale=0.3;
    nitroGroup.add(nitro);
    
  }
 
  
  
}

function police(){
  if (frameCount%100===0){
    var police=createSprite(600,200,10,10);
    police.y=Math.round(random(100,400));
    police.addImage(policeImage);
    police.velocityX=-15;
    police.lifetime=150;
    police.scale=0.5;
    policeGroup.add(police)
    
  }

}
function reset(){
  
GameState=PLAY;
score=0;
nitroGroup.destroyEach();
policeGroup.destroyEach();
car.y=250;
}




