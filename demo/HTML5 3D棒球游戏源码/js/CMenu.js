function CMenu(){
    var _oBg;
    var _oLogo;
    var _oButPlay;
    var _oFade;
    var _oAudioToggle;
    
    var _pStartPosAudio;
    
    this._init = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack.volume = 1;
                s_oBgSound.volume = 0;
            }
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
        
        _oLogo = createBitmap(s_oSpriteLibrary.getSprite('logo_menu'));
        _oLogo.x = 140;
        _oLogo.y = 20;
        s_oStage.addChild(_oLogo);
		
        var oSprite = s_oSpriteLibrary.getSprite('sitelogo2');
        _ositelogo = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT - 50,oSprite,' ',"blackplotan","#ffffff",130);
        _ositelogo.addEventListener(ON_MOUSE_UP, this._onSiteLogoRelease, this);

        
        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton((CANVAS_WIDTH/2),CANVAS_HEIGHT -225,oSprite);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
     
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){_oFade.visible = false;});  
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        _oFade.visible = false;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oStage.removeAllChildren();
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
	
	this._onSiteLogoRelease = function(){
		CreateLinksInGame('Baseball-Pro','menu','logo');
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("click");
        }

        s_oMain.gotoGame();
    };
	
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;