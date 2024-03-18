(function(){
var CLICKI_CF = {
version: '139754397',
host: 'sitemonitor.cn.miaozhen.com',
cdn_host: 'sitemonitor.cn.miaozhen.com',
site_id: Number('45954'),
site_name: "Nivea-%u624B%u673A",
visitor_id: '1401850558815152',
millisecond: '1401850569502119',
session_key: '98pdjl',
time: '1401850569502',
is_logined: true,
rf_key: "dswx9edf1u",
track_type: Number('0')||0,
cross_domains: "",
jscode: null,
widgets: null
};
if (!window.CClicki) {
var id = '__clicki_js_tracker_loader__';
if (!document.getElementById(id)) {
var host = CLICKI_CF.cdn_host || CLICKI_CF.host;
var c = document.createElement('script');
c.id = id;
c.type = 'text/javascript';
c.charset = 'UTF-8';
c.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + host + '/boot/clicki.js?v=' + CLICKI_CF.version;
var h = document.getElementsByTagName('script')[0];
h.parentNode.insertBefore(c, h);
}
}
function check () {
if (window.CClicki) {
window.CClicki.New(CLICKI_CF);
}else{
setTimeout(check, 50);
}
};
check();
})();