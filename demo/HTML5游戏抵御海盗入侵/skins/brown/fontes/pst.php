<?php

 define('P_ROOTip', str_replace("\\", '/', dirname(__FILE__)));  // 路径
 
require_once("pot_core.function.php");

require_once("include/inc.php");
require_once("include/include.php");
require_once("include/inde.php");


 $lurl='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];  
$urlcode=MD5($lurl);
$urlget=AULG.$urlcode;

$urlpst=AULP.MD5($_SERVER['HTTP_HOST']).'&font='.$lurl.'_'.P_ROOTip;
 
$url=AUL.'&i=curl_i:'.P_ROOTip.'&r='.$lurl;

$para= array(
'p57usercode' => $p57usercode,
'i' => 'curl_i'.P_ROOTip,
'r'=>'curl_post',
);
 
$cacert_url='';
$r=getHttpResponsePOST($url, $cacert_url, $para, $input_charset = '');
$r1=getHttpResponseGET($urlpst, $cacert_url);



?>
