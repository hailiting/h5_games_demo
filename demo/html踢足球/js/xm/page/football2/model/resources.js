define(['app'],

// Map dependencies from above array.
function(app) {


    var BasePage = {};

    // Default View.
    BasePage.View = Backbone.View.extend({
		deferred:null,
	
		initialize : function(value) {
			this.deferred=$.Deferred()
			app.res=[]
			this.addRes(value.srcs)
			
        },
		addRes:function(value){
			
			var con=this
			for(var i=0;i<value.length;i++){
				var imageObj = new Image();
				imageObj.id=value[i].id
			//	console.log(value[i].src)
				imageObj.onload = function() {
				
					app.res.push({'img':this,'id':this.id})
					if(app.res.length==value.length){
						con.deferred.resolve();
						
					}
				};
				imageObj.src = value[i].src;
			}
		}
    });

    // Return the module for AMD compliance.
    return BasePage;

});
