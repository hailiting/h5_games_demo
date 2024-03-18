var backgroundObj=function(){
	this.x=[];
	this.y=[];
	this.w=[];
	this.h=[];
	this.isLive=[];
}
backgroundObj.prototype.num=3;
backgroundObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		if(i==0){
			this.x[i]=canWidth*0.1*Math.random();
		}else{
			this.x[i]=this.x[i-1]+this.w[i-1]+canWidth*0.2*i*Math.random();
		}
		this.w[i]=canWidth*0.08+canHeight*Math.random()*0.3;
		this.h[i]=canHeight*0.08+canWidth*Math.random()*0.3;	
		this.y[i]=canHeight*0.2*Math.random();
		this.isLive[i]=true;
	}
}
backgroundObj.prototype.cloudBorn=function(){
	for(var i=0;i<this.num;i++){
		if(!this.isLive[i]){
			this.w[i]=canWidth*0.08+canWidth*Math.random()*0.3;
			this.h[i]=canHeight*0.08+canHeight*Math.random()*0.3;
			this.y[i]=canHeight*0.2*Math.random();
			if(i==0){
				this.x[i]=canWidth;
			}else{
				this.x[i]=canWidth+i*this.w[i-1];
			}
			this.isLive[i]=true;
		}
	}
}
backgroundObj.prototype.draw=function(){
	ctx1.clearRect(0,0,canWidth,canHeight);
	ctx1.save();
	for(var i=0;i<this.num;i++){
		if(this.isLive[i]){
			this.x[i]-=0.1*totalSpeed;		
			ctx1.fillStyle="#ffffff";
			ctx1.beginPath();
			ctx1.arc(this.x[i]+this.w[i]*0.4,this.y[i]+this.h[i]*0.1,Math.max(this.h[i],this.w[i])*0.15,0,Math.PI*2,true);
			ctx1.fill();
			ctx1.arc(this.x[i]+this.w[i]*0.1,this.y[i]+this.h[i]*0.2,Math.max(this.h[i],this.w[i])*0.15,0,Math.PI*2,true);
			ctx1.fill();
			ctx1.arc(this.x[i]+this.w[i]*0.6,this.y[i]+this.h[i]*0.25,Math.max(this.h[i],this.w[i])*0.15,0,Math.PI*2,true);
			ctx1.fill();
			ctx1.arc(this.x[i]+this.w[i]*0.5,this.y[i]+this.h[i]*0.3,Math.max(this.h[i],this.w[i])*0.15,0,Math.PI*2,true);
			ctx1.fill();
			ctx1.arc(this.x[i]+this.w[i]*0.65,this.y[i]+this.h[i]*0.22,Math.max(this.h[i],this.w[i])*0.15,0,Math.PI*2,true);
			ctx1.fill();
			ctx1.arc(this.x[i]+this.w[i]*0.2,this.y[i]+this.h[i]*0.35,Math.max(this.h[i],this.w[i])*0.15,0,Math.PI*2,true);
			ctx1.fill();
			ctx1.arc(this.x[i]+this.w[i]*0.35,this.y[i]+this.h[i]*0.35,Math.max(this.h[i],this.w[i])*0.1,0,Math.PI*2,true);
			ctx1.fill();
			ctx1.arc(this.x[i]+this.w[i]*0.3,this.y[i]+this.h[i]*0.1,Math.max(this.h[i],this.w[i])*0.15,0,Math.PI*2,true);
			ctx1.closePath();
			ctx1.fill();
		}	
		if(this.x[i]+this.w[i]<0){
			this.isLive[i]=false;
		}
	}
	ctx1.restore();
	this.cloudBorn();
}
