define(['app'],

// Map dependencies from above array.
function(app) {


    var BaseElement = {};

    // Default View.
    BaseElement.View = Backbone.View.extend({
        rec:{x:0,y:0,width:0,height:0},
		translt:{'x':0,'y':0,'angle':0},
		id:0,
		cacheCanvas:null,
		cacheCtx:null,
		initialize : function(value) {
			this.init(value)
			//this.cacheTexture(value.img)
        },
		cacheTexture:function(value){
			if(!this.cacheCanvas){
				this.cacheCanvas=document.createElement("canvas");
				this.cacheCtx=this.cacheCanvas.getContext('2d');		
			}else{				
				this.cacheCtx.clearRect(0,0,this.rec.width,this.rec.height)
			}
			this.cacheCanvas.width=this.rec.width
			this.cacheCanvas.height=this.rec.height
			this.cacheCtx.drawImage(value,this.rec.x,this.rec.y,this.rec.width,this.rec.height,0,0,this.rec.width,this.rec.height)			
		},
		init:function(value){
		}
    });

    // Return the module for AMD compliance.
    return BaseElement;

});
