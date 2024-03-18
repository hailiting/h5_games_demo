require.config({
    waitSeconds : 15,
    //urlArgs : Math.random(),
	baseUrl : "js/xm/",
    deps : ['main'],
	
	paths : {
		app : "app",
		
		// base
		//backbone : "../../js/backbone-min",
		//underscore : "../../js/underscore-min",

		// raphael
		//raphael : "../../js/raphael",
		//raphaelsvgimport : "../../js/raphael-svg-import-custom",
		//raphealTransform:'../../js/raphael.free_transform',
		
		//iscroll
		iscroll:'../../js/iscroll'
	},shim : {
		
		// raphael
		/*'main':{
			deps:['underscore','backbone']
		},*/
		/*raphael : {
			exports : "Raphael"
		},*/
		iscroll : {
			exports : "iscroll"
		}
		/*
		raphaelsvgimport : {
			deps : ["raphael"]
		},
		raphealTransform:{
			deps : ["raphael"]
		}*/
		

	}
});
