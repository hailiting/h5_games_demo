var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var canWidth;
var canHeight;

var bg_image = new Image();
bg_image.src = "./src/background.jpg";

var pause_image = new Image();
pause_image.src = "./src/pause.png";

var cover_image = new Image();
cover_image.src = "./src/cover.png";

var playIcon = new Image();
playIcon.src = "./src/play.png";

var orange = new Image();
var blue = new Image();
orange.src = './src/fruit.png';
blue.src = './src/blue.png';

var ane;
var fruit;
var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];
var bigTail = [];
var bigEye = [];
var bigBodyOra = [];
var bigBodyBlue = [];

var bigEat = [];
var bigEatBlue = [];

var dustPic = [];

var data;
var wave;
var halo;

var dust;

var play = false;
var pause = false;

function game() {
    var intId = setInterval(function(){
        if(play){
            window.clearInterval(intId);
            init();
            lastTime = Date.now();
            deltaTime = 0; 
            can1.removeEventListener('click', startPlay, false);
            can1.addEventListener('click', gamePause, false);
            if(pause){
                console.log("game.paused");
            }else{
                gameloop();
            }
            
        }else{
            console.log("game preparing");
            cover();
        }
    }, 100);    
    
}

function init() {
    
    //獲取畫布
    can1 = document.getElementById("canvas1");    //layer1, fish, halo, wave, dust
    ctx1 = can1.getContext("2d");            //can1.context();
    can2 = document.getElementById("canvas2");    //layer0, background, ane, fruits
    ctx2 = can2.getContext("2d");    
    
    can1.addEventListener('mousemove', onMouseMove, false);
    //can2.addEventListener('mousemove', onMouseMove, false);
    
    ctx1.fillStyle = "white";
    ctx1.font = "30px Verdana";
    
    //bg_image.src = "./src/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;
    //drawBackground();
    
    ane = new aneObj();    
    ane.init();    
    
    fruit = new fruitObj();
    fruit.init();
    //fruit.draw();
    
    mom = new momObj();
    mom.init();
    
    baby = new babyObj();
    baby.init();
    
    mx = canWidth*0.5;
    my = canHeight*0.5;
    
    data = new dataObj();
    
    for(var i=0; i<8; i++){
        //console.log("./src/babyTail" + i + ".png");
        babyTail[i] = new Image();        
        babyTail[i].src = "./src/babyTail" + i + ".png";
        bigTail[i] = new Image();        
        bigTail[i].src = "./src/bigTail" + i + ".png";
        bigBodyOra[i] = new Image();
        bigBodyOra[i].src = "./src/bigSwim" + i + ".png";
        bigBodyBlue[i] = new Image();
        bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
        bigEat[i] = new Image();
        bigEat[i].src = "./src/bigEat" + i + ".png";
        bigEatBlue[i] = new Image();
        bigEatBlue[i].src = "./src/bigEatBlue" + i + ".png";
        
    }
    
    for(i=0; i<2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = "./src/babyEye" + i + ".png";
        bigEye[i] = new Image();
        bigEye[i].src = "./src/bigEye" + i + ".png";
        
    }/**/
    
    for(var i=0; i<20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./src/babyFade" + i + ".png";
    }
    //console.log(babyBody[19].src);
    
    wave = new waveObj();
    wave.init();
    
    halo = new halo();
    halo.init();
    
    for(var i=0; i<7; i++){
        dustPic[i] = new Image();
        dustPic[i].src = "./src/dust" + i + ".png";
    }
    
    
    dust = new dustObj();
    dust.init();
    
}

function gameloop() {
    window.requestAnimFrame(gameloop);
    //console.log("looplooploop");
    var now = Date.now();
    deltaTime = now - lastTime;
    if(deltaTime>40) deltaTime = 40;
    lastTime = now;
    //console.log(deltaTime);
    drawBackground();
    ane.draw();
    
    fruitMonitor();
    fruit.draw();
    
    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    baby.draw();
    
    momFruitsCollision();
    momBabyCollision();
    //console.log(fruit.alive);
    
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

document.body.onload = game;
 
function onMouseMove(e){
    if(!data.gameOver){
        if(e.offSetX || e.layerX){
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            //console.log(mx);
        }    
    }
}

function gamePause(e){
    if(e.offSetX || e.layerX){
        var mx = e.offSetX == undefined ? e.layerX : e.offSetX;
        var my = e.offSetY == undefined ? e.layerY : e.offSetY;        
    }
    if(mx>(canWidth-pause_image.width*0.4-10) && mx<(canWidth-10) && my>(10) && my<(pause_image.height*0.4+10)){
        console.log(mx);
        console.log(my);
        pause = true;
        console.log("game paused");
    }
}