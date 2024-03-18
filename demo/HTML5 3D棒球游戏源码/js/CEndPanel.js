function CEndPanel(oSpriteBg){
    
    var _oBg;
    var _oGroup;
    
    var _oMsgText;
    var _oMsgText1;
    var _oScoreText;
    var _oScoreText1;
    
    this._init = function(oSpriteBg){
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("baseball_buzzer");
        }
        
        _oBg = createBitmap(oSpriteBg);
        _oBg.x = 0;
        _oBg.y = 0;
        _oMsgText = new createjs.Text(""," 60px "+FONT2, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2)-150;
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 500;   
        _oMsgText.lineHeight = 60;
        _oMsgText.outline = 5;
        
        _oMsgText1 = new createjs.Text(""," 60px "+FONT2, "#ff0000");
        _oMsgText1.x = CANVAS_WIDTH/2;
        _oMsgText1.y = (CANVAS_HEIGHT/2)-150;
        _oMsgText1.textAlign = "center";
        _oMsgText1.textBaseline = "alphabetic";
        _oMsgText1.lineHeight = 60;
        _oMsgText1.lineWidth = 500;        
        
        _oScoreText = new createjs.Text(""," 60px "+FONT2, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = (CANVAS_HEIGHT/2) + 40;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.lineWidth = 500;
        _oScoreText.outline = 5;
        
        _oScoreText1 = new createjs.Text(""," 60px "+FONT2, "#ff0000");
        _oScoreText1.x = CANVAS_WIDTH/2;
        _oScoreText1.y = (CANVAS_HEIGHT/2) + 40;
        _oScoreText1.textAlign = "center";
        _oScoreText1.textBaseline = "alphabetic";
        _oScoreText1.lineWidth = 500;

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        _oGroup.addChild(_oBg, _oScoreText, _oScoreText1, _oMsgText, _oMsgText1);

        s_oStage.addChild(_oGroup);
    };
    
    this.unload = function(){
        _oGroup.off("mousedown",this._onExit);
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(iScore){
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
	        createjs.Sound.play("game_over");
	}
        
        
        _oMsgText.text = TEXT_GAMEOVER;
        _oMsgText1.text = TEXT_GAMEOVER;
        
        _oScoreText.text = TEXT_SCORE + iScore;
        _oScoreText1.text = TEXT_SCORE + iScore;
        
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        
        $(s_oMain).trigger("save_score",[iScore]);
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame.onExit();
    };
    
    this._init(oSpriteBg);
    
    return this;
}
