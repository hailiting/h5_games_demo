/**
 Created by Administrator on 2016/4/10.
 */
onload = function(){
   $('.tomBtn').removeAttr('disabled');
    $("a,input,button").focus(function(){this.blur()});
};


//cymbal
function cymbal(){

    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/cymbal.wav' autoplay></audio>");
    },500);

    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Cymbal/cymbal_"+i+".jpg");
        i++;
        if(i<=12){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>12){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//drink
function drink(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/pour_milk.wav' autoplay></audio>");
    },1800);
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/p_drink_milk.wav' autoplay></audio>");
    },4000);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Drink/drink_"+i+".jpg");
        i++;
        if(i<=80){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>80){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//eat
function eat(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/p_eat.wav' autoplay></audio>");
    },1500);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Eat/eat_"+i+".jpg");
        i++;
        if(i<=39){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>39){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//fart
function fart(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/fart001_11025.wav' autoplay></audio>");
    },500);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Fart/fart_"+i+".jpg");
        i++;
        if(i<=27){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>27){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//pie
function pie(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/slap6.wav' autoplay></audio>");
    },1500);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Pie/pie_"+i+".jpg");
        i++;
        if(i<=23){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>23){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//scratch
function scratch(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/scratch_kratzen.wav' autoplay></audio>");
    },2200);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Scratch/scratch_"+i+".jpg");
        i++;
        if(i<=55){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>55){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//knockout
function knockout(){
    $(".audio").html("<audio src='../src/audio/slap1.wav' autoplay></audio>");
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/p_stars2s.wav' autoplay></audio>");
    },2000);

    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Knockout/knockout_"+i+".jpg");
        i++;
        if(i<=80){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>80){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//stomach
function stomach(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/p_belly1.wav' autoplay></audio>");
    },200);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Stomach/stomach_"+i+".jpg");
        i++;
        if(i<=33){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>33){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//footLeft
function footLeft(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/p_foot3.wav' autoplay></audio>");
    },200);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/FootLeft/footLeft_"+i+".jpg");
        i++;
        if(i<=29){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>29){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//footRight
function footRight(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/p_foot4.wav' autoplay></audio>");
    },200);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/FootRight/footRight_"+i+".jpg");
        i++;
        if(i<=29){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>29){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
//angry
function angry(){
    setTimeout(function(){
        $(".audio").html("<audio src='../src/audio/p_noo.wav' autoplay></audio>");
    },1100);
    var i =0;
    timer = setInterval(function(){
        $(".tomAnimate span img").attr("src","../src/Animations/Angry/angry_"+i+".jpg");
        i++;
        if(i<=25){
            $('.tomBtn').attr('disabled',"true");
        }else if(i>25){
            clearInterval(timer);
            $('.tomBtn').removeAttr("disabled");
        }
    },100);
}
