var ironMan ,ironMan_running ;
var ground ,invisibleGround,groundIMage;
var godzilla,godzillaImage;
var stone,stoneImage;
var PLAY=1
var END=0
var gameState=play    
var stoneGroup;
var edges;
var gameOver,gmaeOverImage;

function preload(){
    ironMan_running=loadImage("Images/Ironman-1.png");
    groundImage=loadImage("Images/horrer road.jpg");
    godzillaImage=loadImage("Images/Godzilla.png");
    stoneImage=loadImage("Images/Stone.png");
    gmaeOverImage=loadImage("Images/game over.png");
}

function setup(){
    createCanvas(1200,700);

    //create a iron man sprite
    ironMan=createSprite(width/2,height-100)
    ironMan.addImage("running",ironMan_running);

    godzilla=createSprite(width/2,height)
    godzilla.addImage(godzillaImage);
    godzilla.scale=0.4;

    gmaeOver=createSprite(200,200);
    gmaeOver.addImage(gmaeOverImage);
    

    stoneGroup=new Group();

    edges=createEdgeSprites();
    
}

function draw(){
    background(groundImage);
    if(gameState===PLAY){
        spawnObstacles();

        if(keyDown("left")){
            ironMan.x-=5
        }

        if(keyDown("right")){
            ironMan.x+=5
        }

        if(keyDown("space")){
            ironMan.velocityY=-10
        }

        ironMan.velocityY=ironMan.velocityY+0.8
        godzilla.y=ironMan.y+250;

        if(ironMan.isTouching(stoneGroup)){

            gameState=END
            
        }
    }
    else if(gameState===END){
            gameOver.visible=false  
            godzilla.y=ironMan.y
            godzilla.depth=ironMan.depth+1
            stoneGroup.destroyEach();
            ironMan.velocityY=0
            ironMan.velocityX=0
    }

ironMan.collide(edges)




drawSprites();
}

function spawnObstacles(){
    if(frameCount%240===0){
        stone=createSprite(width/2,0)
        stone.addImage(stoneImage)
        stone.scale=0.3
        stone.x=Math.round(random(400,800))
        stone.velocityY=2
        stone.lifetime=700
        ironMan.depth=stone.depth+1

        stoneGroup.add(stone)
    }
}