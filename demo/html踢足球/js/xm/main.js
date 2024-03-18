 require(["app",'base/page'], function(app,BasePage) {
		app.pageObject={};
		var len=$('.templates').length
	
		var nowNum=0
		addJs()
		function addJs(){
			var jq=$($('.templates')[nowNum])
			if(jq.attr('data-module')){
				var el=jq
				var dataBase=el.attr("data-base")
				//console.log(el)
				require([jq.attr('data-module')],function(Page){
					var page=new Page.View({'el':el,'data':dataBase})
					app.pageObject[page.template]=page
					nowNum++
					if(nowNum<len){
						addJs()
					}
				})
			}
			
		};
		
    /*jQuery(document).ready(function() {
        
		//app.Page = new Page.View();
    });*/

});




