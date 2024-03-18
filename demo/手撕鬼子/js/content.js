function getElementsByClass(searchClass, tag) {
	var classElements = new Array();
	var node = document;
	if (tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className)) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var urlList = new Array(".taobao.com", "tmall.com", "jd.com", "dangdang.com",
		"51buy.com", "yixun.com", "suning.com", "coo8.com", "amazon.cn",
		"vancl.com", "yhd.com", "1mall", "gome.com.cn", 
		"www.sogou.com/web", "www.baidu.com/s", "www.google.com.hk/#", "www.google.com.hk/search", "www.google.com.hk/webhp", "www.so.com/s");

var flag = false;//是否显示插件标志
var messageFlag =false;//message初始化成功标志
var currentUrl = window.location.href;
var yhd_site_type = "";
var siteType='1';
function invalid_yhd(){
if( window.top != window.self && window.self.document.URL.indexOf("http://www.kuaidi100.com/frame/app/index2.html?flag=true") <0 ) {
	var selfWindowUrl = window.self.document.URL;
	return false;
}
if(currentUrl.indexOf('taobao.com')>-1){
	yhd_site_type= '103';
}else if(currentUrl.indexOf('tmall.com')>-1){
	yhd_site_type= '102';
}else if(currentUrl.indexOf('jd.com')>-1){
	yhd_site_type= '101';
}else if(currentUrl.indexOf('dangdang.com')>-1){
	yhd_site_type= '106';
}else if(currentUrl.indexOf('51buy.com')>-1 || currentUrl.indexOf('yixun.com')>-1){
	yhd_site_type= '107';
}else if(currentUrl.indexOf('suning.com')>-1){
	yhd_site_type= '108';
}else if(currentUrl.indexOf('coo8.com')>-1){
	yhd_site_type= '109';
}else if(currentUrl.indexOf('amazon.cn')>-1){
	yhd_site_type= '105';
}else if(currentUrl.indexOf('vancl.com')>-1){
	yhd_site_type= '104';
}else if(currentUrl.indexOf('gome.com')>-1){
	yhd_site_type= '1010';
}else if(currentUrl.indexOf('yhd.com')>-1){
	yhd_site_type= '1011';
}else if(currentUrl.indexOf('1mall.com')>-1){
	yhd_site_type= '1012';
} else if (currentUrl.indexOf('baidu.com')>-1) {
	yhd_site_type= '1013'; // 百度搜索引擎
} else if (currentUrl.indexOf('google.com.hk')>-1) {
	yhd_site_type= '1014'; // 谷歌搜索引擎
} else if (currentUrl.indexOf('sogou.com')>-1) {
	yhd_site_type= '1015'; // 搜狗搜索引擎
} else if (currentUrl.indexOf('so.com')>-1) {
	yhd_site_type= '1016'; // 360搜索引擎
}
for ( var i = 0; i < urlList.length; i++) {
	if (currentUrl.indexOf(urlList[i]) > -1) {
		flag = true;
		break;
	}
}
}
var oHead2 = document.getElementsByTagName('head')[0];
	var oScript2 = document.createElement("script");
	oScript2.type = "text/javascript";
	oScript2.src = "http://ic.yhd.com/toolbar/js/messageEvent.js";
	oHead2.appendChild(oScript2);
invalid_yhd();
if (flag && yhd_site_type !='') {
	var urlList = "";
	var searchKey="";
	var itemPrice="";//详情页价格 20131229
	var detail = 0;
	if (currentUrl.indexOf("search.jd.com") > -1|| currentUrl.indexOf("list.jd.com") > -1) { // search.jd.com ||list.jd.com
		var getJdList = document.getElementById('plist');
		if (typeof (getJdList) != "undefined" && getJdList != null) {
			var getByClass = getElementsByClass('p-img', 'div');
			if (typeof (getByClass) != "undefined"
					&& typeof (getByClass[0]) != "undefined") {
				for ( var i = 0; i < 20 && i < getByClass.length
						&& urlList.length < 2000; i++) {
					var getUrlByClass = getByClass[i].getElementsByTagName('a');
					if (typeof (getUrlByClass) != "undefined"
							&& typeof (getUrlByClass[0]) != "undefined"
							&& getUrlByClass[0].href.indexOf('item.jd.com') > -1) {
						urlList += getUrlByClass[0].href + "@@@@@";
					}
				}
			}
		}
		if (currentUrl.indexOf("search.jd.com") > -1){
		var getByClass = getElementsByClass('crumb', 'div');
		if (typeof (getByClass) != "undefined" && typeof (getByClass[0]) != "undefined") {
			var strongs = getByClass[0].getElementsByTagName('strong');
			if (typeof (strongs) != "undefined" && typeof (strongs[0]) != "undefined") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey =strongs[0].textContent;
				}else{
					searchKey =strongs[0].innerText;
				}
				searchKey =searchKey.replace(/"/g, " ");
				searchKey = encodeURIComponent(searchKey);
			}
		}
			
		var getTag = document.getElementById('selected_attrs');
		if(typeof(getTag) !="undefined" && getTag !=null){
			var getTags = getTag.getElementsByTagName('a');
			if (typeof (getTags) != "undefined" && typeof (getTags[0]) != "undefined" && getTags.length>1) {
				for(var i=1;i<getTags.length;i++){
					searchKey =searchKey+encodeURIComponent(" ")+encodeURIComponent(getTags[i].title);
				}
			}
		}
		}else if(currentUrl.indexOf("list.jd.com") > -1){
			var getByClass = getElementsByClass('breadcrumb', 'div');
			if (typeof (getByClass) != "undefined" && getByClass != "" && getByClass.length>0) {
				var getAByClass = getByClass[0].getElementsByTagName('a');
				if (typeof (getAByClass) != "undefined" && getAByClass != "" && getAByClass.length>1) {
					for(var i=1;i<getAByClass.length;i++){
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						searchKey = searchKey +encodeURIComponent(" ")+encodeURIComponent(getAByClass[i].textContent);
					}else{
						searchKey = searchKey +encodeURIComponent(" ")+encodeURIComponent(getAByClass[i].innerText);
					}
				}
				}
			}
		}
	}
	else if (currentUrl.indexOf("item.jd.com") > -1){
		urlList = window.location.href;
		var getJdName= document.getElementById('name');
		if (typeof (getJdName) != "undefined" && getJdName != null) {
			var getAByTag = getJdName.getElementsByTagName('h1');
			if (typeof (getAByTag) != "undefined" && getAByTag != "" && getAByTag.length>0) {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey =encodeURIComponent(getAByTag[0].textContent);
				}else{
					searchKey =encodeURIComponent(getAByTag[0].innerText);
				}
			}	
		}
		detail=1;
		// 京东详情页价格
		var getJdItemPrice = document.getElementById('jd-price');
		if (typeof(getJdItemPrice) != "undefined" && getJdItemPrice != null) {
			var priceString="";
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				priceString =getJdItemPrice.textContent;
			}else{
				priceString =getJdItemPrice.innerText;
			}
			var priceStrings = priceString.split('￥');
			if (typeof(priceStrings[1]) != "undefined" && priceStrings[1] != null) {
				itemPrice = priceStrings[1];
			}
		}
	}
	else if (currentUrl.indexOf("yhd.com") > -1 || currentUrl.indexOf("1mall.com") > -1){
		urlList = window.location.href;
	}
	else if (currentUrl.indexOf("s.taobao.com/search") > -1) { // 淘宝搜索
		var getEle = document.getElementById('combobox');
		if(typeof(getEle) !='undefined' && getEle !=null){
			var getTag = getEle.getElementsByTagName('input');
			if(typeof(getTag) !="undefined" && getTag !=null && getTag.length>0){
				searchKey = encodeURIComponent(getTag[0].value);
			}
			//searchKey = value;
		}
		var getByClass = getElementsByClass('section cate-selected', 'div');
		if (typeof (getByClass) != "undefined" && getByClass != "" && getByClass.length>0) {
			var getAByClass = getByClass[0].getElementsByTagName('a');
			if (typeof (getAByClass) != "undefined" && getAByClass != "" && getAByClass.length>1) {
				for(var i=0;i<getAByClass.length;i++){
					var val = getAByClass[i].title;
					if(typeof(val) !="undefined" && val != null && val !=""){
						var pos = val.indexOf(':');
						if(pos >-1){
							val = val.substring(pos+1); 
						}
					}
					searchKey = searchKey +encodeURIComponent(" ")+ encodeURIComponent(val);	
				}
			}
		}else{
			var getByClass1 = getElementsByClass('has-arrow', 'li');	
			if (typeof (getByClass1) != "undefined" && getByClass1 != "" && getByClass1.length>1 && typeof (getByClass1[getByClass1.length-1]) != "undefined") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey = searchKey +encodeURIComponent(" ")+ encodeURIComponent((getByClass1[getByClass1.length-1]).textContent);
				}else{
					searchKey = searchKey +encodeURIComponent(" ")+ encodeURIComponent((getByClass1[getByClass1.length-1]).innerText);
				}
			}
			var getByClass2 = getElementsByClass('nav-pill-text', 'span');	
			if (typeof (getByClass2) != "undefined" && getByClass2 != "" && getByClass2.length>0) {
				for(var i=0;i<getByClass2.length;i++){
					var val,pos;
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						val =encodeURIComponent(getByClass2[i].textContent);
					}else{
						val =encodeURIComponent(getByClass2[i].innerText);
					}
					if(typeof(val) !="undefined" && val !=null && val !=""){
						searchKey = searchKey +encodeURIComponent(" ")+ val;
					}
				}
			}
		}
	}else if(currentUrl.indexOf("list.taobao.com/") > -1){
		var keywords = document.getElementsByName("keywords");
		if(typeof(keywords) !='undefined' && keywords !=null && keywords.length>0){
			var val =keywords[0].content;
			if(typeof(val) !='undefined' && val != null){
				var vals = new Array();
				vals = val.split(',');
				if(vals.length>3){
				val = vals[1] +" "+ vals[2];}
				}
			searchKey = encodeURIComponent(val);
		}
	}
	else if(currentUrl.indexOf("http://item.taobao.com/") > -1){//淘宝详情页
		//urlList = window.location.href;
		var getByClass = getElementsByClass('tb-item-title', 'h3');
		if (typeof (getByClass) != "undefined" && getByClass != "" && getByClass.length>0) {
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				searchKey = encodeURIComponent(getByClass[0].textContent);
			}else{
				searchKey = encodeURIComponent(getByClass[0].innerText);
			}
		}else{
			var keywords = document.getElementsByName("keywords");
			if(typeof(keywords) !='undefined' && keywords !=null && keywords.length>0){
				var val =keywords[0].content;
				if(typeof(val) !='undefined' && val != null){
					var vals = new Array();
					vals = val.split(',');
					if(vals.length>2 && typeof(vals[vals.length-2]) !='undefined'){
					val =  vals[vals.length-2];
					}
					searchKey = encodeURIComponent(val);
				}
			}
		}
		/** 获取详情页此时的价格   pis不抓取淘宝的商品
		var tbItemPrice = document.getElementById('J_StrPrice');
		if (typeof(tbItemPrice) != "undefined" && tbItemPrice != null) {
			var priceTags = tbItemPrice.getElementsByTagName('em');
			if (typeof(priceTags) != "undefined" && priceTags != null && priceTags.length>1) {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					itemPrice = priceTags[1].textContent;
				}else{
					itemPrice = priceTags[1].innerText;
				}
			}
		}*/
	}
	else if (currentUrl.indexOf("list.tmall.com/") > -1) { //天猫
		var getById = document.getElementById('J_CrumbSlideCon');
		if(typeof(getById) !="undefined" && getById !=null){
			var getTagsByClass = getElementsByClass('crumbAttr', 'li'); 
			if(typeof(getTagsByClass) !="undefined" && getTagsByClass !=null && getTagsByClass.length>0){
				for(var i=0;i<getTagsByClass.length;i++){
					var val=getTagsByClass[i].title;
					if(typeof(val) !='undefined' && val != null){
						var vals = val.indexOf(':');
						if(typeof(vals) !="undefined" && vals>-1){
							val = val.substring(vals+1);
						}
				}
					searchKey = searchKey+ encodeURIComponent(" ")+encodeURIComponent(val);
				}
			}
		}
		if(searchKey ==""){
			var getTags = getById.getElementsByTagName('a');
			if(typeof(getTags) !="undefined" && getTags.length>1){
				searchKey = searchKey+ encodeURIComponent(" ")+encodeURIComponent(getTags[1].title);
				if(getTags.length>2){
					searchKey = searchKey+ encodeURIComponent(" ")+encodeURIComponent(getTags[2].title);	
				}
			}
		}
		var getYid =document.getElementById('mq');
		if(searchKey == "" && typeof(getYid) !="undefined" && getYid !=null){
			searchKey = searchKey+ encodeURIComponent(" ")+encodeURIComponent(document.getElementById('mq').value);
		}
		
	}
	else if (currentUrl.indexOf("detail.tmall.com") > -1) { //天猫详情页
		urlList = window.location.href;
		var getByClass = getElementsByClass('tb-detail-hd', 'div');
		if (typeof (getByClass) != "undefined" && getByClass != "" && getByClass.length>0) {
			var getContentsByClass = getByClass[0].getElementsByTagName('h3');
			if (typeof (getContentsByClass) != "undefined"&& typeof (getContentsByClass[0]) != "undefined") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey = encodeURIComponent(getContentsByClass[0].textContent);
				}else{
					searchKey = encodeURIComponent(getContentsByClass[0].innerText);
				}
			}
		}
		detail=1;
		// 获取天猫详情页价格
		var J_PromoPrice = document.getElementById('J_PromoPrice');
		var J_StrPriceModBox = document.getElementById('J_StrPriceModBox');
		if(typeof(J_PromoPrice) != "undefined" && J_PromoPrice!= null){
			var tmPItemPrice = J_PromoPrice.getElementsByTagName("span");
			if (typeof(tmPItemPrice) != "undefined" && tmPItemPrice != null) {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					if (typeof(tmPItemPrice.textContent) != "undefined" && tmPItemPrice.textContent.indexof("-")<0) {
						itemPrice = tmPItemPrice.textContent;
					}
				}else{
					if (typeof(tmPItemPrice.innerText) != "undefined" && tmPItemPrice.innerText.indexof("-")<0) {
						itemPrice = tmPItemPrice.innerText;
					}
				}
			}
		}
		// 非促销价
		var tmPrice = "";
		if (typeof(J_StrPriceModBox) != "undefined" && J_StrPriceModBox!= null) {
			var tmItemPrice = J_StrPriceModBox.getElementsByTagName("span");
			if (typeof(tmItemPrice) != "undefined" && tmItemPrice != null) {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					if (typeof(tmItemPrice.textContent) != "undefined"  && tmPItemPrice.textContent.indexof("-")<0) {
						tmPrice = tmItemPrice.textContent;
					}
					
				}else{
					if (typeof(tmItemPrice.innerText) != "undefined" && tmPItemPrice.innerText.indexof("-")<0) {
						tmPrice = tmItemPrice.innerText;
					}
				}
			}
		}
		if (typeof(itemPrice) == "undefined" || itemPrice=="") {
			itemPrice = tmPrice;
		}
	}

	else if (currentUrl.indexOf("search.dangdang.com/") > -1 || currentUrl.indexOf("category.dangdang.com/") > -1) { // dangdang
		var getByClass = getElementsByClass('inner', 'div');
		if (typeof (getByClass) != "undefined" && typeof (getByClass[0]) != "undefined") {
			for ( var i = 0; i < 20 && i < getByClass.length
					&& urlList.length < 2000; i++) {
				var getUrlByClass = getByClass[i].getElementsByTagName('a');
				if (typeof (getUrlByClass) != "undefined"
						&& typeof (getUrlByClass[0]) != "undefined") {
					urlList += getUrlByClass[0].href + "@@@@@";
				}
			}
		}
			var getByClass = getElementsByClass('current', 'span');
			var getLeft = getElementsByClass('all_sort', 'li');
			var category="";
			var band ="";
			if(typeof (getLeft) != "undefined" && getLeft != "" && getLeft.length>0){
				var getSpan1 = getLeft[0].getElementsByTagName('span');
				if(typeof (getSpan1) != "undefined" && getSpan1 != "" && getSpan1.length>0){
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						searchKey = encodeURIComponent(getSpan1[0].textContent);
					}else{
						searchKey = encodeURIComponent(getSpan1[0].innerText);
					}	
				}
				
			}
			if (typeof (getByClass) != "undefined" && getByClass != "" && getByClass.length>0 && searchKey=="") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					
					category = getByClass[0].textContent;
				}else{
					category = getByClass[0].innerText;
				}
					if(typeof(category) !='undefined' && category != null && category !=""){
						var vals = new Array();
						vals = category.split('"(');
						if(vals.length>0){
							category = vals[0];}
						}
					category=category.replace('"',"");
			}
			var getByClassBand = getElementsByClass('block', 'span');
			if (typeof (getByClassBand) != "undefined" && getByClassBand != "" && getByClassBand.length>0) {
				for(var j=0;j<getByClassBand.length;j++){
					band =band+" "+ getByClassBand[j].title;
				}
			}
			searchKey = searchKey + encodeURIComponent(" "+category +" "+band);
	}
	else if (currentUrl.indexOf("product.dangdang.com") > -1) { // dangdang/product
		urlList = window.location.href;
		var getByClass = getElementsByClass('head', 'div');
		if (typeof (getByClass) != "undefined" && typeof (getByClass[0]) != "undefined") {
			var getContentsByClass = getByClass[0].getElementsByTagName('h1');
			if (typeof (getContentsByClass) != "undefined"&& typeof (getContentsByClass[0]) != "undefined") {
				var contents =getContentsByClass[0].innerHTML;
				if(typeof (contents) != "undefined" && contents !=""){
				var pos = contents.indexOf("<span");
				if(pos == -1 ){
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						searchKey = getContentsByClass[0].textContent;
					}else{
						searchKey = getContentsByClass[0].innerText;
					}
					}else{
						searchKey= contents.substring(0,pos);
						 var spos = searchKey.indexOf('】');
						var  sposs = searchKey.indexOf(']');
						 if(spos > -1){
						 searchKey =searchKey.substring(spos+1);}else if(sposs >-1){
							 searchKey =searchKey.substring(sposs+1); 
						 }
						spos = searchKey.lastIndexOf(' ');
						if(spos >-1){
						searchKey = searchKey.substring(0,spos);}
					}
				
				}
			}
			searchKey = encodeURIComponent(searchKey);
		}
		detail=1;
		// 当当详情页价格<span id="salePriceTag">79.00</span>
		var dangdangPrice = document.getElementById('salePriceTag');
		if (typeof(dangdangPrice) != "undefined" && dangdangPrice != null) {
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				itemPrice = dangdangPrice.textContent;
			}else{
				searchKey = dangdangPrice.innerText;
			}
		}
	}
	else if (currentUrl.indexOf("searchex.yixun.com/html") > -1) { // yixun
		var getByClass = getElementsByClass('item_list', 'li');
		var itemList =document.getElementById('itemList');
		if (typeof (getByClass) != "undefined" && typeof (getByClass[0]) != "undefined") {
			for ( var i = 0; i < 20 && i < getByClass.length
					&& urlList.length < 2000; i++) {
				var getUrlByCla = getByCla[i].getElementsByTagName('a');
				if (typeof (getUrlByCla) != "undefined"
						&& typeof (getUrlByCla[0]) != "undefined") {
					urlList += getUrlByCla[0].href + "@@@@@";
				}
			}
		}else if(typeof(itemList) !='undefined' && itemList !=null){
			var getATags = itemList.getElementsByTagName('a');
			if (typeof (getATags) != "undefined" && typeof (getATags.length) != "undefined" && getATags.length>0) {
				var pattern = new RegExp("(^|\\s)" + 'link_pic' + "(\\s|$)");
				for ( var i = 0; i < 50 && i < getATags.length&& urlList.length < 2000; i++) {
			if (typeof (getATags[i]) != "undefined" && typeof (getATags[i].href) != "undefined" && pattern.test(getATags[i].claName)) {
				urlList += getATags[i].href + "@@@@@";
			}
		}
			}
		}
		var getCrumbKey =document.getElementById('crumbKey');
		if(typeof(getCrumbKey) !='undefined' && getCrumbKey !=null && (document.getElementById('crumbKey').value).indexOf('在当前') <= -1){
			searchKey = encodeURIComponent(document.getElementById('crumbKey').value);
		}
		var getCrumb_selected_cnt = getElementsByClass('crumb_selected_cnt', 'span');	
		if (typeof (getCrumb_selected_cnt) != "undefined" && typeof (getCrumb_selected_cnt.length) != "undefined" && getCrumb_selected_cnt.length> 0) {
			for(var i =0;i<getCrumb_selected_cnt.length;i++){
				var getVlas ="";
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				getVlas =getCrumb_selected_cnt[i].textContent;
			}else{
				getVlas = getCrumb_selected_cnt[i].innerText;
				}
			if(getVlas !=null && getVlas !="" && getVlas.indexOf("：") > -1){
				var pos = getVlas.indexOf("：");
				getVlas = getVlas.substring(pos);
			}
			searchKey =searchKey+ encodeURIComponent(" " + getVlas);
			}
		}
				var getByClaBand = getElementsByClass('crumbs_links', 'div');	
				if (typeof (getByClaBand) != "undefined" && typeof (getByClaBand[0]) != "undefined") {
					var getUrlByCla = getByClaBand[0].getElementsByTagName('a');
					if (typeof (getUrlByCla) != "undefined" && typeof (getUrlByCla.length>0)) {
						if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						searchKey = encodeURIComponent(" "+getUrlByCla[getUrlByCla.length-1].textContent);}else{
							searchKey = searchKey+ encodeURIComponent(" "+getUrlByCla[getUrlByCla.length-1].innerText);
						}
					}
				}
			var getByClaName = getElementsByClass('filter_on_link', 'a');
			if (typeof (getByClaName) != "undefined" && typeof (getByClaName[0]) != "undefined") {
				var con =getByClaName[0].title;
				if(typeof(con) !="undefined" && con !=""){
					var pos1 = con.indexOf('：');
				if(pos1 >-1){
					searchKey =searchKey+encodeURIComponent(" "+con.substring(pos1+1));
				}else{
					searchKey =searchKey+encodeURIComponent(" "+con);
				}
				}
			}
	}
	else if (currentUrl.indexOf("http://item.yixun.com/") > -1) { // item.yixun
		urlList = window.location.href;
		var getByClaName = getElementsByClass('xbase_row1', 'div');
		if (typeof (getByClaName) != "undefined" && typeof (getByClaName[0]) != "undefined") {
			var getByCla = getByClaName[0].getElementsByTagName('h1');
			if (typeof (getByCla) != "undefined" && typeof (getByCla[0]) != "undefined") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey =searchKey+encodeURIComponent(getByCla[0].textContent);}else{
						searchKey =searchKey+encodeURIComponent(getByCla[0].innerText);
				}
			}
		}
		detail=1;
		//易迅网详情页价格
		//<span itemprop="highPrice" class="mod_price xprice_val"><i>¥</i><del>1899.00</del></span>
		//<span itemprop="lowPrice"  class="mod_price xprice_val"><i>¥</i>1759.00</span>
		var modPriceS = getElementsByClass('mod_price xprice_val', 'span');
		if (typeof(modPriceS) != "undefined" && typeof(modPriceS[0]) != "undefined") {
			var yixunPriceSpan = modPriceS[0];
			var spanDel = yixunPriceSpan.getElementsByTagName('del');
			if (typeof(spanDel) == "undefined" || spanDel == null || spanDel=="" || spanDel.length == 0) {
				var yixunPriceSpanContent = "";
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					yixunPriceSpanContent =yixunPriceSpan.textContent;
				}else{
					yixunPriceSpanContent =yixunPriceSpan.innerText;
				}
				var yixunPriceArray = yixunPriceSpanContent.split('¥');
				if (typeof(yixunPriceArray) != "undefined" && typeof(yixunPriceArray[1]) != "undefined") {
					itemPrice = yixunPriceArray[1];
				}
			} else {
				if (modPriceS[1] != "undefined") {
					var yixunPriceSpanContent = "";
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						yixunPriceSpanContent =modPriceS[1].textContent;
					}else{
						yixunPriceSpanContent =modPriceS[1].innerText;
					}
					var yixunPriceArray = yixunPriceSpanContent.split('¥');
					if (typeof(yixunPriceArray) != "undefined" && typeof(yixunPriceArray[1]) != "undefined") {
						itemPrice = yixunPriceArray[1];
					}
				}
			}
			
		}
	}

	else if (currentUrl.indexOf("http://search.suning.com/") > -1 || currentUrl.indexOf("http://list.suning.com/") > -1) { // suning
		var urlDiv = document.getElementById('proShow');
		if (typeof (urlDiv) != "undedined" && urlDiv != null) {

			var getByCla = urlDiv.getElementsByTagName('li');
			if (typeof (getByCla) != "undefined"
					&& typeof (getByCla[0]) != "undefined") {
				for ( var i = 0; i < 20 && i < getByCla.length
						&& urlList.length < 2000; i++) {
					var getUrlByCla = getByCla[i].getElementsByTagName('a');
					if (typeof (getUrlByCla) != "undefined"
							&& typeof (getUrlByCla[0]) != "undefined") {
						urlList += getUrlByCla[0].href + "@@@@@";
					}
				}
			}
		}
		
			var getByClaBand = getElementsByClass('breadNav', 'div');	
			if (typeof (getByClaBand) != "undefined" && typeof (getByClaBand[0]) != "undefined") {
				getByClaBand = getElementsByClass('breadNavBg', 'div');
				if (typeof (getByClaBand) != "undefined" && typeof (getByClaBand[0]) != "undefined") {
				var getUrlByCla = getByClaBand[0].getElementsByTagName('span');
				if (typeof (getUrlByCla) != "undefined" && getUrlByCla.length>0) {
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey = getUrlByCla[getUrlByCla.length-1].textContent;}else{
						searchKey = getUrlByCla[getUrlByCla.length-1].innerText;
					}
					searchKey =encodeURIComponent(searchKey);
				}
			}
			}
		var bands = document.getElementById('topFilter');
		if(typeof(bands) !="undefined" && bands != null){
			var tags = bands.getElementsByTagName('em');
			if (typeof (tags) != "undefined" && typeof (tags[0]) != "undefined") {
				for(var i=0;i<tags.length;i++){
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					var con =tags[i].textContent;
					if(typeof(con) !="undefined" && con !=""){
						var pos1 = con.indexOf(':');
					if(pos1 >-1){
						con = con.substring(pos1+1);
					}
					}	
				searchKey =searchKey +encodeURIComponent(" "+con);}else{
					var con =tags[i].innerText;
					if(typeof(con) !="undefined" && con !=""){
						var pos1 = con.indexOf(':');
					if(pos1 >-1){
						con = con.substring(pos1+1);
					}
					}
					searchKey =searchKey +encodeURIComponent(" "+con);
				}
			}
			}
			if(searchKey ==""){
				var getY =document.getElementById("searchKeywords");
				if(typeof(getY) !="undefined" && null !=getY){
					searchKey =encodeURIComponent(document.getElementById("searchKeywords").value);	
				}
			}
		}
		var getByCla12 = getElementsByClass('sn-crumbs-container', 'div');
		if (typeof(getByClass12) != "undefined" && typeof(getByClass12.length) != "undefined" && getByClass12.length >1 ) {
			for(var i=1;i<getByClass12.length-1;i++){
				var getTagss = getByClass12[i].getElementsByTagName('a');
				if (typeof (getTagss) != "undefined" && typeof (getTagss.length) != "undefined" && getTagss.length >0 ) {
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						var con =getTagss[0].textContent;
						if(typeof(con)!= "undefined" && con !=""){
							searchKey =searchKey +encodeURIComponent(" "+con);	
						}
					}else{
						var con =getTagss[0].innerText;
						if(typeof(con)!= "undefined" && con !=""){
							searchKey =searchKey +encodeURIComponent(" "+con);	
						}
					}
					
				}
			}
			var lastText = getByClass12[getByClass12.length-1];
			if (typeof(lastText) != "undefined" && lastText !=null && lastText !=""){
				var getTagsss = lastText.getElementsByTagName('a');
				if (typeof(getTagsss) != "undefined" && typeof(getTagsss[0]) !='undefined' && getTagsss !=null){
					var getTagssss = getTagsss[0].getElementsByTagName('span');
					if (typeof(getTagssss) != "undefined" && typeof(getTagssss[0]) !='undefined' && getTagssss !=null){
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						var con =getTagssss[0].textContent;
						if(typeof(con)!= "undefined" && con !=""){
							searchKey =searchKey +encodeURIComponent(" "+con);	
						}
					}else{
						var con =getTagssss[0].innerText;
						if(typeof(con)!= "undefined" && con !=""){
							searchKey =searchKey +encodeURIComponent(" "+con);	
					}
					}
				}
			}
		}
		}
	}
	else if (currentUrl.indexOf("http://product.suning.com/") > -1
			|| currentUrl.indexOf("http://qiang.suning.com/") > -1) { // product.suning
		urlList = window.location.href;
		var getByClassBand = getElementsByClass('product-main-title', 'div');	
		if (typeof (getByClassBand) != "undefined" && typeof (getByClassBand[0]) != "undefined") {
			var gettags = getByClassBand[0].getElementsByTagName('h1');
			if (typeof (gettags) != "undefined" && typeof (gettags[0]) != "undefined" && typeof(gettags[0].title) !="undefined") {
				searchKey =encodeURIComponent(gettags[0].title);
			}
		}
		detail=1;
		// qiang.suning.com
		var rpPrice = document.getElementById("rpPrice");
		if (typeof(rpPrice) != "undefined" && rpPrice != null) {
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				itemPrice = rpPrice.textContent;
			}else{
				itemPrice = rpPrice.innerText;
			}
		} else {
			var easyPrice = document.getElementById("easyPrice");
			if (typeof(easyPrice) != "undefined" && easyPrice != null) {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					itemPrice = easyPrice.textContent;
				}else{
					itemPrice = easyPrice.innerText;
				}
			}
		}
		
		//product.suning.com
		// <span id="promotionPrice" class="main-price snPrice">¥<em></em></span>
		var promotionPrice = document.getElementById("promotionPrice");
		var isProm = 1;
		if (typeof(promotionPrice) != "undefined" && promotionPrice != null) {
			var priceEms = promotionPrice.getElementsByTagName("em");
			if (typeof(priceEms) != "undefined" && typeof(priceEms[0]) != "undefined") {
				var em="";
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					em = priceEms[0].textContent;
				}else{
					em = priceEms[0].innerText;
				}
				if (em != "" && em.length > 0) {
					itemPrice = em;
				} else {
					isProm = 0;
				}
			}
		}
		// 非促销价
		if (isProm == 0) {
			var netPrice = document.getElementById("netPrice");
			if (typeof(netPrice) != "undefined" && netPrice != null) {
				var priceEms = promotionPrice.getElementsByTagName("em");
				if (typeof(priceEms) != "undefined" && typeof(priceEms[0]) != "undefined") {
					var em="";
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						em = priceEms[0].textContent;
					}else{
						em = priceEms[0].innerText;
					}
					if (em != "" && em.length > 0) {
						itemPrice = em;
					}
				}
			}
		}
	}
	else if (currentUrl.indexOf("coo8.com/coo8/ec/atgsearch") > -1
			|| currentUrl.indexOf("coo8.com/products") > -1) { // coo8
		var getByClass = getElementsByClass('pic', 'p');
		if (typeof (getByClass) == "undefined" || getByClass == "") {
			getByClass = getElementsByClass('pic', 'div');
		}
		if (typeof (getByClass) != "undefined"
				&& typeof (getByClass[0]) != "undefined") {
			var num = 0;
			for ( var i = 0; num < 20 && i < getByClass.length
					&& urlList.length < 2000; i++) {
				var getUrlByClass = getByClass[i].getElementsByTagName('a');
				if (typeof (getUrlByClass) != "undefined"
						&& typeof (getUrlByClass[0]) != "undefined") {
					var urln = getUrlByClass[0].href;
					urlList += urln + "@@@@@";
					num++;

				}
			}
		}
		var searchKey="";
		var getNameByClass = getElementsByClass('crumb', 'div');
		if (typeof (getNameByClass) != "undefined" && typeof (getNameByClass[0]) != "undefined") {
			var getTags =getNameByClass[0].getElementsByTagName('a');
			if (typeof (getTags) != "undefined" && typeof (getTags[0]) != "undefined" && getTags.length>2) {
				for(var i=2;i<getTags.length;i++){
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						if(typeof(getTags[i].textContent) !='undefined' && getTags[i].textContent != null ){
							searchKey = searchKey+" "+encodeURIComponent(getTags[i].textContent);
						}	
					}else{
						if(typeof(getTags[i].innerText) !='undefined' && getTags[i].innerText != null ){
							searchKey = searchKey+" "+encodeURIComponent(getTags[i].innerText);
					}
					}
				}
			}else{
				var pos = currentUrl.indexOf("question=");
				if(pos > -1){
				 searchKey = currentUrl.substring(pos+9);
				}
			}
		}
	}
	else if (currentUrl.indexOf("http://www.coo8.com/product") > -1
			&& currentUrl.indexOf("coo8.com/products") <= -1) { // product.coo8
		urlList = window.location.href;
		var getName = document.getElementById('prdtitle');
		if(typeof(getName) !='undefined'  && getName != null ){
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				if(typeof(getName.textContent) !='undefined' && getName.textContent != null ){
					searchKey =encodeURIComponent(getName.textContent);
				}
			}else{
				if(typeof(getName.innerText) !='undefined' && getName.innerText != null ){
					searchKey =encodeURIComponent(getName.innerText);
				}
			}
		}else{
			var getNameByClass = getElementsByClass('prdtit', 'h1');
			if (typeof (getNameByClass) != "undefined" && typeof (getNameByClass[0]) != "undefined") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					if(typeof(getNameByClass[0].textContent) !='undefined' && getNameByClass[0].textContent != null ){
						searchKey =encodeURIComponent(getNameByClass[0].textContent);
					}
				}else{
					if(typeof(getNameByClass[0].innerText) !='undefined' && getNameByClass[0].innerText != null ){
						searchKey =encodeURIComponent(getNameByClass[0].innerText);
					}
				}
			}
		}
	}
	else if (currentUrl.indexOf("amazon.cn/s/") > -1 || currentUrl.indexOf("amazon.cn/b/") > -1 ) { // amazon.search
		var getByClass = getElementsByClass('apsListAligned', 'div');
		if (typeof (getByClass) == "undefined" || getByClass == "") {
			getByClass = getElementsByClass("image imageContainer", 'div');
		}
		else if (typeof (getByClass) != "undefined"
				&& typeof (getByClass[0]) != "undefined") {
			for ( var i = 0; i < 20 && i < getByClass.length
					&& urlList.length < 2000; i++) {
				var getUrlByClass = getByClass[i].getElementsByTagName('a');
				if (typeof (getUrlByClass) != "undefined"
						&& typeof (getUrlByClass[0]) != "undefined") {
					urlList += getUrlByClass[0].href + "@@@@@";
				}
			}
		}
		var getTag = document.getElementById('breadCrumb');
		if(typeof(getTag) !='undefined' && getTag !=null){
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				searchKey =getTag.textContent;}else{
					searchKey =getTag.innerText;
				}
		}
		searchKey = searchKey.replace(/›/g, " ");
		searchKey =searchKey.replace(/"/g, " ");
		searchKey = encodeURIComponent(searchKey);
	}
	else if (currentUrl.indexOf("amazon.cn/gp/product/") > -1) { // dangdang/product
		urlList = window.location.href;
		var getTag = document.getElementById('btAsinTitle');
		if(typeof(getTag) !='undefined' && getTag !=null){
			var getTags = getTag.getElementsByTagName('span');
			if (typeof (getTags) != "undefined"
				&& typeof (getTags[0]) != "undefined") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey =getTags[0].textContent;}else{
						searchKey =getTags[0].innerText;
					}
			}
		}
		searchKey = searchKey.replace(/›/g, " ");
		searchKey =searchKey.replace(/"/g, " ");
		searchKey = encodeURIComponent(searchKey);
		detail=1;
		// 取亚马逊详情页价格
		var actualPriceValue = document.getElementById('actualPriceValue');
		if(typeof(actualPriceValue) !='undefined' && actualPriceValue !=null){
			var zPrice = "";
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				zPrice =actualPriceValue.textContent;
			}else{
				zPrice =actualPriceValue.innerText;
			}
			if (typeof (zPrice) != "undefined" && zPrice != null) {
				var zPrices = zPrice.split(" ");
				if (typeof (zPrices) != "undefined" && zPrices != null && zPrices.length > 1) {
					itemPrice = zPrices[1];
				}
			}
		}
	}
	else if (currentUrl.indexOf("amazon.cn/") > -1) {
		var getTag = document.getElementById('btAsinTitle');
		if(typeof(getTag) !='undefined' && getTag !=null){
			var getTags = getTag.getElementsByTagName('span');
			if (typeof (getTags) != "undefined"
				&& typeof (getTags[0]) != "undefined") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey =encodeURIComponent(getTags[0].textContent);}else{
						searchKey =encodeURIComponent(getTags[0].innerText);
					}
			}
		}
		urlList = window.location.href;
	}	

	else if (currentUrl.indexOf("gome.com.cn/search") > -1
			|| currentUrl.indexOf("gome.com.cn/products") > -1
			|| currentUrl.indexOf("gome.com.cn/category") > -1) { // coo8
		var getByClass = getElementsByClass('pic-wrap', 'p');
		if (typeof (getByClass) == "undefined" || getByClass == "") {
			getByClass = getElementsByClass('pic-wrap', 'div');
		}
		if (typeof (getByClass) != "undefined"
				&& typeof (getByClass[0]) != "undefined") {
			var num = 0;
			for ( var i = 0; num < 20 && i < getByClass.length
					&& urlList.length < 2000; i++) {
				var getUrlByClass = getByClass[i].getElementsByTagName('a');
				if (typeof (getUrlByClass) != "undefined"
						&& typeof (getUrlByClass[0]) != "undefined") {
					var urln = getUrlByClass[0].href;
					urlList += urln + "@@@@@";
					num++;

				}
			}
		}
		
		var getNameByClass = getElementsByClass('crumb clearfix', 'div');
		if (typeof (getNameByClass) != "undefined" && typeof (getNameByClass[0]) != "undefined") {
			var getSpanTags =getNameByClass[0].getElementsByTagName('span');
			if (typeof (getSpanTags) != "undefined" && typeof (getSpanTags[0]) != "undefined" && getSpanTags.length>0) {
				var getss ="";
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					getss = getSpanTags[0].textContent;
				}else{
					getss = getSpanTags[0].innerText;
				}
				if(getss.indexOf("“") >-1 || getss.indexOf('"') >-1){
				getss =getss.replace(/"/g, " ");
				getss =getss.replace(/“/g, " ");
				getss =getss.replace(/”/g, " ");
				searchKey = searchKey+encodeURIComponent("  "+getss);
				}
			}
			var getTags =getNameByClass[0].getElementsByTagName('a');
			if (typeof (getTags) != "undefined" && typeof (getTags[0]) != "undefined" && getTags.length>1) {
				for(var i=1;i<getTags.length;i++){
					if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
						searchKey = searchKey+encodeURIComponent("  "+getTags[i].textContent);
					}else{
						searchKey = searchKey+encodeURIComponent("  "+getTags[i].innerText);
					}
				}
			}
			var dis = document.getElementById('J_catalogs');
			var classElements = new Array();
			var els = dis.getElementsByTagName('a');
			var elsLen = els.length;
			var pattern = new RegExp("(^|\\s)" + 'cur' + "(\\s|$)");
			for (i = 0, j = 0; i < elsLen; i++) {
				if (pattern.test(els[i].className)) {
					classElements[j] = els[i];
					j++;
				}
			}
			if(typeof(classElements) !="undefined" && classElements !=null && classElements.length>0){
			for(var i=1;i<classElements.length;i++){
				if(typeof(classElements[i]) !="undefined" &&typeof(classElements[i].title) !="undefined" && classElements[i].title !=null && classElements[i].title !="" && classElements[i].title !="不限"){
					searchKey = searchKey+encodeURIComponent("  "+classElements[i].title);
				}
			}
			}
		}
	}
	else if (currentUrl.indexOf("gome.com.cn/product") > -1
			&& currentUrl.indexOf("gome.com.cn/products") <= -1) { // product.coo8
		urlList = window.location.href;
		var getName = document.getElementById('prdtitle');
		if(typeof(getName) !='undefined' && getName != null ){
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				searchKey = encodeURIComponent(getName.textContent);	
			}else{
				searchKey = encodeURIComponent(getName.innerText);	
			}
		}else{
			var getNameByClass = getElementsByClass('prdtit', 'h1');
			if (typeof (getNameByClass) != "undefined" && typeof (getNameByClass[0]) != "undefined") {
				if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
					searchKey = encodeURIComponent(getNameByClass[0].textContent);}else{
						searchKey = encodeURIComponent(getNameByClass[0].innerText);
					}
			}
		}
		detail=1;
		// 国美详情页的价格
		var prdPrice = document.getElementById('prdPrice');
		if(typeof(prdPrice) !='undefined' && prdPrice != null ){
			var prdPriceString = "";
			if(window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1){
				prdPriceString = prdPrice.textContent;	
			}else{
				prdPriceString = prdPrice.innerText;	
			}
			if (typeof(prdPriceString) !='undefined' && prdPriceString != null ){
				var prdPriceS = prdPriceString.split("¥");
				if (typeof (prdPriceS) != "undefined" && prdPriceS != null && prdPriceS.length > 1) {
					itemPrice = prdPriceS[1];
				}
			}
		}
	}
	// 百度搜索页
	else if (currentUrl.indexOf("www.baidu.com/s") > -1) {
		var searchInput = document.getElementById('kw');
		if(typeof(searchInput) !='undefined' && searchInput != null ){
			searchKey = encodeURIComponent(searchInput.value);	
		}
	}
	// 谷歌搜索页http://www.google.com.hk/  
	//else if (currentUrl.indexOf("www.google.com.hk/search") > -1) {
	//	var searchInput = document.getElementById('lst-ib');
	//	if(typeof(searchInput) !='undefined' && searchInput != null ){
	//		searchKey = encodeURIComponent(searchInput.value);	
	//	}
	//}
	else if (currentUrl.indexOf("www.google.com.hk/#") > -1 || currentUrl.indexOf("www.google.com.hk/search") > -1 || currentUrl.indexOf("www.google.com.hk/webhp") > -1) {
		var currUrl = window.location.href;
		var params = currUrl.split('&');
		var searchInput = null;
		for (var i=0 ; i<params.length ; i++) {
			if (params[i].indexOf("q=") > -1) {
				searchInput = params[i].split('=')[1];
				break;
			}
		}
		if(typeof(searchInput) !='undefined' && searchInput != null ){
			searchKey = searchInput;	
		}
	}
	// 搜狗搜索页http://www.sogou.com/web
	else if (currentUrl.indexOf("www.sogou.com/web") > -1) {
		var searchInput = document.getElementById('upquery');
		if(typeof(searchInput) !='undefined' && searchInput != null ){
			searchKey = encodeURIComponent(searchInput.value);	
		}
	}
	// 360搜索引擎 www.so.com
	else if (currentUrl.indexOf("www.so.com/s") > -1) {
		var searchInput = document.getElementById('keyword');
		if(typeof(searchInput) !='undefined' && searchInput != null ){
			searchKey = encodeURIComponent(searchInput.value);	
		}
	}
	else if (urlList != "" && urlList.indexOf('PorUrl') < 0) {
		urlList = urlList;
	}

	function set_yhd_() {
		messageFlag = true;
		(function(window, document, undefined) {
			var arraySlice = Array.prototype.slice;
			// 内部方法
			var yhd_div_set = document.getElementById('yhd_div_set');
			var fns = {
				// 设置或者获取某元素的css，this为哪个元素由调取时候控制
				css : function(name, value) {
					if (value == undefined) {
						return this.style[name];
					} else {
						this.style[name] = value;
					}
				},
				attr : function(name, value) {
					if (value == undefined) {
						return this.getAttribute[name];
					} else {
						this.setAttribute(name, value);
					}
				},
				setWidth : function(length) {
					if (length.charAt(length.length - 1) != '%') {
						length = length + 'px';
					}
					fns.css.call(this.parentNode, 'width', length);
					if (!yhd_div_set) {
						yhd_div_set = document.getElementById('yhd_div_set');
						if (!yhd_div_set) {
							return;
						}
					}
					if (length == '100%') {
						var ff = document.getElementById('gTTLink');
						if (ff) {
							ff.style.top = 34 + 'px';
						}
					} else {
						var ff = document.getElementById('gTTLink');
						if (ff) {
							ff.style.top = 0;
						}
					}
				},
				setTop : function(style) {
					if (style == "long") {
						yhd_div_set.style.height = '35px';
					}
					if (style == "message") {
						yhd_div_set.style.height = '57px';
					}
					if (style == "short") {
						yhd_div_set.style.height = 0;
					}
					if (style == "searchEngineMessage") {
						if (currentUrl.indexOf('www.sogou.com/web')>-1) {
							yhd_div_set.style.height = '29px';
						} else if (currentUrl.indexOf('www.baidu.com/s')>-1) {
							yhd_div_set.style.height = '29px';
							var u = document.getElementById('u');
							if (typeof (u) != "undefined") {
								u.style['top'] = '35px';
							}
						} else if (currentUrl.indexOf('www.so.com/s')>-1) {
							yhd_div_set.style.height = '29px';
						} else if (currentUrl.indexOf('www.google.com.hk/#')>-1) {
							yhd_div_set.style.height = 0;
							var viewport = document.getElementById('viewport');
							viewport.style['top'] = '25px';
							viewport.style['position'] = 'relative';
						} else if ((currentUrl.indexOf('www.google.com.hk/search')>-1 || currentUrl.indexOf('www.google.com.hk/webhp')>-1) && currentUrl.indexOf('&tbm=')<=-1) {
							yhd_div_set.style.height = 0;
							var mngb = document.getElementById('mngb');
							mngb.style['top'] = '25px';
							mngb.style['position'] = 'relative';//absolute
							var main = document.getElementById('main');
							main.style['top'] = '53px';
							main.style['position'] = 'absolute';
							var sfbg_nojsv = getElementsByClass('sfbg', 'div');
							if (typeof (sfbg_nojsv) != "undefined" && typeof (sfbg_nojsv[0]) != "undefined") {
								sfbg_nojsv[0].style['top'] = '0px';
							}
						}
					}
				},
				setHeight : function(length) {
					if (length.charAt(length.length - 1) != '%') {
						length = length + 'px';
					}
					fns.attr.call(this, 'height', length);
				},
				hide : function() {
					fns.css.call(this.parentNode, 'display', 'none');
				}
			}
			var YHD_FN = function() {// init
				var args = arraySlice.call(arguments);
				var fn_name = args[0];
				var options = args.slice(1);
				fns[fn_name].apply(this, options);
			};
			(function() { // 先init，再加载iframe里的portal.jsp,然后调用setWidth等方法
				document.getElementById('yhd_div_flag').innerHTML = ss;
			})();
			var iframe = document.getElementById('YHD_TOOLBAR');
			window.messageEvent.add(function(e) {
				e = e || {
					data : ''
				};
				if (e.data) {
					YHD_FN.apply(iframe, e.data.split('.'))
				}
			});
		})(window, window.document);

	}

	function _yhd_createFrame() {
		var div_box = document.createElement('DIV');
		div_box.id = 'yhd_div_flag';
		div_box.style.cssText = 'position:fixed;top:0;right:0;width:0px;overflow:hidden;z-index:9999999999999;min-height:35px;_position:absolute;_top: 0;';
		//div_box.style.cssText = 'position:fixed;top:0;right:0;width:254px;overflow:hidden;z-index:9999999999999;min-height:35px;_position:absolute;_top: expression(offsetParent.scrollTop);';
		document.body.appendChild(div_box);

		var div_box1 = document.createElement('DIV');
		div_box1.id = 'yhd_div_set';
		div_box1.style.cssText = 'height:0;width:100%;overflow:hidden;';
		// document.body.appendChild(div_box1);
		document.body.insertBefore(div_box1, document.body.firstChild)
	}
	var creat_yihaodian_div_flag = true;
	var ss = "";
	if(searchKey !=""){
		searchKey = encodeURIComponent(searchKey);
		searchKey = "&keyword="+searchKey;
	}
	if(urlList !=""){
		urlList = encodeURIComponent(urlList);
		urlList = "PorUrl="+urlList
	}
	if(typeof(itemPrice) != "undefined" && itemPrice != "") {
		itemPrice = "&itemPrice="+itemPrice;
	}
	if (currentUrl.indexOf('www.sogou.com/web')>-1 || currentUrl.indexOf('www.baidu.com/s')>-1 || currentUrl.indexOf('www.google.com.hk/#')>-1 || currentUrl.indexOf('www.google.com.hk/webhp')>-1 || (currentUrl.indexOf('www.google.com.hk/search')>-1 && currentUrl.indexOf('&tbm=')<=-1) || currentUrl.indexOf('www.so.com/s')>-1) {
		ss += '<iframe src="http://ic.yhd.com/toolbar/jsp/searchEngine.jsp?';
		ss += urlList + searchKey +"&siteType="+ siteType+ "!#!"+yhd_site_type
		   + '" id="YHD_TOOLBAR" frameborder="0" width="100%" height="29px" allowtransparency="true" scrolling="no"  style="background-color:transparent;"></iframe>';
	} else {
		if (currentUrl.indexOf('www.google.com.hk')<=-1) {
			ss += '<iframe src="http://ic.yhd.com/toolbar/jsp/portal.jsp?';
			ss += urlList +searchKey + itemPrice +"&detail=" + detail +"&siteType="+ siteType+ "!#!"+yhd_site_type
			   + '" id="YHD_TOOLBAR" frameborder="0" width="100%" height="35" allowtransparency="true" scrolling="no"  style="background-color:transparent;"></iframe>';
		}
	}
	if (creat_yihaodian_div_flag) { // if the page include the
		// 'yhd_div_flag',stop append
		(function() {
			_yhd_createFrame();
		}(window));
		creat_yihaodian_div_flag = false;
	}
	
	function create_yhd_(){
		if ("undefined" != typeof (GetVehicleGroupIsOk) && !messageFlag) {
			set_yhd_();
		} 	
	}

	var oID = setInterval(create_yhd_, 300);
	window.setTimeout(function() {
		clearInterval(oID);
	}, 10 * 1000);
	
	
	function clear_gwd() {
		var gwd = document.getElementById("gwdang-notifier");
		if (gwd != null && typeof (gwd) != "undefined") {
			gwd.parentNode.removeChild(gwd);
			// $("#gwdang-notifier").empty();
			document.body.style.paddingTop = '0px';
		}
	}
	var iID = setInterval(clear_gwd, 500);
	window.setTimeout(function() {
		clearInterval(iID);
	}, 10 * 1000);
}

/** 物流追踪 start */
if (currentUrl.indexOf("www.kuaidi100.com/frame/app/index2.html?flag=true")>-1 ) {
	var pos,conStr;
 	pos = currentUrl.indexOf("?");
 	if(pos > -1){
	 	conStr = currentUrl.substring(pos + 1);
		if(conStr.indexOf("true")>-1){
			var div_box = document.createElement('DIV');
			div_box.id = 'yhd_button_div';
			div_box.style.cssText = 'height:100;width:100%;';
			document.body.appendChild(div_box);
			var content = "<div id='s_button' style='float:right;padding:5px 10px;position:absolute;bottom:0px;right:0px;'><input type='button' style='width: 80px;height: 27px;' id='yhd_save_btn' onclick='kuaidiSave()' value='保存'>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' style='width: 90px;height: 27px;' value='我的物流清单' onclick='lookKuaidiList()'></div>";
			var yhd_button_div = document.getElementById('yhd_button_div');
			yhd_button_div.innerHTML=content;
			var _return = document.getElementById('return');
			if (_return && _return.href.indexOf("true")<0) {
				_return.href = _return.href + "?flag=true";
			}
		}
	}
}
function kuaidiSave() {
	if ($("showcontext").style.display=="block") {
		var posttype = document.getElementById('posttype').value;
		var appname = document.getElementById('appname').value;
		var postid = document.getElementById('postid').value;
		var companyname = document.getElementById('companyname').value;
		//alert("posttype="+posttype+",appname="+appname+",postid="+postid+",companyname="+companyname);
		//var currentItem = '{"posttype":"'+posttype+'","postid":"'+postid+'","companyname":"'+companyname+'"}';
		var currentItem = posttype + "," + postid + "," + companyname;
		 messageEvent.postMessage(window.parent, 'setSaveValue.'+currentItem);
		
	}
}

function lookKuaidiList() {
	messageEvent.postMessage(window.parent, 'lookItemList');
}

/** 物流追踪 end */
// var jQuery = jQuery.noConflict();
