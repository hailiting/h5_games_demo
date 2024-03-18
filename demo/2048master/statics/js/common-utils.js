var WeiXin = {
    SetCookie: function(name, value, expires, path) {
        var expdate = new Date();
        expdate.setTime(expdate.getTime() + (expires * 1000));
        document.cookie = name + "=" + escape(value) + "; expires=" + expdate.toGMTString() + ((path) ? ";path=" + path : "");
    },
    GetCookie: function(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg){
                return this.GetCookieVal(j);
            }
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0){
                break;
            }
        }      
        return"";
    },
    GetCookieVal: function(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) {
            endstr = document.cookie.length;
        }
        
        return unescape(document.cookie.substring(offset, endstr));
    },
    IsEmail: function(strg) {
        var patrn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!patrn.exec(strg))
            return false;
        return true
    }
}

/* 
用途：检查输入字符串是否为空或者全部都是空格
输入：str
返回：如果全是空返回true,否则返回false
*/
function isNull(str){
	if(str == undefined) return true;
   if (str != null) {
       str = $.trim(str);
   }else {
   	return true;
   }
   if (str == "") 
       return true;
   var regu = "^[ ]+$";
   var re = new RegExp(regu);
   return re.test(str);
}