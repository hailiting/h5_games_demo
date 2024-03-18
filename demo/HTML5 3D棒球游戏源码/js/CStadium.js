function CStadium( oStadiumContainer){
    var _oAudioToggle;
    var _oButExit;
    
    var _oStadiumContainer = oStadiumContainer;
    
    var _bUpdate;
    
    var _iArea;
    
    var _oAreaBottom;
    var _oAreaTop;
    var _oCrowdLeft;
    var _oCrowdRight;
    
    var _oBall;
    
    this._init = function(){    
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('air_view'));
        oStadiumContainer.addChild(oBg); 
        
        _oAreaBottom = createBitmap(s_oSpriteLibrary.getSprite('area_bottom'));
        _oAreaBottom.y = CANVAS_HEIGHT/2;
        _oAreaBottom.alpha = 0.5;
        oStadiumContainer.addChild(_oAreaBottom); 
        
        _oAreaTop = createBitmap(s_oSpriteLibrary.getSprite('area_top'));
        _oAreaTop.y = CANVAS_HEIGHT/2-55;
        _oAreaTop.alpha = 0.5;
        oStadiumContainer.addChild(_oAreaTop); 
        
        _oCrowdLeft = createBitmap(s_oSpriteLibrary.getSprite('crowd_left'));
        _oCrowdLeft.x = CANVAS_WIDTH/2+56;
        _oCrowdLeft.y = CANVAS_HEIGHT/2-150;
        _oCrowdLeft.alpha = 0.5;
        oStadiumContainer.addChild(_oCrowdLeft); 
        
        _oCrowdRight = createBitmap(s_oSpriteLibrary.getSprite('crowd_right'));
        _oCrowdRight.y = CANVAS_HEIGHT/2-150;
        _oCrowdRight.alpha = 0.5;
        oStadiumContainer.addChild(_oCrowdRight); 
        
        _oStadiumContainer.visible = false;
        _bUpdate = false;
    };
    
    this.viewAndGetScore = function(oHitValue, pEndPoint){
        var iX = pEndPoint.x;
        var pEndPointBounce = {x: 0, y: 0};
        var pStartPoint = {x: START_POINT_STADIUM_X, y: START_POINT_STADIUM_Y};
                
        switch(iX){
            case END_POINT_X_ALMOST_MINUS_LEFT:
                if(oHitValue < (OFFSET_FOR_HIT/2)){
                    _iArea = 1;
                    pEndPoint.y = _oAreaTop.y + 30;
                    pEndPointBounce.x = pEndPoint.x - 10;
                    pEndPointBounce.y = pEndPoint.y - 10;
                }else if(oHitValue < OFFSET_FOR_HIT && oHitValue >= (OFFSET_FOR_HIT/2)){
                    _iArea = 0;
                    pEndPoint.y = _oAreaBottom.y + 30;
                    pEndPointBounce.x = pEndPoint.x - 10;
                    pEndPointBounce.y = pEndPoint.y - 10;
                }
                break;
               
            case END_POINT_X_ALMOST_MINUS_RIGHT:
                if(oHitValue < (OFFSET_FOR_HIT/2)){
                    _iArea = 1;
                    pEndPoint.y = _oAreaTop.y + 30;
                    pEndPointBounce.x = pEndPoint.x + 10;
                    pEndPointBounce.y = pEndPoint.y - 10;
                }else if(oHitValue < OFFSET_FOR_HIT && oHitValue >= (OFFSET_FOR_HIT/2)){
                    _iArea = 0;
                    pEndPoint.y = _oAreaBottom.y + 30;
                    pEndPointBounce.x = pEndPoint.x + 10;
                    pEndPointBounce.y = pEndPoint.y - 10;
                }
                break;

            case END_POINT_X_ALMOST_PLUS_LEFT:
                if(oHitValue < (OFFSET_FOR_HIT/2)){
                    _iArea = 1;
                    pEndPoint.y = _oAreaTop.y + 30;
                    pEndPointBounce.x = pEndPoint.x - 10;
                    pEndPointBounce.y = pEndPoint.y - 10;
                }else if(oHitValue < OFFSET_FOR_HIT && oHitValue >= (OFFSET_FOR_HIT/2)){
                    _iArea = 0;
                    pEndPoint.y = _oAreaBottom.y + 40;
                    pEndPointBounce.x = pEndPoint.x - 10;
                    pEndPointBounce.y = pEndPoint.y - 10;
                }
                break;

            case END_POINT_X_ALMOST_PLUS_RIGHT:
                if(oHitValue < (OFFSET_FOR_HIT/2)){
                    _iArea = 1;
                    pEndPoint.y = _oAreaTop.y + 30;
                    pEndPointBounce.x = pEndPoint.x + 10;
                    pEndPointBounce.y = pEndPoint.y - 10;
                }else if(oHitValue < OFFSET_FOR_HIT && oHitValue >= (OFFSET_FOR_HIT/2)){
                    _iArea = 0;
                    pEndPoint.y = _oAreaBottom.y + 50;
                    pEndPointBounce.x = pEndPoint.x + 10;
                    pEndPointBounce.y = pEndPoint.y - 10;
                }
                break;

            case END_POINT_X_PERFECT_LEFT:
                _iArea = 3;
                s_bBounce = false;
                pEndPoint.x -= 30;
                pEndPoint.y = _oCrowdLeft.y + 30;
                break;

            case END_POINT_X_PERFECT_RIGHT:
                _iArea = 2;
                s_bBounce = false;
                pEndPoint.y = _oCrowdRight.y + 30;
                break;
        }
        var _oStadiumBallContainer = new createjs.Container();
        s_oStage.addChild(_oStadiumBallContainer);
        _oBall = new CStadiumBall(pStartPoint, pEndPoint, pEndPointBounce, _oStadiumBallContainer, _iArea, oHitValue);
        _bUpdate = true;
    };
    
    this.update = function(){
        if(_bUpdate){
            _oBall.update();
        }
    };
    
    this.viewAreaEffect = function(iArea, iScore){
        switch(iArea){
            case 0:
                createjs.Tween.get(_oAreaBottom).to({alpha:1 }, 300).call(function() {
                    createjs.Tween.get(_oAreaBottom).to({alpha:0.5 }, 300).call(function() {
                        createjs.Tween.get(_oAreaBottom).to({alpha:1 }, 300).call(function() {
                            createjs.Tween.get(_oAreaBottom).to({alpha:0.5 }, 300).call(function() {
                                var oPanel = new CPanel(iScore);                
                                s_oGame._setScore(iScore);
                            });
                        });
                    });
                });
                break;
            case 1:
                createjs.Tween.get(_oAreaTop).to({alpha:1 }, 300).call(function() {
                    createjs.Tween.get(_oAreaTop).to({alpha:0.5 }, 300).call(function() {
                        createjs.Tween.get(_oAreaTop).to({alpha:1 }, 300).call(function() {
                            createjs.Tween.get(_oAreaTop).to({alpha:0.5 }, 300).call(function() {
                                var oPanel = new CPanel(iScore);                
                                s_oGame._setScore(iScore);
                            });
                        });
                    });
                });
                break;
            case 2:
                createjs.Tween.get(_oCrowdLeft).to({alpha:1 }, 300).call(function() {
                    createjs.Tween.get(_oCrowdLeft).to({alpha:0.5 }, 300).call(function() {
                        createjs.Tween.get(_oCrowdLeft).to({alpha:1 }, 300).call(function() {
                            createjs.Tween.get(_oCrowdLeft).to({alpha:0.5 }, 300).call(function() {
                                var oPanel = new CPanel(iScore);                
                                s_oGame._setScore(iScore);
                            });
                        });
                    });
                });
                break;
            case 3:
                createjs.Tween.get(_oCrowdRight).to({alpha:1 }, 300).call(function() {
                    createjs.Tween.get(_oCrowdRight).to({alpha:0.5 }, 300).call(function() {
                        createjs.Tween.get(_oCrowdRight).to({alpha:1 }, 300).call(function() {
                            createjs.Tween.get(_oCrowdRight).to({alpha:0.5 }, 300).call(function() {
                                var oPanel = new CPanel(iScore);                
                                s_oGame._setScore(iScore);
                            });
                        });
                    });
                });
                break;
        }
    };
    
    this.unload = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        oStadiumContainer.removeAllChildren(); 
        s_oStadium = null;
    };
    
    this.setVisible = function(){
        _oStadiumContainer.visible = true;
    };
    
    this.setInvisible = function(){
        _oStadiumContainer.visible = false;
        _oBall.unload();
    };
    
    s_oStadium = this;
    
    this._init();
    
    return this;
}

var s_oStadium = null;