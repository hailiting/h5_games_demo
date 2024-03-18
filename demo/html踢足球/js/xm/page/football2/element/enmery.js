define(['app', 'page/football2/base/element'],

// Map dependencies from above array.
function(app, Element) {

   
    var Pipes = {};

    // Default View.
    Pipes.View = Element.View.extend({
		rec:{x:0,y:50,width:35,height:60},
		translt:{},
		id:0,
		speedX:0,
		ranage:{width:30,height:38},
		init:function(value){
			
			this.translt={'x':320,'y':0,'angle':0}
			this.changeStyle(value.id,value.img)
		},
		changeStyle:function(value,img){
			this.rec={x:0,y:50,width:35,height:60}
			/*switch(value){
				case "0":
					this.rec={x:0,y:50,width:35,height:60}
				break
				case "1":
					this.rec={x:50,y:50,width:35,height:60}
				break
				case "2":
					this.rec={x:100,y:50,width:35,height:60}
				break
				case "3":
					this.rec={x:150,y:50,width:35,height:60}
				break
				case "4":
					this.rec={x:200,y:50,width:35,height:60}
				break
			}*/
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
    return Pipes;

});
