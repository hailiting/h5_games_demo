define(['app'],

// Map dependencies from above array.
function(app) {


    var BasePage = {};

    // Default View.
    BasePage.View = Backbone.View.extend({
		objectArr:[],
	
		initialize : function(value) {
			
        },
		addObject:function(value){
			this.objectArr.push(value)
		},
		getObject:function(){
			if(this.objectArr.length>0){
				var tt=this.objectArr[this.objectArr.length-1]
				this.objectArr.splice(this.objectArr.length-1,1)
				return tt
			}
			return null
		}
    });

    // Return the module for AMD compliance.
    return BasePage;

});
