function cover(){
    can3 = document.getElementById("canvas3");    //上層
    ctx3 = can3.getContext("2d");
    ctx3.drawImage(cover_image, 0, 0, can3.width, can3.height);
    
    ctx3.save();
    ctx3.globalAlpha = 0.7;
    ctx3.shadowBlur = 15;
    ctx3.shadowColor = "white";
    ctx3.drawImage(playIcon, can3.width*0.5-playIcon.width*0.5, can3.height*0.75-playIcon.height*0.5, playIcon.width, playIcon.height);
    //console.log(playIcon.height);
    ctx3.restore();
    
    can1 = document.getElementById("canvas1");    //上層
    ctx1 = can1.getContext("2d"); 
    can1.addEventListener('click', startPlay, false);
}

function startPlay(e){
    if(e.offSetX || e.layerX){
        var mx = e.offSetX == undefined ? e.layerX : e.offSetX;
        var my = e.offSetY == undefined ? e.layerY : e.offSetY;        
    }
    if(mx>(can3.width*0.5-playIcon.width*0.5) && mx<(can3.width*0.5+playIcon.width*0.5) && my>(can3.height*0.75-playIcon.width*0.5) && my<(can3.height*0.75+playIcon.width*0.5)){
        console.log(mx);
        console.log(my);
        play = true;
    }
    
}
