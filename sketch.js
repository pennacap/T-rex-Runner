var trex1, trex2, trex3, trex_collided, ground, gameOver, restart, cloud, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, trex, groundSpr, invisibleGround, cloudGroup, cloudSpr, gameState, obstacleGroup, obstacleSpr, rand, gameOverSpr, restartSpr, score, die, jump, checkpoint;
function preload() {
  trex1 = loadImage("trex1.png");
  trex2 = loadImage("trex3.png");
  trex3 = loadImage("trex4.png");
  trex_collided = loadImage("trex_collided.png");
  ground = loadImage("ground2.png");
  cloud = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkPoint.mp3")
}
function setup() {
  createCanvas(400, 200);
  trex = createSprite(40, 160);
  trex.addAnimation("trex", trex1, trex2, trex3);
  trex.scale = 0.5
  groundSpr = createSprite(400, 180);
  groundSpr.addAnimation("ground", ground)
  groundSpr.setVelocity(-3, 0);
  invisibleGround = createSprite(400, 180, 800, 1);
  invisibleGround.visible = false;
  cloudGroup = createGroup()
  gameState = 0
  obstacleGroup = createGroup();
  gameOverSpr = createSprite(200, 100)
  gameOverSpr.addAnimation("gameOver", gameOver);
  gameOverSpr.scale = 0.5;
  gameOverSpr.visible = false;
  restartSpr = createSprite(200, 150)
  restartSpr.addAnimation("restart", restart);
  restartSpr.scale = 0.5;
  restartSpr.visible = false;
  score = 0;
  trex.depth = 0; 
  }  

function draw() {
  background(255);
  trex.collide(invisibleGround);
  if (gameState == 0) {
  if (groundSpr.x <= 0) {
    groundSpr.x = ground.width/2
  }
  
  obstacleGroup.setVelocityEach (groundSpr.velocityX, 0);
  cloudGroup.setVelocityEach (2/3 * groundSpr.velocityX, 0);
  if (frameCount % 4 == 0) score++
  if (score % 100 == 0 && score !=0){ groundSpr.velocityX=0.2; }
  if (keyWentDown("space") && trex.y >= 156) {
    trex.setVelocity(0, -10)
  }
  trex.velocityY+=0.4;
  spawnClouds();
  spawnObstacles();
  if (obstacleGroup.isTouching(trex)) gameState = 1;;
  }
  if (gameState == 1) {
    cloudGroup.setVelocityEach(0, 0)
    groundSpr.velocityX = 0;
    obstacleGroup.setVelocityEach(0, 0);
    cloudGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    gameOverSpr.visible = true;
    restartSpr.visible = true;
    if (mousePressedOver(restartSpr)) reset();
  }
  
  drawSprites();
  text("Score:" + score, 320, 20)
}
function spawnClouds() {
  if (frameCount % 80 == 0) {
    cloudSpr = createSprite(400, random(20, 100), 1, 1);
    cloudSpr.addAnimation("cloud", cloud)
    cloudSpr.velocityX = 2/3 * groundSpr.velocityX;
    cloudSpr.scale = 0.5;
    cloudSpr.lifetime = 200
    cloudGroup.add(cloudSpr);
    trex.depth = cloud.depth+1;
  }
}
function spawnObstacles(){
   if (frameCount % 60 == 0) {
     obstacleSpr = createSprite(400, 160);
     rand = Math.round(random(1, 6))

     obstacleSpr.velocityX = groundSpr.velocityX;
     obstacleSpr.lifetime = 400/3;
     
     switch (rand) {
       case 1: 
         obstacleSpr.addImage("obstacle", obstacle1); 
         break;
       case 2: 
         obstacleSpr.addImage("obstacle", obstacle2); 
         break;
       case 3: 
         obstacleSpr.addImage("obstacle", obstacle3); 
         break;
       case 4: 
         obstacleSpr.addImage("obstacle", obstacle4); 
         break;
       case 5: 
         obstacleSpr.addImage("obstacle", obstacle5); 
         break;
       case 6: 
         obstacleSpr.addImage("obstacle", obstacle6); 
         break;
        default:
         console.log("No");
         break;
         
     } 
     obstacleSpr.scale = 0.5;  
     obstacleGroup.add(obstacleSpr);
   } 
}
function reset() {
  gameState = 0;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  groundSpr.velocityX = -3;
  score = 0;
  gameOverSpr.visible = false;
  restartSpr.visible = false;
}