function CStadiumBall(pStart, pEnd, pEndBounce, oParentContainer, iArea, oHitValue){
    
    var _iCntFrames = 0;
    var _iMaxFrames = 40;
    var _iArea;
    
    var _bUpdate;
    
    var _oBall;
    var _oBallShadow;
    
    var _pStartPoint = {x: 0, y: 0};
    var _pStartPointShadow = {x: 0, y: 0};
    var _pEndPoint = {x: 0, y: 0};
    var _pEndBounce = {x: 0, y: 0};
    
    var _aTrajectoryPoint;
    var _aTrajectoryPointShadow;
    
    var _bBounced = false;
    
    this._init = function(pStart, pEnd, pEndBounce, oParentContainer, iArea){ 
        _iArea = iArea;
        
        _oBallShadow = createBitmap(s_oSpriteLibrary.getSprite("ball_shadow"));
        _oBallShadow.x = pStart.x;
        _oBallShadow.y = pStart.y;
        _oBallShadow.regX = _oBallShadow.width/2;
        _oBallShadow.regY = _oBallShadow.height/2;
        _oBallShadow.scaleX = 0.2;
        _oBallShadow.scaleY = 0.2;
        _oBallShadow.alpha = 0.5;
        _oBallShadow.rotation = 0;
        oParentContainer.addChild(_oBallShadow);
        
        _oBall = createBitmap(s_oSpriteLibrary.getSprite("ball"));
        _oBall.x = pStart.x;
        _oBall.y = pStart.y;
        _oBall.regX = _oBall.width/2;
        _oBall.regY = _oBall.height/2;
        _oBall.scaleX = 0.3;
        _oBall.scaleY = 0.3;
        _oBall.rotation = 0;
        oParentContainer.addChild(_oBall);
        
        _pStartPointShadow.x = _oBallShadow.x;
        _pStartPointShadow.y = _oBallShadow.y;
        
        _pStartPoint.x = _oBall.x;
        _pStartPoint.y = _oBall.y;
        
        _pEndPoint.x = pEnd.x;
        _pEndPoint.y = pEnd.y;
        
        _pEndBounce.x = pEndBounce.x;
        _pEndBounce.y = pEndBounce.y;
        
        _bUpdate = true;
        this._calculateMid(_pStartPoint, _pEndPoint);
    };
    
    this.viewBall = function(){
        _oBall.visible = true;
        _oBallShadow.visible = true;
        _bUpdate = true;
    };
    
    this.hideBall = function(){
        _oBall.visible = false;
        _oBallShadow.visible = false;
    };    
    
    this._calculateMid = function(pStartPoint, pEndPoint){
        var t0;
        if(_bBounced === false){
            var iVal =  Math.random() * ((CANVAS_WIDTH / 2) - (CANVAS_WIDTH / 2)) + ((CANVAS_WIDTH / 2));

            if (iVal > (CANVAS_WIDTH / 2)) {
                t0 = new createjs.Point((CANVAS_WIDTH/2), Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100);
            }else {
                t0 = new createjs.Point((CANVAS_WIDTH/2), Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100);
            }
        }else{
            if(pStartPoint.x < CANVAS_WIDTH/2){
                t0 = new createjs.Point(pEndPoint.x+5, pStartPoint.y-20);
            }else{
                t0 = new createjs.Point(pEndPoint.x-5, pStartPoint.y-20);
            }
        }
        
        _aTrajectoryPoint = {start:pStartPoint, end:pEndPoint, traj:t0};
    };
    
    this._updateBall = function(){
           _iCntFrames += STEP_SPEED_STADIUM;
            if (_iCntFrames > _iMaxFrames ) {
                _iCntFrames = 0;
                
                if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                    createjs.Sound.play("baseball_drop_bounce_grass");
                }
                if(_bBounced === true || s_bBounce === false){
                    _bUpdate = false;
                    _iMaxFrames = 40;
                    _oBall.scaleX = 0.3;
                    _oBall.scaleY = 0.3;
                    _oBallShadow.scaleX = 0.3;
                    _oBallShadow.scaleY = 0.3;
                    var iScore;
                    switch (_iArea){
                        case 0:
                            iScore = Math.floor(AREA_VALUE[0]+(oHitValue/10));
                            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                                createjs.Sound.play("baseball_applauses");
                            }
                            break;
                        case 1:
                            iScore = Math.floor(AREA_VALUE[1]+(oHitValue/5));
                            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                                createjs.Sound.play("crowd_ohhh");
                            }
                            break;
                        case 2:
                            iScore = Math.floor(AREA_VALUE[2]+oHitValue+10);
                            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                                createjs.Sound.play("baseball_crowd_homerun");
                            }
                            break;
                        case 3:
                            iScore = Math.floor(AREA_VALUE[2]+oHitValue+10);
                            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                                createjs.Sound.play("baseball_crowd_homerun");
                            }
                            break;
                    }
                    if(iScore < 0){
                        iScore *= -1;
                        iScore -= 10;
                    }
                    if(_iArea >= 2){
                        _oBall.visible = false;
                        _oBallShadow.visible = false;
                    }
                    s_oStadium.viewAreaEffect( _iArea, iScore );
                }
                if(s_bBounce === true && _bBounced === false){
                    _bBounced = true;
                    _iMaxFrames = _iMaxFrames/2;
                    this._calculateMid(_pEndPoint, _pEndBounce);
                }
            }
            else{
                var fLerp; 
                fLerp=easeLinear( _iCntFrames, 0, 1, _iMaxFrames);
                
                if(_bBounced === false){
                    var pPos = getTrajectoryPoint(fLerp, _aTrajectoryPoint);
                    _oBall.x = pPos.x;
                    _oBall.y = pPos.y;

                    var fLerpShadow; 
                    fLerpShadow=easeInSine( _iCntFrames, 0, 1, _iMaxFrames);
                    _aTrajectoryPointShadow = {start:_pStartPointShadow, end:_pEndPoint, traj:_pEndPoint};
                    var pPos = getTrajectoryPoint(fLerpShadow, _aTrajectoryPointShadow);
                    _oBallShadow.x = pPos.x;
                    _oBallShadow.y = pPos.y;
                    if(_oBall.scaleX > 0.25){
                        _oBall.scaleX -= 0.005;
                        _oBall.scaleY -= 0.005;
                        _oBallShadow.scaleX -= 0.008;
                        _oBallShadow.scaleY -= 0.008;
                    }
                }else{
                    var pPos = getTrajectoryPoint(fLerp, _aTrajectoryPoint);
                    _oBall.x = pPos.x;
                    _oBall.y = pPos.y;

                    var fLerpShadow; 
                    fLerpShadow=easeInSine( _iCntFrames, 0, 1, _iMaxFrames);
                    _aTrajectoryPointShadow = {start:_pEndPoint, end:_pEndBounce, traj:_pEndBounce};
                    var pPos = getTrajectoryPoint(fLerpShadow, _aTrajectoryPointShadow);
                    _oBallShadow.x = pPos.x;
                    _oBallShadow.y = pPos.y;
                }
            }
    };
    
    this.getValue = function(){
        return _oBall;
    };
    
    this.reset = function(){
        _oBall.x = BALL_X;
        _oBall.y = BALL_Y;
        _oBall.regX = _oBall.width/2;
        _oBall.regY = _oBall.height/2;
        _oBall.scaleX = 0.4;
        _oBall.scaleY = 0.4;
        _oBall.rotation = 0;
        _oBall.visible = false;
        
        _pStartPoint.x = _oBall.x;
        _pStartPoint.y = _oBall.y;
        
        _pEndPoint.x = END_POINT_X;
        _pEndPoint.y = END_POINT_Y;
        
        STEP_SPEED_STADIUM = 0.5;
    };
    
    this.unload = function(){
        s_oStage.removeChild(oParentContainer);
    };
    
    this.update = function(){
        if(_bUpdate){
            this._updateBall();
        }
    };
    
    this._init(pStart, pEnd, pEndBounce, oParentContainer, iArea, oHitValue);
    
}