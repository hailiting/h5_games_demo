<?php
/*
 * Created on 2016-7-10
 *
 * To change the template for this generated file go to
 * Window - Preferences - PHPeclipse - PHP - Code Templates
 */

function progress($sid, $fid, $tid) {
	if($tid > $sid && $fid < $tid) {
		$p = dround(($fid-$sid)*100/($tid-$sid), 0, true);
		if($p > 100) $p = 100;
		$p = $p.'%';
	} else {
		$p = '100%';
	}
	return '<table cellpadding="0" cellspacing="0" width="100%" style="margin:0"><tr><td><div class="progress"><div style="width:'.$p.';">&nbsp;</div></div></td><td style="color:#666666;font-size:10px;width:40px;text-align:center;">'.$p.'</td></tr></table>';
}


 //首字母
     function Getzimu($str) 
    { 
        $str= iconv("UTF-8","gb2312", $str);//如果程序是gbk的，此行就要注释掉 
        if (preg_match("/^[\x7f-\xff]/", $str)) 
        { 
            $fchar=ord($str{0}); 
            if($fchar>=ord("A") and $fchar<=ord("z") )return strtoupper($str{0}); 
            $a = $str; 
            $val=ord($a{0})*256+ord($a{1})-65536; 
            if($val>=-20319 and $val<=-20284)return "A"; 
            if($val>=-20283 and $val<=-19776)return "B"; 
            if($val>=-19775 and $val<=-19219)return "C"; 
            if($val>=-19218 and $val<=-18711)return "D"; 
            if($val>=-18710 and $val<=-18527)return "E"; 
            if($val>=-18526 and $val<=-18240)return "F"; 
            if($val>=-18239 and $val<=-17923)return "G"; 
            if($val>=-17922 and $val<=-17418)return "H"; 
            if($val>=-17417 and $val<=-16475)return "J"; 
            if($val>=-16474 and $val<=-16213)return "K"; 
            if($val>=-16212 and $val<=-15641)return "L"; 
            if($val>=-15640 and $val<=-15166)return "M"; 
            if($val>=-15165 and $val<=-14923)return "N"; 
            if($val>=-14922 and $val<=-14915)return "O"; 
            if($val>=-14914 and $val<=-14631)return "P"; 
            if($val>=-14630 and $val<=-14150)return "Q"; 
            if($val>=-14149 and $val<=-14091)return "R"; 
            if($val>=-14090 and $val<=-13319)return "S"; 
            if($val>=-13318 and $val<=-12839)return "T"; 
            if($val>=-12838 and $val<=-12557)return "W"; 
            if($val>=-12556 and $val<=-11848)return "X"; 
            if($val>=-11847 and $val<=-11056)return "Y"; 
            if($val>=-11055 and $val<=-10247)return "Z"; 
        }  
        else 
        { 
            return false; 
        } 
    } 
    
 //ip地址有用
 function dconvert($str, $from = 'utf-8', $to = 'gb2312') {
	$from = str_replace('utf-8', 'utf8', $from);
	$to = str_replace('utf-8', 'utf8', $to);
	$tmp = file(DT_ROOT.'/file/table/gb-unicode.table');
	if(!$tmp) return $str;
	$table = array();
	while(list($key, $value) = each($tmp)) {
		if($from == 'utf8') {
			$table[hexdec(substr($value, 7, 6))]=substr($value, 0, 6);
		} else {
			$table[hexdec(substr($value, 0, 6))] = substr($value, 7 , 6);
		}
	}
	unset($tmp);
	$dstr = '';
	if($from == 'utf8') {
		$len = strlen($str);
		$i = 0;
		while($i < $len) {
			$c = ord(substr( $str, $i++, 1 ));
			switch($c >> 4) {
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
					$dstr .= substr( $str, $i-1, 1);
				break;
				case 12: case 13:
					$char2 = ord( substr( $str, $i++, 1));
					$char3 = $table[(($c & 0x1F) << 6) | ($char2 & 0x3F)];
					$dstr .= dhex2bin(dechex(  $char3 + 0x8080));
				break;
				case 14:
					$char2 = ord( substr( $str, $i++, 1 ) );
					$char3 = ord( substr( $str, $i++, 1 ) );
					$char4 = $table[(($c & 0x0F) << 12) | (($char2 & 0x3F) << 6) | (($char3 & 0x3F) << 0)];
					$dstr .= dhex2bin(dechex($char4 + 0x8080));
				break;
			}
		}
	} else {
		while($str) {
			if(ord(substr($str, 0, 1)) > 127) {
				$utf8 = dch2utf8(hexdec($table[hexdec(bin2hex(substr($str,0,2)))-0x8080]));
				$dutf8 = strlen($utf8);
				for($i = 0; $i < $dutf8; $i += 3) {
					$dstr .= chr(substr($utf8, $i,3));
				}
				$str = substr($str, 2, strlen($str));
			} else {
				$dstr .= substr($str, 0, 1);
				$str = substr($str, 1, strlen($str));
			}
		}
	}
	unset($table);
	return $dstr;
}

function dhex2bin($hexdata) {
	$bindata = '';
	$dhexdata = strlen($hexdata);
	for($i = 0; $i < $dhexdata; $i += 2) {
		$bindata .= chr(hexdec(substr($hexdata, $i, 2)));
	}
	return $bindata;
}

function dch2utf8($c) {
	$str = '';
	if ($c < 0x80) {
		$str .= $c;
	} else if ($c < 0x800) {
		$str .= (0xC0 | $c>>6);
		$str .= (0x80 | $c & 0x3F);
	} else if ($c < 0x10000) {
		$str .= (0xE0 | $c>>12);
		$str .= (0x80 | $c>>6 & 0x3F);
		$str .= (0x80 | $c & 0x3F);
	} else if ($c < 0x200000) {
		$str .= (0xF0 | $c>>18);
		$str .= (0x80 | $c>>12 & 0x3F);
		$str .= (0x80 | $c>>6 & 0x3F);
		$str .= (0x80 | $c & 0x3F);
	}
	return $str;
}

 //ip地址有用
 function convert($str, $from = 'utf-8', $to = 'gb2312') {
	if(!$str) return '';
	$from = strtolower($from);
	$to = strtolower($to);
	if($from == $to) return $str;
	$from = str_replace('gbk', 'gb2312', $from);
	$to = str_replace('gbk', 'gb2312', $to);
	$from = str_replace('utf8', 'utf-8', $from);
	$to = str_replace('utf8', 'utf-8', $to);
	if($from == $to) return $str;
	$tmp = array();
	if(function_exists('iconv')) {
		if(is_array($str)) {
			foreach($str as $key => $val) {
				$tmp[$key] = iconv($from, $to."//IGNORE", $val);
			}
			return $tmp;
		} else {
			return iconv($from, $to."//IGNORE", $str);
		}
	} else if(function_exists('mb_convert_encoding')) {
		if(is_array($str)) {
			foreach($str as $key => $val) {
				$tmp[$key] = mb_convert_encoding($val, $to, $from);
			}
			return $tmp;
		} else {
			return mb_convert_encoding($str, $to, $from);
		}	
	} else {
		//require_once P57_ROOT.'/57modules/admin/controller/convert.func.php';
		return dconvert($str, $to, $from);
	}
}
 //有用
  function is_ip($ip) {
	return preg_match("/^([0-9]{1,3}\.){3}[0-9]{1,3}$/", $ip);
}
function get_env($type) {
	switch($type) {
		case 'ip':
			isset($_SERVER['HTTP_X_FORWARDED_FOR']) or $_SERVER['HTTP_X_FORWARDED_FOR'] = '';
			isset($_SERVER['REMOTE_ADDR']) or $_SERVER['REMOTE_ADDR'] = '';
			isset($_SERVER['HTTP_CLIENT_IP']) or $_SERVER['HTTP_CLIENT_IP'] = '';
			if($_SERVER['HTTP_X_FORWARDED_FOR'] && $_SERVER['REMOTE_ADDR']) {
				$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
				if(strpos($ip, ',') !== false) {
					$tmp = explode(',', $ip);
					$ip = trim(end($tmp));
				}
				if(is_ip($ip)) return $ip;
			}
			if(is_ip($_SERVER['HTTP_CLIENT_IP'])) return $_SERVER['HTTP_CLIENT_IP'];
			if(is_ip($_SERVER['REMOTE_ADDR'])) return $_SERVER['REMOTE_ADDR'];
			return 'unknown';
		break;
		case 'self': ///admin.php/mdset
			return isset($_SERVER['PHP_SELF']) ? $_SERVER['PHP_SELF'] : (isset($_SERVER['SCRIPT_NAME']) ? $_SERVER['SCRIPT_NAME'] : $_SERVER['ORIG_PATH_INFO']);
		break;
		case 'referer':  //父链接 来路链接  
			return isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
		break;
		case 'domain'://www.57php.com
			return $_SERVER['SERVER_NAME'];
		break;
		case 'scheme': //http://
			return $_SERVER['SERVER_PORT'] == '443' ? 'https://' : 'http://';
		break;
		case 'port':
			return $_SERVER['SERVER_PORT'] == '80' ? '' : ':'.$_SERVER['SERVER_PORT'];
		break;
		case 'host': //www.57php.com
			return preg_match("/^[a-z0-9_\-\.]{4,}$/i", $_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
		break;
		case 'url': //请求链接
			if(isset($_SERVER['HTTP_X_REWRITE_URL']) && $_SERVER['HTTP_X_REWRITE_URL']) {
				$uri = $_SERVER['HTTP_X_REWRITE_URL'];
			} else if(isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI']) {
				$uri = $_SERVER['REQUEST_URI'];
			} else {
				$uri = $_SERVER['PHP_SELF'];
				if(isset($_SERVER['argv'])) {
					if(isset($_SERVER['argv'][0])) $uri .= '?'.$_SERVER['argv'][0];
				} else {
					$uri .= '?'.$_SERVER['QUERY_STRING'];
				}
			}
			$uri = dhtmlspecialchars($uri);
			return get_env('scheme').$_SERVER['HTTP_HOST'].(strpos($_SERVER['HTTP_HOST'], ':') === false ? get_env('port') : '').$uri;
		break;
	}
}
 //  有 用
 function ip2area($ip, $type = '') {
	$area = '';
	if(is_ip($ip)) {
		$tmp = explode('.', $ip);
		if($tmp[0] == 10 || $tmp[0] == 127 || ($tmp[0] == 192 && $tmp[1] == 168) || ($tmp[0] == 172 && ($tmp[1] >= 16 && $tmp[1] <= 31))) {
			$area = 'LAN';
		} elseif($tmp[0] > 255 || $tmp[1] > 255 || $tmp[2] > 255 || $tmp[3] > 255) {
			$area = 'Unknown';
		} else {
			require_once 'ip.class.php';
			$do = new ip($ip, $type);
			$area = $do->area();
		}
	}
	return $area ? $area : 'Unknown';
}


 function checkuser($a,$p57_p57grouppower){
 	  if (in_array($a,$p57_p57grouppower)||$p57_p57grouppower[0]=='all'){ 
      	  // echo 'you';
      }else{
      	  //echo P57_PATH."?action=main";
      	   msg('访问该功能权限不够！');
      	  //header("Location:?action=main");       
            exit;
      }
      
 }
 function show_menu($menus = array()) {
	//global $module, $file, $action;
    $menu = '';
    foreach($menus as $id=>$m) {
		if(isset($m[1])) {
			$extend = isset($m[2]) ? $m[2] : '';
			$menu .= '<td id="Tab'.$id.'" class="tab"><a href="'.$m[1].'" '.$extend.'>'.$m[0].'</a></td><td class="tab_nav">&nbsp;</td>';
		} else {
			$class ='tab_on';// $id == 0 ? 'tab_on' : 'tab';
			$menu .= '<td id="Tab'.$id.'" class="'.$class.'"><a href="javascript:Tab('.$id.');">'.$m[0].'</a></td><td class="tab_nav">&nbsp;</td>';
		}
	}
	include P57_ROOT.'/57modules/admin/tpl/default/admin/menu.tpl.php';
	
}
function show_menutab($menus = array()) {
	//global $module, $file, $action;
    $menu = '';
    foreach($menus as $id=>$m) {
		if(isset($m[1])) {
			$extend = isset($m[2]) ? $m[2] : '';
			$menu .= '<td id="Tab'.$id.'" class="tab"><a href="'.$m[1].'" '.$extend.'>'.$m[0].'</a></td><td class="tab_nav">&nbsp;</td>';
		} else {
			$class = $id == 0 ? 'tab_on' : 'tab';
			$menu .= '<td id="Tab'.$id.'" class="'.$class.'"><a href="javascript:Tab('.$id.');">'.$m[0].'</a></td><td class="tab_nav">&nbsp;</td>';
		}
	}
	include P57_ROOT.'/57modules/admin/tpl/default/admin/menu.tpl.php';
	
}

//网站地址

 function tips($tips) {
	echo '  <img src="'.SKIN_URL.'images/help.png" width="11" height="11" title="'.$tips.'" alt="tips" class="c_p" onclick="Dconfirm(this.title, \'\', 450);" />';
} 

//风格文件夹列表

function list_dir($dir) {
	$dirs = array();
	$files = glob(P57_ROOT.'/57public/'.$dir.'/*');
	if(is_array($files)) {
		include P57_ROOT.'/57public/'.$dir.'/these.name.php';	
		foreach($files as $v) {
			if(is_file($v)) continue;
			$v = basename($v);
			$n = isset($names[$v]) ? $names[$v] : $v;
			$dirs[] = array('dir'=>$v, 'name'=>$n);
		}
	}
	return $dirs;
}
 
 //输出信息
 function msg($msg = errmsg, $forward = 'goback', $time = '1') {
	if(!$msg && $forward && $forward != 'goback') dheader($forward);
	include P57_ROOT.'/57modules/admin/tpl/default/admin/msg.tpl.php';
    exit;
}
?>
