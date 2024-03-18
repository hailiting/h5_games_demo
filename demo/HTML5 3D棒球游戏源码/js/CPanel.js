function CPanel(iScore){
    
    var _oBg;
    var _oGroup;

    var _oMsgText;
    var _oMsgText1;
    var _oMsgText2;
    var _oMsgText3;
    var _oScoreText;
    var _oScoreText1;
    
    this._init = function(iScore){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));

        _oMsgText = new createjs.Text(TEXT_PANEL," 60px "+FONT2, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH/2;
        _oMsgText.y = (CANVAS_HEIGHT/2-50);
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 450;     
        _oMsgText.lineHeight = 60;
        _oMsgText.outline = 5;
        
        _oMsgText1 = new createjs.Text(TEXT_PANEL," 60px "+FONT2, "#ff0000");
        _oMsgText1.x = CANVAS_WIDTH/2;
        _oMsgText1.y = (CANVAS_HEIGHT/2-50);
        _oMsgText1.textAlign = "center";
        _oMsgText1.textBaseline = "alphabetic";
        _oMsgText1.lineWidth = 450; 
        _oMsgText1.lineHeight = 60;

        _oScoreText = new createjs.Text(iScore," 60px "+FONT2, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2-50;
        _oScoreText.y = (CANVAS_HEIGHT/2) + 80;
        _oScoreText.textAlign = "right";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.lineWidth = 500;
        _oScoreText.outline = 5;
        
        _oScoreText1 = new createjs.Text(iScore," 60px "+FONT2, "#ff0000");
        _oScoreText1.x = CANVAS_WIDTH/2-50;
        _oScoreText1.y = (CANVAS_HEIGHT/2) + 80;
        _oScoreText1.textAlign = "right";
        _oScoreText1.textBaseline = "alphabetic";
        _oScoreText1.lineWidth = 500;

        _oMsgText2 = new createjs.Text(TEXT_PANEL_POINT," 60px "+FONT2, "#ffffff");
        _oMsgText2.x = CANVAS_WIDTH/2+30;
        _oMsgText2.y = (CANVAS_HEIGHT/2+80);
        _oMsgText2.textAlign = "center";
        _oMsgText2.textBaseline = "alphabetic";
        _oMsgText2.lineWidth = 500; 
        _oMsgText2.outline = 5;
        
        _oMsgText3 = new createjs.Text(TEXT_PANEL_POINT," 60px "+FONT2, "#ff0000");
        _oMsgText3.x = CANVAS_WIDTH/2+30;
        _oMsgText3.y = (CANVAS_HEIGHT/2+80);
        _oMsgText3.textAlign = "center";
        _oMsgText3.textBaseline = "alphabetic";
        _oMsgText3.lineWidth = 500; 

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;

        _oGroup.addChild(_oBg, _oMsgText, _oScoreText, _oScoreText1, _oMsgText1, _oMsgText2, _oMsgText3);
        s_oStage.addChild(_oGroup);

        this.show();
    };
    
    this._initListener = function(){
        _oGroup.on("mousedown",this._onExit);
    };
    
    this.show = function(){
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false ){
	        createjs.Sound.play("win");
	}
            
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get( _oGroup ).to({alpha: 1 }, (500), createjs.Ease.cubicOut).call(function() {oParent._initListener();});
    };
    
    this._onExit = function(){
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        s_oGame._restart();
    };
    
    this._init(iScore);
    
    return this;
}
