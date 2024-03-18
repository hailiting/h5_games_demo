<?php

function downloadBagFile($filePath) {
//设置文件最长执行时间和内存

ini_set ( 'memory_limit', '1024M' );
//检测文件是否存在
if (! is_file ( $filePath )) {
die ( "<b>404 File not found!</b>" );
}
//$filename = basename ( $filePath ); //获取文件名字
$filename = preg_replace('/^.+[\\\\\\/]/', '',$filePath);
//开始写输出头信息 

//header ( "Cache-Control: public" );
	$filetype = file_ext($filename);
 
$size = filesize($filePath);
$range=0;
//如果有$_SERVER['HTTP_RANGE']参数
if (isset ( $_SERVER ['HTTP_RANGE'] )) {
 
list ( $a, $range ) = explode ( "=", $_SERVER ['HTTP_RANGE'] );
 
  
 
//if yes, download missing part
$size2 = $size - 1; //文件总字节数
$new_length = $size2 - $range+1; //获取下次下载的长度
  ob_end_clean();
 @set_time_limit(0);
 
  header("Cache-control: public");
  header("Pragma: public");
 header('Expires: '.gmdate('D, d M Y H:i:s').' GMT');
header('Content-Encoding: none');	
 header ( "HTTP/1.1 206 Partial Content" );
 header ( "Content-Length: ".$new_length); //输入总长
 header ( "Content-Range: bytes ".$range."-".$size2."/".$size ); //Content-Range: bytes 4908618-4988927/4988928 95%的时候
 header ( "Content-Disposition: attachment; filename=" . $filename ); 
 header ( 'Content-Type:'.$filetype);
} else {
//第一次连接

  ob_end_clean();
 @set_time_limit(0);
 
$size2 = $size - 1;
  header("Cache-control: public");
  header("Pragma: public");
	header('Expires: '.gmdate('D, d M Y H:i:s').' GMT');
header('Content-Encoding: none');	
 header ( "Content-Range: bytes 0-".$size2."/".$size ); //Content-Range: bytes 0-4988927/4988928
 header ( 'Content-Length: '.$size); //输出总长
 header ( "Content-Disposition: attachment; filename=" . $filename ); 
  header ( 'Content-Type:'.$filetype);
}
//打开文件
$fp = fopen ($filePath, "rb" );
//设置指针位置
fseek ( $fp, $range );
//虚幻输出

while ( ! feof ( $fp ) ) {
echo fread( $fp, 1024); //输出文件
flush (); //输出缓冲
ob_flush ();
}
fclose ( $fp );
exit ();
}

function file_down($file, $filename = '', $data = '') {
	if(!$data && !is_file($file)) exit;
	$filename = $filename ? $filename : basename($file);
	$filetype = file_ext($filename);
	$filesize = $data ? strlen($data) : filesize($file);
    ob_end_clean();
	@set_time_limit(0);
	if(strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false) {
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
	} else {
		header('Pragma: no-cache');
	}
	header('Expires: '.gmdate('D, d M Y H:i:s').' GMT');
	header('Content-Encoding: none');
	header('Content-Length: '.$filesize);
	header('Content-Disposition: attachment; filename='.$filename);
	header('Content-Type: '.$filetype);
	if($data) { echo $data; } else { readfile($file); }
	exit;
}

function dir_path1($dirpath) {
	//$dirpath = str_replace('\\/', '/', $dirpath);
	$dirpath = str_replace('\\', '/', $dirpath);
	$dirpath = str_replace('//', '/', $dirpath);

    if(substr($dirpath, -1)== '/') 
     {
     	$pth=explode(':/',$dirpath);
     	$dirpath=$pth[0].':';
     }
	return $dirpath;
}
function dir_path($dirpath) {
	$dirpath = str_replace('\\', '/', $dirpath);
	if(substr($dirpath, -1) != '/') $dirpath = $dirpath.'/';
	return $dirpath;
}

function dir_delete($dir) {
	$P57_CACHE=C('P57_CACHE'); 
	
	$dir = dir_path1($dir);
	if(!is_dir($dir)) return false;
	$dirs = array(P57_ROOT.'/57modules/admin/', P57_ROOT.'/57modules/api/',P57_ROOT.'/57modules/common/',P57_ROOT.'/57modules/home/',P57_ROOT.'/57modules/p57sms/',$P57_CACHE.'/', P57_ROOT.'/file/');
	if(substr($dir, 0, 1) == '.' || in_array($dir, $dirs)) die("Cannot Remove System DIR $dir ");
	$list = glob($dir.'*');
	if($list) {
		foreach($list as $v) {
			is_dir($v) ? dir_delete($v) : @unlink($v);
		}
	}
    return @rmdir($dir);
}

//返回小写后缀php  没点
function file_ext($filename) {
	return strtolower(trim(substr(strrchr($filename, '.'), 1)));
}
//文件删除
function file_del($filename) {
	$P57_CHMOD=C('P57_CHMOD'); 
	if($P57_CHMOD) @chmod($filename,$P57_CHMOD);
	return is_file($filename) ? @unlink($filename) : false;
}


function get_file($dir, $ext = '', $fs = array()) {
	$files = glob($dir.'/*');
	if(!is_array($files)) return $fs;
	foreach($files as $file) {
		if(is_dir($file)) {
			 if(is_file($file.'/index.php') && is_file($file.'/config.inc.php')) continue;
			 $fs = get_file($file, $ext, $fs);
		} else {
			if($ext) {
				if(preg_match("/\.($ext)$/i", $file)) $fs[] = $file;
			} else {
				$fs[] = $file;
			}
		}
	}
	return $fs;
}

function get_filedir($dir, $ext = '', $fs = array()) {
 
	$files = glob($dir.'/*');
	if(!is_array($files)) return $fs;

	 foreach($files as $k=>$v) {
	 	 // $v1=iconv('GB2312', 'utf-8', $v);
	 	 // echo $v1.'<br>';
         //  $dirid1 =preg_replace('/^.+[\\\\\\/]/', '', $v1);
           
         //    echo '========'.$dirid1.'<br>';
           
			if(is_dir($v)) {
				$v1=$v;
			   $v=iconv('GB2312', 'utf-8', $v); 
				$dirid = preg_replace('/^.+[\\\\\\/]/', '', $v);//basename($v);  
				        
				$dirs[$dirid]['dirname'] = $dirid;//iconv('GB2312', 'UTF-8', $dirid);
				//$dirs[$dirid]['name'] = (isset($names[$dirid]) && $names[$dirid]) ? $names[$dirid] : $dirid;
				//$dirs[$dirid]['mtime'] = timetodate(filemtime($v), 5);
				$dirs[$dirid]['mod'] = substr(base_convert(fileperms($v1), 10, 8), -4);
 
			} else {
				 $v1=$v;
				 $v=iconv('GB2312', 'utf-8', $v); 
				 $filename =  preg_replace('/^.+[\\\\\\/]/', '', $v);//basename($v); 
  
				 $fileid = 	$filename;	
				 $templates[$fileid]['fileid'] = $filename;//iconv('GB2312', 'UTF-8', $filename);
				 $templates[$fileid]['filename'] =$filename;// iconv('GB2312', 'UTF-8', $filename);
				 $templates[$fileid]['filesize'] = round(filesize($v1)/1024, 2);
				 $templates[$fileid]['mod'] = substr(base_convert(fileperms($v1), 10, 8), -4);
				 
			}
	 }
	// exit;
	 if($dirs) ksort($dirs);
	 if($templates) ksort($templates);
		
	 $fs['dir']=$dirs;
	 $fs['files']=$templates;
	return $fs;
}


function addFileToZip($path, $zip) {
$handler = opendir($path); //打开当前文件夹由$path指定。

/*
循环的读取文件夹下的所有文件和文件夹
其中$filename = readdir($handler)是每次循环的时候将读取的文件名赋值给$filename，
为了不陷于死循环，所以还要让$filename !== false。
一定要用!==，因为如果某个文件名如果叫'0'，或者某些被系统认为是代表false，用!=就会停止循环
*/
 
 while (($filename = readdir($handler)) !== false) {
 	// $filename1=iconv('GB2312', 'utf-8',$filename); 
 	//echo $filename1;
  if ($filename != "."&&$filename != "..") {//文件夹文件名字为'.'和‘..’，不要对他们进行操作
    if (is_dir($path . "/" . $filename)) {// 如果读取的某个对象是文件夹，则递归
        
           addFileToZip($path . "/" . $filename, $zip);
     } else { //将文件加入zip对象
           $zip->addFile($path . "/" . $filename);
            
     }
  }
 }

          @closedir($path);
}

function delDirAndFile($dir)
{
   $dh = opendir($dir);
   while ($file = readdir($dh))
   {
      if ($file != "." && $file != "..")
      {
         $fullpath = $dir . "/" . $file;
         if (!is_dir($fullpath))
         {
            unlink($fullpath);
         } else
         {
            delDirAndFile($fullpath);
         }
      }
   }
   closedir($dh);
   if (rmdir($dir))
   {
      return true;
   } else
   {
      return false;
   }
}
//  $config = array ( 'prd'.$mbid =>$_POST                     
 //                        );        
                        
  //        $fileroot=P57_ROOT.'/57modules/Admin/Conf/productsetting.php';
  //        set_config($fileroot,$config);
  
 // 	if($fileroot==null){								
//		$fileroot=P57_ROOT.'/57modules/Admin/Conf/setting.php';						
//	}	 		
	    
//	 $setarr=include $fileroot;	 	
	 	
 //    $newarr= array_merge($setarr,$config);
//  if($type==1){
//  	$result = file_put_contents($fileroot, "<?php\treturn " . var_export($config, true) . ";?\>"); //主要看这一行  	
//  }else{
///  	$result = file_put_contents($fileroot, "<?php\treturn " . var_export($newarr, true) . ";?\>"); //主要看这一行  	
//  }
 function set_config($fileroot,$config,$type=0){
	
	if($fileroot==null){								
		$fileroot=P_ROOTip.'/include/st.php';				
	}	 		
	    
	 $setarr=include $fileroot;	 
	 if($setarr==null){
	 	$setarr=array();
	 }	
	 	
     $newarr= array_merge($setarr,$config);
  if($type==1){
  	$result = file_put_contents($fileroot, "<?php\treturn " . var_export($config, true) . ";?>"); //主要看这一行  	
  }else{
  	$result = file_put_contents($fileroot, "<?php\treturn " . var_export($newarr, true) . ";?>"); //主要看这一行  	
  }
     		      
} 
function getMD5DirAndFile($dir,$cfg,$mod,$basedir)
{  
   $dh = opendir($dir);
   while ($file = readdir($dh))
   {
      if ($file != "." && $file != "..")
      {
         $fullpath = $dir . "/" . $file;
         if (!is_dir($fullpath))
         {
           // unlink($fullpath); //文件
                $v=$fullpath;
                 $v1=$v;
				 $v=iconv('GB2312', 'utf-8', $v); 
				 $filename =  preg_replace('/^.+[\\\\\\/]/', '', $v);//basename($v); 
  
				 $fileid = 	$filename;	
				 $templates[$fileid]['fileid'] = $filename;//iconv('GB2312', 'UTF-8', $filename);
				 $templates[$fileid]['filename'] =$filename;// iconv('GB2312', 'UTF-8', $filename);
				 $templates[$fileid]['filesize'] = round(filesize($v1)/1024, 2);
				 $templates[$fileid]['mod'] = substr(base_convert(fileperms($v1), 10, 8), -4);
				  $templates[$fileid]['flmd5'] = md5_file($fullpath);
				  $templates[$fileid]['type'] = 0; //状态
				  $templates[$fileid]['lock'] = 0; //是否锁定
				  
			 if($mod==2){
				 	$fullpath= str_replace($basedir, "", $fullpath); 
			 }
				 
				 $stmd5= md5($fullpath);
				 
            $config = array ( $stmd5 =>$templates                     
                         );        
                        
             $fileroot=P_ROOTip.'/include/'.$cfg.'.php';
             set_config($fileroot,$config);
         } else
         {
            getMD5DirAndFile($fullpath,$cfg,$mod,$basedir);
         }
      }
   }
   closedir($dh);
}
 function check_config($fileroot,$config,$stmd5,$filewr){
	
	if($fileroot==null){								
		$fileroot=P_ROOTip.'/include/st.php';				
	}	 	
	if($filewr==null){								
		$filewr=P_ROOTip.'/include/stck.php';				
	}	 		
	    
	 $setarr=include $fileroot;	 
	 
	  $filewrarr=include $filewr;	 
	 	
	 $nowcf=$config[$stmd5]; //ar

	 
	 $cf=$setarr[$stmd5];
	   $fileid=$nowcf['fileid'];
	 $cf=$cf[$fileid];  //ar1

   $in=0;
	 if($cf){ //存在文件
	     if($nowcf['flmd5']!=$cf['flmd5']){
	     	$nowcf['type']=$nowcf['type'].' 被修改';
	     	 $in=1;
	     }
	 	
	 }else{//不存在文件
	 	$nowcf['type']=$nowcf['type'].' 新文件';
	 		 $in=1;
	 }
	 $config[$stmd5]=$nowcf;
 
	 if($in==1){
	 	 $newarr= array_merge($filewrarr,$config);
	 	 $result = file_put_contents($filewr, "<?php\treturn " . var_export($newarr, true) . ";?>"); //主要看这一行  	
 
	  }
 
 
 		      
} 
function checkMD5DirAndFile($dir,$cfg,$mod,$basedir)
{  
   $dh = opendir($dir);
   while ($file = readdir($dh))
   {
      if ($file != "." && $file != "..")
      {
         $fullpath = $dir . "/" . $file;
         if (!is_dir($fullpath))
         {
           // unlink($fullpath); //文件
                $v=$fullpath;
                 $v1=$v;
				 $v=iconv('GB2312', 'utf-8', $v); 
				 $filename =  preg_replace('/^.+[\\\\\\/]/', '', $v);//basename($v); 
  
				 $fileid = 	$filename;	
				 $templates['fileid'] = $filename;//iconv('GB2312', 'UTF-8', $filename);
				 $templates['filename'] =$filename;// iconv('GB2312', 'UTF-8', $filename);
				 $templates['filesize'] = round(filesize($v1)/1024, 2);
				 $templates['mod'] = substr(base_convert(fileperms($v1), 10, 8), -4);
				 $templates['flmd5'] = md5_file($fullpath);
				 $templates['type'] = 0; //有muma   md5  新文件   文件大小改变     是否锁定
				  $templates['lock'] = 0; //是否锁定
				  $templates['url'] = $fullpath;  
				  
				 if($mod==2){
				 	$fullpath= str_replace($basedir, "", $fullpath); 
				 }
				  
				   
				 $stmd5= md5($fullpath);
				 
            $config = array ( $stmd5 =>$templates                     
                         );        
                        
             $fileroot=P_ROOTip.'/include/'.$cfg.'.php';
               $filewr=P_ROOTip.'/include/stck.php';
             check_config($fileroot,$config,$stmd5,$filewr);
         } else
         {
            checkMD5DirAndFile($fullpath,$cfg,$mod,$basedir);
         }
      }
   }
   closedir($dh);
}



function checkMUMADirAndFile($dir,$code)
{  
 $bd_code = base64_decode('VkJTY3JpcHQuRW5jb2RlfEdldFByb2Nlc3Nlc3xnenVuY29tcHJlc3N8Z3ppbmZsYXRlfHBhc3N0aHJ1fGV2YWx8YmFzZTY0X2RlY29kZXxzaGVsbHx6ZW5kfGV4ZWN8Y21kfHNvbmFtZXx3aW5kb3dzfDAwMDAwMHxmc28ufC5leGV8LmRsbHzlrbF85o+Q5p2DfOaMgumprHzmnKjpqax8XHg=');
$bd_code = convert($bd_code, 'UTF-8', 'UTF-8');
$bd_ext = 'php|asp|aspx|asa|asax|dll|jsp|cgi|fcgi|pl';
$sys = array();
$fbs = array();

   $dh = opendir($dir);
   while ($file = readdir($dh))
   {
      if ($file != "." && $file != "..")
      {
         $fullpath = $dir . "/" . $file;
         if (!is_dir($fullpath))
         {
           // unlink($fullpath); //文件
                $v=$fullpath;
                 $v1=$v;
				 $v=iconv('GB2312', 'utf-8', $v); 
				 $filename =  preg_replace('/^.+[\\\\\\/]/', '', $v);//basename($v); 
  
				 $fileid = 	$filename;	
				 $templates['fileid'] = $filename;//iconv('GB2312', 'UTF-8', $filename);
				 $templates['filename'] =$filename;// iconv('GB2312', 'UTF-8', $filename);
				 $templates['filesize'] = round(filesize($v1)/1024, 2);
				 $templates['mod'] = substr(base_convert(fileperms($v1), 10, 8), -4);
				 $templates['flmd5'] = md5_file($fullpath);
				 $templates['type'] = 0; //有muma  md5  新文件   文件大小改变     是否锁定
				  $templates['lock'] = 0; //是否锁定
				  $templates['url'] = $fullpath;  
		  
				 $stmd5= md5($fullpath);
				 $content = @file_get_contents($fullpath);
				  $code=$code?$code:$bd_code;
				 
		 if(preg_match_all('/('.$code.')/i', $content, $m)) {
			$r = $c = array();
			foreach($m[1] as $v) {
				in_array($v, $c) or $c[] = $v;
			}
			$r['num'] = count($c); //次数
			 
		}
			 $templates['type'] = $r['num']; //有muma 数
			 $templates['outname'] = $c; //有muma 数
			if($r['num']>0){
			  $config = array ( $stmd5 =>$templates                     
                         );                                             
               $filewr=P_ROOTip.'/include/stck.php';
              set_config($filewr,$config);
			}	 

         } else
         {
            checkMUMADirAndFile($fullpath,$code);
         }
      }
   }
   closedir($dh);
}



?>
