
// JavaScript Document
$(document).ready(function(){
   
    
    
		$("#close-btn").click(function(){
            
            if (myScroll != null) {
              //  myScroll.destroy();
              //  myScroll.disable();
            }
            
            // $("#huise").css("display","none");
            $("#huise").css("display","none");
            $("#huise").css("visibility","hidden");
            $("#toptips").css("display","none");
            $("#righttips").css("display","none");
            clearpicnum();
            gfile=0;
            ghavezan=false;
            
        });
  
        $("#pinglun-btn").click(function(){
            if(getCookie("picnum")>0)
            {
                TINY.box.show({html:"<div class='messege_content'>请尽情吐槽吧~</div> <input type='text' id='type-box' name='type-box' maxlength='140' style='width:80%;' />  <div style='margin: 7px;'><a onclick='SubmitConment()'>确定</a></div> ",width:150,height:100,boxid:"messege",animate:false});  
            }
            else
            {
               TINY.box.show({html:"<div class='messege_content'>提交作品后<br>才可以吐槽哟</div>",boxid:"messege",animate:false});  
            }
           // var conment =  $("#type-box").val();
            //alert(conment);
        });
     
        $("#zan-btn").click(function(){
            zan();
           // $("#bigpic").attr("src","http://nya.oss-cn-hangzhou.aliyuncs.com/nya/1.png");
        });
    
        $("#searchconfirm").click(function(){
         
            TINY.box.show({html:"<div class='messege_content'>请输入作品编号!</div> <input  type='text' id='search-box' name='search-box' maxlength='10' style='width:80%;' />  <div style='margin: 7px;'><a onclick='searchpic()'>确定</a></div> ",width:150,height:100,boxid:"messege",animate:false,close:true});  
     
        });
       
    
    
});



