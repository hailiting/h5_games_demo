define(['app'],

// Map dependencies from above array.
function(app) {


    var BasePage = {};

    // Default View.
    BasePage.View = Backbone.View.extend({
        canvas:null,
		ctx:null,
		cacheCanvas:null,
		cacheCtx:null,
		initialize : function(value) {
			this.canvas=value.el
			this.ctx = this.canvas.getContext('2d');
			this.cacheCanvas=document.createElement("canvas");
			this.cacheCanvas.width=this.canvas.width
			this.cacheCanvas.height=this.canvas.height
			this.cacheCtx=this.cacheCanvas.getContext('2d');		
        },
		clearCanvas:function(){
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
			this.cacheCtx.clearRect(0,0,this.cacheCanvas.width,this.cacheCanvas.height)
		},
		addChild:function(src,rec,posObject){
			//console.log(posObject)
			if(posObject.angle==0){
				//this.ctx.save();
				//console.log(posObject.angle,'aaaaaa')
				if(posObject.scale){
					this.cacheCtx.scale(posObject.scale,posObject.scale)
				}
				this.cacheCtx.drawImage(src,posObject.x,posObject.y)
				
				//this.ctx.drawImage(src,rec.x,rec.y,rec.width,rec.height,posObject.x,posObject.y,rec.width,rec.height)
				//this.ctx.restore()
			}else{
				//console.log('dskalkdl')
				this.rotate(src,rec,posObject,posObject.angle)
			}
			//console.log('aaaa')
		},
		//private
		rotate:function(image,rec,posObject,degrees){
			if(degrees){
			var can=document.createElement("canvas");
			can.width=rec.width>rec.height?rec.width:rec.height
			can.height=rec.width>rec.height?rec.width:rec.height
			//console.log(can.width,can.height)
			var temp=can.getContext('2d');			
			temp.clearRect(0,0,can.width,can.height)
			temp.save();
			temp.translate(can.width/2,can.height/2);
			temp.rotate(degrees*Math.PI/180);
			temp.drawImage(image,-rec.width/2,-rec.height/2,rec.width,rec.height);
			temp.restore();
			//var img=new Image()
			//img.src=can.toDataURL("image/png")
			this.cacheCtx.drawImage(can,posObject.x,posObject.y)			
			//this.ctx.drawImage(img,posObject.x,posObject.y)
			}
		},
		render:function(){
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
			//var img=new Image()
			//img.src=this.cacheCanvas.toDataURL("image/png")
			this.ctx.drawImage(this.cacheCanvas,0,0)
			this.cacheCtx.clearRect(0,0,this.cacheCanvas.width,this.cacheCanvas.height)
		}
    });

    // Return the module for AMD compliance.
    return BasePage;

});
