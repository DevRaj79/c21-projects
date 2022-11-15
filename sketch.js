var invG, ground, ground2, groundImg, groundG, sun, sunImg;
var player, playerImg, playerImg2;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var gameState = "play";
var zombie,zombieAnm;
var score = 0,scorebg,scorebgImg;
var booster,boosterG,boosterImg;
var jumpSound,deathSound;
var restart, restartImg, Gameover, Gameoverimg  ;
function preload() {
    groundImg = loadImage("ground.jpg");
    playerImg = loadAnimation("player1.png", "player2.png", "player3.png", "player4.png", "player5.png", "player6.png");
    playerImg2 = loadImage("player7.png");
    sunImg = loadImage("Sun.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    restartImg = loadImage("restart.png");
    Gameoverimg = loadImage("gameover.png");
    scorebgImg = loadImage("score.png");
    deathSound = loadSound("death.mp3");
    jumpSound = loadSound("jump.mp3");
    boosterImg = loadImage("booster.png");
    zombieAnm = loadAnimation("z1.png","z2.png","z3.png","z4.png","z5.png","z6.png")
}

function setup() {
    createCanvas(400, 300);
    player = createSprite(250, 100);
    player.addAnimation("running", playerImg);
    player.scale = 0.15;
    zombie = createSprite(400,100);
    zombie.addAnimation("chase",zombieAnm);
    zombie.scale = 0.7;

    zombie.setCollider("circle",-140,125,20);
    // player.debug = true; 
    player.setCollider("circle",0,200,50);
    sun = createSprite(50, 25);
    sun.addImage(sunImg);
    sun.scale = 0.3;
    sun.velocityX = 0.01;

    obstaclesGroup = createGroup();

    scorebg = createSprite(340,50);
    scorebg.addImage(scorebgImg);
    scorebg.scale = 0.7;
     

    invG = createSprite(250, 250, 400, 20)
    ground = createSprite(200, 150);
    ground.velocityX = 6
    ground2 = createSprite(-400 , 150);
    ground2.velocityX = 6
    ground.addImage(groundImg);
    ground2.addImage(groundImg);
    ground.depth = player.depth - 1;
    ground2.depth = player.depth - 1;
    invG.depth = player.depth;
    invG.visible = false;

    boosterG = createGroup();
}

function draw() {

    if (gameState === "play") {
        background(180);  

        
        player.collide(invG);
        zombie.collide(invG);
        if (player.isTouching(invG)) {
        }
        else {
            player.velocityY += 1;
        }
        if (zombie.isTouching(invG)) {
        }
        else {
            zombie.velocityY += 1;
        }
        if (player.y > 150 && keyWentDown("space")) {
            player.velocityY -= 15 ;
            jumpSound.play(); 
        }
       
        if (ground.x > 800) {
            ground.x = -390;
            ground.velocityX = 6;
        }
        if (ground2.x > 800) {
            ground2.x = -390;
            ground2.velocityX = 6;
        }
        if (obstaclesGroup.isTouching(player)) {
            ground.velocityX = 0;
            ground2.velocityX = 0;
            obstaclesGroup.setVelocityXEach(0);
            gameState = "end";
            deathSound.play();
        }
        if (obstaclesGroup.isTouching(zombie)) {
            zombie.velocityY = -15; 
        }
        if (boosterG.isTouching(player)){
            score = score+100;
            boosterG.destroyEach();
        }
        
        if(frameCount%20 == 0){
            score += 1;
        }
        spawnObs();
        spawnBooster();
        if (gameState === "end") {
            background(rgb(255, 253, 227));
            Gameover = createSprite(200,100);
            Gameover.addImage(Gameoverimg);
            Gameover.scale = 0.5;
            restart = createSprite(200, 150);
            restart.addImage(restartImg);
        } 
        
        drawSprites();
        fill("white");
        textSize(20);
        text("Score: " + score, 300, 55 ); 
    }
    
    if (mousePressedOver(restart)&&gameState == "end"){
        gameState = "play";
        obstaclesGroup.destroyEach();
        restart.destroy();
        Gameover.destroy();
        Gameover.destroy();
        ground.velocityX = 6;
        ground2.velocityX = 6;
        score = 0; 
        player.y = 100;
        zombie.y = 100;
    }
    
}
function spawnBooster(){
    if (frameCount% Math.round( random(500,800)) === 0){
        booster = createSprite(-100,150);
        booster.addImage(boosterImg);
        booster.velocityX = 6;
        boosterG.add(booster);
    }
}
function spawnObs() {
    if (frameCount % 100 == 0) {
        var obstacle = createSprite(-100, 240, 60, 20);
        obstacle.depth = player.depth;
        obstacle.velocityX = 6;
        obstacle.lifeTime = 30;

        var rand = Math.round(random(1, 3));
        switch (rand) {
            case 1: obstacle.addImage(obstacle1);
                obstacle.scale = 1;
                break;
            case 2: obstacle.addImage(obstacle2);
                obstacle.scale = 1.5;
                break;
            case 3: obstacle.addImage(obstacle3);
                obstacle.scale = 0.9;
                break;
        }
        obstaclesGroup.add(obstacle);
    }

}