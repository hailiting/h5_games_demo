function momFruitsCollision(){
    //var lastType = "";
    if(!data.gameOver){
        for(var i=0; i<fruit.num; i++){
            if(fruit.alive[i]){
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if(l < 900){
                    
                    data.fruitNum++; 
                    mom.bigBodyCount++;
                    
                    if(mom.bigBodyCount > 7){
                        mom.bigBodyCount = 7;
                    }  

                    if(fruit.fruitType[i] == "blue"){
                        data.double = 2;
                    }
                    //console.log(wave);
                    wave.born(fruit.x[i], fruit.y[i]);
                    fruit.dead(i);
                }
                //lastType = fruit.fruitType[i];

            }
        }
    }    
}

//feed
function momBabyCollision(){
    if(!data.gameOver){
        if(data.fruitNum > 0){        
            var l = calLength2(mom.x, mom.y, baby.x, baby.y);
            if(l < 900){
                //console.log(data.fruitNum);
                baby.babyBodyCount = 0;
                //data -> 0
                //data.reset();
                mom.bigBodyCount = 0;
                data.addScore();
                data.reset();
                
                halo.born(baby.x, baby.y);
            }
        }
    }
    
    
}