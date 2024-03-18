define(['app', 'page/football2/base/element'],

// Map dependencies from above array.
function(app, Element) {

   
    var Brid = {};

    // Default View.
    Brid.View = Element.View.extend({
		rec:{x:0,y:150,width:35,height:53},
		translt:{x:80,y:220,angle:0},
		moveDis:10,
		id:'0',
		def:null,
		speed:0,
		g:0,
		
		time:null,
		
		ranage:{width:35,height:38},
		init:function(value){
			
			this.translt={x:80,y:220,angle:0}
			this.changeStyle(value.id,value.img)
			//this.cacheTexture(value.img)
			//console.log(this.pos)
		},
		changeStyle:function(value,img){
			//this.rec={x:0,y:150,width:35,height:53}
			switch(value){
				case "0":
					this.rec={x:0,y:150,width:35,height:53}
					this.ranage={width:35,height:38}
				break
				case "1":
					this.rec={x:50,y:150,width:35,height:53}
					this.ranage={width:35,height:33}
				break
				case "2":
					this.rec={x:100,y:150,width:35,height:53}
					this.ranage={width:35,height:30}
				break
			}
			this.id=value
			this.cacheTexture(img)
		},
		changePos:function(objectValue){
			for(var i in objectValue){
				this.translt[i]=objectValue[i]
			}
		}
    });

    // Return the module for AMD compliance.
    return Brid;

});
