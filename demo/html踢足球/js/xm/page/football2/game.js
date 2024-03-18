define(['app', 'base/page', 'page/football2/model/resources', 'page/football2/control/state'],

// Map dependencies from above array.
function(app, BasePage, Resources, State) {

	var AnimationView = {};

	// Default View.
	AnimationView.View = BasePage.View.extend({
		zoo:null,
		init : function() {
			this.template = 'football2'
			var model = ''
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
				//alert("I am Mobile");
				this.zoo = 0
				/*if ($(window).width() / $(window).height() > 320 / 505) {

					this.zoo =$(window).width() / 320 
				} else {
					this.zoo =$(window).height() / 505
				}*/
				this.zoo =$(window).width() / 320 
				this.el.css({
					'zoom' : this.zoo
				})
			} else {
				model = 'pc'
				//alert("I am PC");
			}
			this.el.attr('data-base', model)
			//this.map=new Map.View({})
			/*this.el.css({
			 'zoom':.5

			 })*/
			console.log(this.getTemplatePath())
			//this.el.find("#football").attr('width', 320)
			//this.el.find("#football").attr('height', 450)
			var tt = new Resources.View({
				srcs : [{
					id : 0,
					src : this.getTemplatePath() + "texture.png"
				}]
			})
			tt.deferred.done($.proxy(this.loadFinsh, this))
		},
		loadFinsh : function() {
			new State.View({
				stage : document.getElementById("football"),
				zo:this.zoo
			})
			//console.log(app.res,'aaaaaa')
		}
	});

	// Return the module for AMD compliance.
	return AnimationView;

});
