function CGame(oData){
    var _idleBatterWait = 0;
    var _idleBatterStrike = 0;
    var _idlePitcher = 0;
    var _iVal;
    var _iScore = 0;
    var _iBallThrowed = 0;
    
    var _bUpdate;
    var _bWaiting = false;    //0 waiting state, 1 striking state
    var _bBallThrowed = false;
    var _bMissed = false;
    var _bStadium = false;
    var _bClick = false;
    
    var _oInterface;
    var _oEndPanel = null;
    var _oParent;
    
    var _oContainerGame;
    
    var _oBatter;
    var _oPitcher;
    var _oHitArea;
    
    this._init = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            s_oSoundtrack.volume = 0.2;
            s_oBgSound.volume = 1;
        }
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); 
        
        _oContainerGame = new createjs.Container();
        s_oStage.addChild(_oContainerGame);
        
        var oStadiumContainer = new createjs.Container();
        s_oStage.addChild(oStadiumContainer);
        s_oStadium = new CStadium(oStadiumContainer);
        
        _oInterface = new CInterface();
        
        _oPitcher = new CPitcher(_oContainerGame);
        
        s_oBall = new CBall(_oContainerGame);
        
        _oBatter = new CBatter(_oContainerGame);
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(0, 75, CANVAS_WIDTH, CANVAS_HEIGHT+75);
        _oContainerGame.addChild(_oHitArea);
        _oHitArea.on("mousedown", s_oGame._strike, this, false);
        
        _bClick = false;
        var oMissed = createBitmap(s_oSpriteLibrary.getSprite('3'));
        oMissed.x = CANVAS_WIDTH/2;
        oMissed.y = CANVAS_HEIGHT/2;
        oMissed.regX = 40;
        oMissed.regY = 84;
        s_oStage.addChild(oMissed);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("baseball_countdown1");
        }
        
        this.launchCountdown(oMissed);
    };
    
    this.launchCountdown = function(oMissed){
        createjs.Tween.get( oMissed ).to({scaleX: 1.3, scaleY: 1.3 }, (500), createjs.Ease.cubicOut).wait(500).call(function() {
            this.visible = false;
            var oMissed = createBitmap(s_oSpriteLibrary.getSprite('2'));
            oMissed.x = CANVAS_WIDTH/2;
            oMissed.y = CANVAS_HEIGHT/2;
            oMissed.regX = 40;
            oMissed.regY = 84;
            oMissed.scaleX= 0.7;
            oMissed.scaleY= 0.7;
            s_oStage.addChild(oMissed);
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("baseball_countdown1");
            }
            
            createjs.Tween.get( oMissed ).to({scaleX: 1.3, scaleY: 1.3 }, (500), createjs.Ease.cubicOut).wait(500).call(function() {
                this.visible = false;
                var oMissed = createBitmap(s_oSpriteLibrary.getSprite('1'));
                oMissed.x = CANVAS_WIDTH/2;
                oMissed.y = CANVAS_HEIGHT/2;
                oMissed.regX = 40;
                oMissed.regY = 84;
                oMissed.scaleX= 0.7;
                oMissed.scaleY= 0.7;
                s_oStage.addChild(oMissed);
                
                if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                    createjs.Sound.play("baseball_countdown1");
                }
                createjs.Tween.get( oMissed ).to({scaleX: 1.3, scaleY: 1.3 }, (500), createjs.Ease.cubicOut).wait(500).call(function() {
                    this.visible = false;
                    var oMissed = createBitmap(s_oSpriteLibrary.getSprite('start_msg'));
                    oMissed.x = CANVAS_WIDTH/2;
                    oMissed.y = CANVAS_HEIGHT/2;
                    oMissed.regX = 202.5;
                    oMissed.regY = 135;
                    oMissed.scaleX= 0.7;
                    oMissed.scaleY= 0.7;
                    s_oStage.addChild(oMissed);
                    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                        createjs.Sound.play("baseball_countdown2");
                    }
                    createjs.Tween.get( oMissed ).to({scaleX: 1.3, scaleY: 1.3 }, (500), createjs.Ease.cubicOut).wait(500).call(function() {
                        this.visible = false;
                        _bUpdate = true;
                        _bClick = true;
                   });      
               });                                          
            });                                   
        });
    }
    
    this._strike = function(){
        if ( _bClick === true ){
            if(!_bWaiting){
                _oBatter.hideBatter(_idleBatterWait, _bWaiting);
                _idleBatterWait = 0;
            }else{
                _oBatter.hideBatter(_idleBatterStrike, _bWaiting);
                _idleBatterStrike = 0;
            }
            _oHitArea.visible = !_oHitArea.visible;
            _bWaiting = !_bWaiting;
        }
    };
    
    this._ballMissed = function(){
        _bUpdate = false;
        _bMissed = true;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            createjs.Sound.play("baseball_crowd_strike");
        }
        
        _bClick = false;
        var oMissed = createBitmap(s_oSpriteLibrary.getSprite('strike_msg'));
        oMissed.x = CANVAS_WIDTH/2;
        oMissed.y = CANVAS_HEIGHT/2;
        oMissed.regX = 223.5;
        oMissed.regY = 148.5;
        oMissed.scaleX= 0.7;
        oMissed.scaleY= 0.7;
        s_oStage.addChild(oMissed);
        
        createjs.Tween.get( oMissed ).to({scaleX: 1, scaleY: 1 }, (500), createjs.Ease.cubicOut).wait(800).call(function() {
            _oBatter.hideBatter(_idleBatterWait, _bWaiting);
            _idleBatterWait = 0;
            if(_bWaiting){
                s_oGame._strike();
            }
            
            this.visible = false; 
            _bUpdate = true;
            _bClick = true;
        });
    };
    
    this._setScore = function (iValue){
        _iScore += iValue;
        _oInterface.viewScore(_iScore);
    };
    
    this.unload = function(){
        _oHitArea.off("mousedown", s_oGame._strike, this, false);
        
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
        }

        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren(); 
    };
 
    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
        
        $(s_oMain).trigger("restart");
    };

    this.gameOver = function(){ 
        _bUpdate = false;  
        _oEndPanel = CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
        _oEndPanel.show(_iScore);
    };
    
    this._viewStadium = function (oHitValue, pEndPoint){
        s_oStadium.setVisible();
        s_oStadium.viewAndGetScore(oHitValue, pEndPoint);
        _bStadium = true;
    };
    
    this._restart = function (){
        if(_iBallThrowed >= BALL_TO_THROW){
            this.gameOver();
        }else{
            s_oBall.reset();
            s_bBounce = true;
            _bBallThrowed = false;
            _bMissed = false;
            _bStadium = false;
            s_oStadium.setInvisible();
            this._strike();
        }
        
    };
    
    this.update = function(){
        if(_bUpdate){
            if(!_bWaiting){
                //waiting the pitcher
                _oBatter.hideBatter(_idleBatterWait, _bWaiting);
                if((_idleBatterWait+1)<NUM_SPRITE_PLAYERS){
                    _oBatter.viewBatter(_idleBatterWait+1, _bWaiting);
                    _idleBatterWait++; 
                }else{
                    _idleBatterWait=0;
                    _oBatter.viewBatter(_idleBatterWait, _bWaiting);
                }
            }else{
                //striking
                _oBatter.hideBatter(_idleBatterStrike, _bWaiting);
                if((_idleBatterStrike+1)<NUM_SPRITE_BATTING){
                    _oBatter.viewBatter(_idleBatterStrike+1, _bWaiting);
                    _idleBatterStrike++; 
                }else{
                    _oBatter.viewBatter(_idleBatterStrike, _bWaiting);
                }
                if(_idleBatterStrike === 4){
                    s_oBall.hittedControl();
                    _iVal=s_oBall.getValue();
                }
            }

            if(_bMissed === true){
                if(_iBallThrowed >= BALL_TO_THROW){
                    this.gameOver();
                }else{
                    s_oBall.reset();
                    _bBallThrowed = false;
                    if(_idleBatterStrike>0){
                        this._strike();
                    }
                    _bMissed = false;
                    _bClick = true;
                }
            }
            if(!_bBallThrowed || _idlePitcher+1<NUM_SPRITE_PLAYERS){
                _oPitcher.hidePitcher(_idlePitcher);
                if(_idlePitcher+1<NUM_SPRITE_PLAYERS){
                    _oPitcher.viewPitcher(_idlePitcher+1);
                    _idlePitcher++; 
                }else{
                    _idlePitcher=0;
                }
                if(_idlePitcher === 16){
                    _iBallThrowed++;
                    _oInterface.viewBallLeft(_iBallThrowed);
                    s_oBall.viewBall();
                    _bBallThrowed = true;
                }
            }
            if(_bBallThrowed){
                s_oBall.update();
            }


            if(_bStadium){
                s_oStadium.update();
            }        
        }
    };

    s_oGame=this;
    _oParent=this;
    
    BALL_TO_THROW = oData.ball_to_throw;
    OFFSET_FOR_HIT    = oData.offset_hit;
    OFFSET_FOR_PERFECT_HIT = oData.offset_perfect_hit;
    STEP_SPEED_STADIUM    = oData.step_spd_stadium;
    AREA_VALUE    = [oData.score_area1, oData.score_area2, oData.score_area3];
	
    ALMOST_MINUS  = PERFECT_HIT_Y - OFFSET_FOR_HIT;
    ALMOST_PLUS   = PERFECT_HIT_Y + OFFSET_FOR_HIT;

    this._init();
}

var s_oGame;
