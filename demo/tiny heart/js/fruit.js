var fruitObj = function(){
    this.alive = [];
    this.x = [];
    this.y = [];
    this.l = [];
    this.speed = [];
    this.fruitType = [];
    this.orange = orange; 
    this.blue = blue; 
    this.aneNum = [];
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function(){
    for(var i=0; i<this.num; i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.speed[i] = Math.random()*0.017 + 0.003;
        this.fruitType[i] = "";
        //this.born(i);
        this.aneNum[i] = 0;
        //console.log(this.aneNum[i]);
    }
    
}

fruitObj.prototype.draw = function(){
    for(var i=0; i<this.num; i++){
        
        if(this.alive[i]){
            var pic;
            if(this.fruitType[i]=="blue"){
                pic = blue;
            }else{
                pic = orange;
            }
            if(this.l[i]<=20){
                this.x[i] = ane.headx[this.aneNum[i]];
                this.y[i] = ane.heady[this.aneNum[i]];
                this.l[i] += this.speed[i]*deltaTime;
            }else{
                this.y[i] -= this.speed[i] * 5 * deltaTime;
            }        
            //console.log(this.l[i]);
            ctx2.drawImage(pic, this.x[i] - this.l[i]*0.5, this.y[i]-this.l[i]*0.5, this.l[i], this.l[i]);
            if(this.y[i] < -1){
                this.alive[i] = false;
                this.l[i]=0;
            }
        }
        
        //ctx2.drawImage(this.orange, this.x[i] - this.orange.width*0.5, this.y[i]-this.orange.width*0.5);
    }
}

fruitObj.prototype.born = function(i){
    do{
        var tempAneNum = Math.floor(Math.random() * ane.num);
    }    
    while(this.aneNum.indexOf(tempAneNum)!=-1)
        //console.log(tempAneNum);
        //console.log(this.aneNum);
    this.aneNum[i] = tempAneNum;
    //this.aneNum[i] = Math.floor(Math.random() * ane.num); 
    //console.log(this.aneNum[i]);
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.2){
        this.fruitType[i] = "blue";
    }else{
        this.fruitType[i] = "orange";
    }
}

function fruitMonitor(){
    var num = 0;
    for(var i = 0; i < fruit.num; i++){
        if(fruit.alive[i]){
            num++;
        }
    }
    if(num < 15){
        sendFruit();
    }
    //console.log(num);
}

function sendFruit(){
    for(var i = 0; i < fruit.num; i++){
        
        if(!fruit.alive[i]){
            fruit.born(i);
            //console.log(i);
            return;
        }
    }
}

fruitObj.prototype.dead = function(i){
    fruit.alive[i]=false;
    fruit.x[i] = 0;
    fruit.y[i] = 0;
    //console.log("dead");
}

fruitObj.prototype.update = function(){
    var num = 0;
    for(var i=0; i<this.num; i++){
        
    }
}