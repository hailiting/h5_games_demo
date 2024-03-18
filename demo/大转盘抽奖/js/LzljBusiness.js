// JavaScript Document
var Lzlj = {
    url: "/lj/Interface/RegisterData.aspx",
    registerURL: '/lj/register.html?source=' + window.location.pathname,
    isRegistered: "",
    checkRegister: function() {
		//if(G("islogin") == "0"){
		//	LinkAddCustomerId("login.html");
		//	return false; 	
		//}
        //S("userId", "e42bdd1883e24dc9a650d812633f8c57");
        //console.log(G("userId"));
        if (document.cookie.indexOf("IsRegistered=") == -1) {
		    this.getIsRegisterRequired(this.getIsRegistered);
		}
		else
            isRegistered = WeiXin.GetCookie("IsRegistered");
    }
    , getIsRegisterRequired: function (callback) {
        var jsonarr = {
            'action': "getIsRegisterRequired",
            ReqContent: JSON.stringify({
                "common": Base.All(),
                "special": { pageName: window.location.pathname }
            })
        };
        $.ajax({
            type: 'get',
            url: this.url,
            data: jsonarr,
            timeout: 90000,
            cache: false,
            beforeSend: function () {
                Win.Loading();
            },
            dataType: 'json',
            success: function (o) {
                Win.Loading("CLOSE");
                if (o.code == "200") {
                    if (o.content.IsRegisterRequired == "1") {
                        if(callback)
                            callback(this.redirectRegisterPage);
                    }
                } else {
                    alert(o.description);
                }
            }
        })
    }
    , getIsRegistered: function (callback) {
        //S("openId", "oUcanjlz0pGMW57Xm50-uiCqkPIc");
        //S("userId", "8e64ec412d224c46a8ad80857c26e2eb");
        var jsonarr = {
            'action': "getIsRegistered",
            ReqContent: JSON.stringify({
                "common": Base.All()
            })
        };
        //alert(JSON.stringify(jsonarr));
        $.ajax({
            type: 'get',
            url: Lzlj.url,
            data: jsonarr,
            timeout: 90000,
            cache: false,
            beforeSend: function () {
                Win.Loading();
            },
            dataType: 'json',
            success: function (o) {
                Win.Loading("CLOSE");
                if (o.code == "200") {
                    if (o.content.IsRegistered == "2") {
                        WeiXin.SetCookie("IsRegistered", o.content.IsRegistered);
                        Lzlj.isRegistered = "2";
                    }

                    if (callback)
                        callback();
                } else {
                    alert(o.description);
                }
            }
        })
    }
    , redirectRegisterPage: function () {
        if (Lzlj.isRegistered != "2")
            LinkAddCustomerId(Lzlj.registerURL);
    }
}

$(document).ready(function () {
    Lzlj.checkRegister();
});