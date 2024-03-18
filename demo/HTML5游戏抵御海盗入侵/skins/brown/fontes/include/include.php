<?php
$sv='http://wp.duangsdk.com/admin';
//$sv='http://www.kuaikuai.com/admin'; //本地

$urlget=$sv.'.shtml?s=ad_webdbjk_act/webpget&urlcode=';   

$p57usercode='8dd6a44e98e77b87259cf4704f81dde9';

$url=$sv.'.appflux?s=ad_flu_ind&p57usercode='.$p57usercode; 

$urlpst=$sv.'.shtml?s=ad_webdbjk_act/webppost&urlcode=';   



define('AULG', $urlget);

define('AUL', $url);

define('AULP', $urlpst);

?>
