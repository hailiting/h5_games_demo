var aneObj =function(){
    // start, control, end
    this.rootx = [];   //this.rooty = canHeight
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.alpha = 0;
}

aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
    for(var i=0; i<this.num; i++){
        this.rootx[i] = i * 16 +Math.random()*20;
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 250 + Math.random()* 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
    //console.log("123");
}
aneObj.prototype.draw = function(){
    
    this.alpha += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.lineWidth = 20;

    ctx2.strokeStyle = "#3b154e";
    ctx2.globalAlpha = 0.6;
    for(var i=0; i<this.num; i++){
        
        ctx2.beginPath();
        ctx2.lineCap="round";
        ctx2.moveTo(this.rootx[i], canHeight);
        //ctx2.lineTo(this.x[i], canHeight-this.len[i]);
        
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], canHeight-100, this.headx[i], this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();    
    //console.log("aneDraw");
}