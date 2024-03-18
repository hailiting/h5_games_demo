define(["app"],

// Map dependencies from above array.
function(app) {

    var $ = jQuery;

    var Api = {};
	//Api.SERVICE_URL='http://www.itstartswithyou.cn/'
    Api.getList = function() {

		var dfd = $.Deferred();
		// dfd.resolve(response.data);
		dfd.resolve({"msg":"ok","data":{"gameid":"7038"}});
        /*$.ajax({
            url : Api.SERVICE_URL+'/action/game_start',
            cache : false,
            type : "GET",
            dataType : "json",
            success : function(response) {
               // alert( response.msg);
                if (response.msg == 'ok') {
                    dfd.resolve(response.data);
                }
            }
        });*/
        return dfd;
       // http://www.itstartswithyou.cn/action/game_end?gameid=20&hash=a1104b105d&token=xxx
    };
	Api.setScore=function(value){
		var dfd = $.Deferred();
		console.log(value)
        $.ajax({
            url : Api.SERVICE_URL+'/action/game_end',
            cache : false,
            type : "GET",
            dataType : "json",
			data : value,
            success : function(response) {
               // alert(response.msg);
                if (response.msg == 'ok') {
                    dfd.resolve(response.data);
                }
            }
        });
        return dfd;
	};
    

    // Return the module for AMD compliance.
    return Api;

});
