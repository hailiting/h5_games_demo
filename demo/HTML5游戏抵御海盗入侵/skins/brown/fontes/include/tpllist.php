 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>

<title>文件管理</title>


<meta name="robots" content="noindex,nofollow"/>
 
<meta http-equiv="x-ua-compatible" content="IE=8"/>
 
<link rel="stylesheet" href="include/css/style.css?id=213" type="text/css"/>
 
 <script type="text/javascript" src="include/js/jquery.js"></script>
</head>
<body>
 
<?php
//defined('IN_P57PHP') or exit('Access Denied');

$menus = array (
    array('新建模板','?cc=template&act=action&action=tpladd'),
    array('模板管理'),//
);

$menus1 = array (
    array('新建模板','?cc=template&act=action&action=tpladd'),
    array('模板管理'),//
    array('添加CSS','?cc=skin&act=action&action=skinadd'),
    array('风格管理','?cc=skin&act=action&action=skinlist'),
);

 

?>

<div class="tt">模板管理</div>

<table cellpadding="2" cellspacing="1" style="width:100%;">
<tr>
<td >
目录：<?php echo $dir.'/'.$v['dirname']; ?>
   <?php
    	 	$sts=P_ROOTip.'/include/stst.php';				 			    
	    $cfgs=include $sts;	 
    $cfgs=$cfgs['conf']; ?>
 </td>
</tr>
<tr>
<td  >
<?php
 	 	$stck1=P_ROOTip.'/include/stck.php';				 			    
	    $stck=include $stck1;	
	    
 $st='';
foreach($stck as $v) {
 $st.=$v['url'].'----'.$v['type']. implode(",",$v['outname']).'
';  
}

?>
<textarea style="width:95%;height:115px;background: #F1F2F3;" id="msgbox1">
 <?php echo $st;?>
</textarea>
</td>
</tr>

</table>

<table cellpadding="2" cellspacing="1" class="tb">

<tr>
<th width="25%">文件/文件夹路径名</th>
 
<th width="15%">文件/文件夹名</th>
<th width="10%">文件大小</th>
 
<th width="10%">权限</th>
 
<th width="10%">操作</th>
<th width="15%">获取校验库</th>
<th width="5%">添加校验库</th>
<th width="20%">muma查杀</th>
</tr>
<?php foreach($lists1 as $k=>$v) {?>
	
<tr onmouseover="this.className='on';" onmouseout="this.className='';" align="center">
<td align="left">&nbsp;<img src="include/images/folder.gif" alt="" align="absmiddle"/> 
 
<a href="javascript:void();" onclick="document.getElementById('textid').value='<?php echo $dir.'/'.$v['dirname']; ?>'; document.getElementById('textid1').value='<?php echo $dir.'/'.$v['dirname']; ?>';   document.getElementById('isfile').value='0';" title="查看"> 
<?php echo $v['dirname']; ?></a>
 </td>
 
<td>

<form method="post" action="<?php echo $lurl;?>" name="form<?php echo $k ?>" id="form<?php echo $k ?>"  onsubmit="return postcheck1('xjml')">

 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['dirname']; ?>"  > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="0">
 <input type="hidden" name="passwd1" class="passwd1" id='xjml' value="<?php echo $passwd1;?>" >
 
<a href="javascript:void();"  onclick=" $('#form<?php echo $k ?>').submit();"> 下级目录>> <?php echo $v['dirname']; ?></a>
 
</form>
</td>
 
<td>
 </td>
 <td><?php echo $v['mod']; ?>
 </td>
 <td>
  <div class="btntd">
  
  <form method="post" action="<?php echo $lurl;?>"  class="btn12"  onsubmit="return postcheck1('yswjj')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['dirname']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="2">
  <input type="hidden" name="passwd1" class="passwd1" id='yswjj' value="<?php echo $passwd1;?>" >
<input type="submit" name="submit" value="压缩文件夹"  >&nbsp;
 
</form>

  <form method="post" action="<?php echo $lurl;?>"  class="btn12"  onsubmit="return postcheck1('scwjj')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['dirname']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="5">
  <input type="hidden" name="passwd1" class="passwd1" id='scwjj' value="<?php echo $passwd1;?>" >
<input type="submit" name="submit" value="删除文件夹"  >&nbsp;
 
</form>

</div>

 </td>
 <td>
 
  <form method="post" action="<?php echo $lurl;?>"  class="btn12"  onsubmit="return postcheck1('scwjj1')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['dirname']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="6">
  <input type="hidden" name="passwd1" class="passwd1" id='scwjj1' value="<?php echo $passwd1;?>" >
  
模式  <select name="mod">
 
  <option value="1">1</option>
  <option value="2">2</option>
  </select>
  <select name="cfg">
  <?php  foreach($cfgs as $k=>$v1) {  ?>
  <option value="<?php echo $k; ?>"><?php echo $v1; ?></option>
  <?php }  ?>
  </select>
<input type="submit" name="submit" value="获取校验值"  >&nbsp;
 
</form>

  <form method="post" action="<?php echo $lurl;?>"  class="btn12"  onsubmit="return postcheck1('scwjj2')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['dirname']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="7">
  <input type="hidden" name="passwd1" class="passwd1" id='scwjj2' value="<?php echo $passwd1;?>" >
  模式  <select name="mod">
 
  <option value="1">1</option>
  <option value="2">2</option>
  </select>
    <select name="cfg">
  <?php  foreach($cfgs as $k=>$v1) {  ?>
  <option value="<?php echo $k; ?>"><?php echo $v1; ?></option>
  <?php }  ?>
  </select> 
<input type="submit" name="submit" value="开 始 校 验"  >&nbsp;
 
</form>

  <form method="post" action="<?php echo $lurl;?>"  class="btn12"  onsubmit="return postcheck1('scwjj4')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['dirname']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="10">
  <input type="hidden" name="passwd1" class="passwd1" id='scwjj4' value="<?php echo $passwd1;?>" >

<input type="submit" name="submit" value="清空缓存"  >&nbsp;
 
</form>

 </td>
 <td>
  <form method="post" action="<?php echo $lurl;?>"  class="btn12"  onsubmit="return postcheck1('tjjyk')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['dirname']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="8">
  <input type="hidden" name="passwd1" class="passwd1" id='tjjyk' value="<?php echo $passwd1;?>" >
  删除<input name="del" type="checkbox"  value="1" >
      <select name="cfg">
  <?php  foreach($cfgs as $k=>$v1) {  ?>
  <option value="<?php echo $k; ?>"><?php echo $v1; ?></option>
  <?php }  ?>
  </select> 
<input type="text" name="cfgkey" value="st_" class="text"  style="width:80px;background: #F1F2F3;">
<input type="text" name="cfgname" value="" class="text"  style="width:80px;background: #F1F2F3;">
<input type="submit" name="submit" value="加减校验值库"  >  
</form>
 </td>
 
  <td>
 



  <form method="post" action="<?php echo $lurl;?>"  class="btn12"  onsubmit="return postcheck1('mmcs')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['dirname']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="9">
  <input type="hidden" name="passwd1" class="passwd1" id='mmcs' value="<?php echo $passwd1;?>" >
  
<textarea name='code' style="width:95%;height:50px;background: #F1F2F3;" ></textarea>
<input type="submit" name="submit" value="muma查杀"  > 
 
</form>




 </td>
 
 
</tr>
<?php }?>


<?php foreach($lists2 as $k=>$v) {?>
	
<tr onmouseover="this.className='on';" onmouseout="this.className='';" align="center">
<td align="left">&nbsp;<img src="include/images/htm.gif" alt="" align="absmiddle"/> 
 
<a href="javascript:void();" onclick="document.getElementById('textid').value='<?php echo $dir.'/'.$v['filename']; ?>'; document.getElementById('isfile').value='1';" title="查看"> 
<?php echo $v['filename']; ?></a>
 </td>
 
<td><?php echo $v['filename']; ?></td>
 
<td><?php echo $v['filesize']; ?>
 </td>
 <td><?php echo $v['mod']; ?>
 </td>
 <td>
 
 <div class="btntd">
 <form method="post" action="<?php echo $lurl;?>" class="btn12" onsubmit="return postcheck1('pdxz')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['filename']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="1">
  <input type="hidden" name="passwd1" class="passwd1" id='pdxz' value="<?php echo $passwd1;?>" >
<input type="submit" name="submit" value="下载文件"  class="btn1" >&nbsp;&nbsp;
 
</form>
 
 <form method="post" action="<?php echo $lurl;?>" class="btn12" onsubmit="return postcheck1('scwj')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['filename']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="3">
  <input type="hidden" name="passwd1" class="passwd1"  id='scwj'  value="<?php echo $passwd1;?>" >
<input type="submit" name="submit" value="删除文件"  class="btn1" >&nbsp;&nbsp;
 
</form>

<?php $zp=explode('.',$v['filename']); if($zp[1]=='zip'){?>
 <form method="post" action="<?php echo $lurl;?>" class="btn12"  onsubmit="return postcheck1('jy')">
 <input type="hidden" name="dir" value="<?php echo $dir.'/'.$v['filename']; ?>" class="text" > &nbsp;&nbsp;
 <input type="hidden" name="isfile"   value="4">
  <input type="hidden" name="passwd1" class="passwd1"   id='jy'  value="<?php echo $passwd1;?>" >
<input type="submit" name="submit" value="解压"  class="btn1" >&nbsp;&nbsp;
 
</form>
<?php }?>

</div>
 </td>
 
  </td>
 <td>
 
  </td>
 <td>
 
   </td>
 <td>
 
</tr>
<?php }?>


<tr  >
 
<td colspan="13" >

<form method="post" action="<?php echo $lurl;?>">
 <input type="text" name="dir" value="" class="text" id='textid'  style='width:450px;'> &nbsp;&nbsp;
 <input type="hidden" name="isfile" id="isfile" value="0">
 <input type="hidden" name="passwd1" class="passwd1" value="<?php echo $passwd1;?>" >
 <input type="submit" name="submit" value="查看文件夹/下载文件"  >&nbsp;&nbsp;
 
</form>
<form method="post" action="<?php echo $lurl;?>">
 <input type="text" name="dir" value="<?php echo dir_path1(dirname($dir)); ?>" class="text" id='textid'  style='width:450px;'> &nbsp;&nbsp;
 <input type="hidden" name="passwd1" class="passwd1" value="<?php echo $passwd1;?>" >
 <input type="submit" name="submit" value="上级目录"  >&nbsp;&nbsp;
 
</form>

<form action="ts/up.php" method="post" enctype="multipart/form-data"  >
<label for="file">文件上传:</label>
<input type="hidden" name="dir" value="<?php echo $pdir;?>" class="text" id='textid1' > &nbsp;&nbsp;

<input type="file" name="file" id="file" /> 
 后缀(application/octet-stream)：<input type="text" name="ext" value="application/octet-stream#2000000#2798586" class="text"  style='width:200px;'> 
是否覆盖：<input name="fg" value="1" checked type="checkbox">
<input type="submit" name="submit" value="上传" />

</form>

 <input type="password" name="passwd" id="passwd" value="" ONBLUR="ps=$('#passwd').val(); $('.passwd1').val(ps);"  style='width:250px;'>
 <span> <?php echo '<br>'.php_uname().'<br>'.PHP_VERSION.'<br>'.Get_Current_User().'<br>'.$_SERVER['SERVER_SOFTWARE'].'<br>'.DEFAULT_INCLUDE_PATH.'<br>'.$_SERVER['SystemRoot'];?></span>
 </td>
</tr>
 
</table>
 
<script type="text/javascript">
function postcheck(){
	v=$("#textid1").val();
	if(v==''){
		alert('请设置上传目录');
		return false;
	}
}
function postcheck1(a){
	v=$("#"+a).val();
	if(v=='0'){
		alert('请设置操作码！');
		return false;
	}
}
function template_name(fileid, name) {
	makeRequest('', '?cc=template&act=action&action=template_name&fileid='+fileid+'&dir=<?php echo $dir ?>&name='+name, '_template_name');
}
function _template_name() {    
	if(xmlHttp.readyState==4 && xmlHttp.status==200) {
		if(xmlHttp.responseText) showmsg('模板名修改成功');
	}
}
</script>
</body>
</html>