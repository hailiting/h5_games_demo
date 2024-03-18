function CBall(oParentContainerBall){
    
    var _iCntFrames = 0;
    var _iMaxFrames =40;
    var _iWidth;
    var _iHeight;
    
    var _bUpdate;
    var _bHitted;

    var _oBall;
    var _oHitValue;
    
    var _pStartPoint = {x: 0, y: 0};
    var _pEndPoint = {x: 0, y: 0};
    
    var _aTrajectoryPoint;
    
    this._init = function(oParentContainerBall){   
        
        var oSprite = s_oSpriteLibrary.getSprite("ball");
        _iWidth =  oSprite.width;
        _iHeight = oSprite.height;
        _oBall = createBitmap(oSprite);
        
        this.reset(oSprite);
        
        oParentContainerBall.addChild(_oBall);
    };
	
	this.reset = function(){
        _oBall.x = BALL_X;
        _oBall.y = BALL_Y;
        _oBall.regX = _iWidth/2;
        _oBall.regY = _iHeight/2;
        _oBall.scaleX = 0.4;
        _oBall.scaleY = 0.4;
        _oBall.rotation = 0;
        _oBall.visible = false;
        
        _pStartPoint.x = _oBall.x;
        _pStartPoint.y = _oBall.y;
        
        _pEndPoint.x = END_POINT_X;
        _pEndPoint.y = END_POINT_Y;
        
        STEP_SPEED_BALL_HITTED = 1.3;
        
        _bHitted = false;
    };
    
    this.viewBall = function(){
        _oBall.visible = true;
        this._calculateMid(_pStartPoint, _pEndPoint);
        _bUpdate = true;
    };
    
    this.hideBall = function(){
        _oBall.visible = false;
    };
    
    
    this._calculateMid = function(pStartPoint, pEndPoint){
        var t0;
        var iRandT0 = Math.floor(Math.random() * 50) + 1;
        if(_bHitted === true){
            if (pEndPoint.x < CANVAS_WIDTH/2) {
                if (pEndPoint.y > (CANVAS_HEIGHT / 2)) {
                        t0 = new createjs.Point(Math.floor(Math.random() * (CANVAS_WIDTH/2)) + 100, ((CANVAS_HEIGHT/2)-200)-iRandT0);
                }else {
                        t0 = new createjs.Point(Math.floor(Math.random() * (CANVAS_WIDTH/2)) + 100, ((CANVAS_HEIGHT/2)-200)+iRandT0);
                }
            }else if (pEndPoint.x > CANVAS_WIDTH/2) {
                if (pEndPoint.y > (CANVAS_HEIGHT / 2)) {
                        t0 = new createjs.Point(Math.floor(Math.random() * (CANVAS_WIDTH/2)) + 300, ((CANVAS_HEIGHT/2)-200)-iRandT0);
                }else {
                        t0 = new createjs.Point(Math.floor(Math.random() * (CANVAS_WIDTH/2)) + 300, ((CANVAS_HEIGHT/2)-200)+iRandT0);
                }
            }else{
                if (pEndPoint.x > (CANVAS_WIDTH / 2)) {
                    t0 = new createjs.Point((CANVAS_WIDTH/2)-50, Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100);
                }else {
                    t0 = new createjs.Point((CANVAS_WIDTH/2)+50, Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100);
                }
            }
        }else{
            var iVal =  Math.random();
            if (iVal < 0.5) {
                t0 = new createjs.Point((CANVAS_WIDTH/2)-50, Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100);
            }else {
                t0 = new createjs.Point((CANVAS_WIDTH/2)+50, Math.floor(Math.random() * (CANVAS_HEIGHT / 2) - 100) + 100);
            }
        }
        
        _aTrajectoryPoint = {start:pStartPoint, end:pEndPoint, traj:t0};
    };
    
    this._updateBall = function(){
           _iCntFrames += STEP_SPEED_BALL_HITTED;
            if (_iCntFrames > _iMaxFrames ) {
                _iCntFrames = 0;
                _oBall.visible=false; //this is to resolve an issue when ball respawn
                _bUpdate = false;
                if(_bHitted === true){
                    s_oGame._viewStadium(_oHitValue, _pEndPoint);
                }else{
                    s_oGame._ballMissed();
                }
                
                $(s_oMain).trigger("next_launch");
            }

            var fLerp; 
            fLerp=easeLinear( _iCntFrames, 0, 1, _iMaxFrames);
            
            var pPos = getTrajectoryPoint(fLerp, _aTrajectoryPoint);
            _oBall.x = pPos.x;
            _oBall.y = pPos.y;
            if(_bHitted === true){
                if(_oBall.scaleX >= 0){
                    _oBall.scaleX -= 0.03;
                    _oBall.scaleY -= 0.03;
                }else{
                    STEP_SPEED_BALL_HITTED -=0.2;
                }
            }else{
                if(_oBall.scaleX < 1){
                    _oBall.scaleX += 0.03;
                    _oBall.scaleY += 0.03;
                }else{
                    STEP_SPEED_BALL_HITTED +=0.2;
                }
            }
    };
    
    this.getValue = function(){
        return _oBall;
    };
    
    this.hittedControl = function(){
        STEP_SPEED_BALL_HITTED = 2;

        if(_oBall.y >= PERFECT_HIT_Y-OFFSET_FOR_PERFECT_HIT && _oBall.y <= PERFECT_HIT_Y+OFFSET_FOR_PERFECT_HIT){

            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("baseball_hit_ball");
            }
            if(_aTrajectoryPoint.traj.x < CANVAS_WIDTH/2){   //IF IS COMING FROM LEFT
                _iCntFrames = 0;
                _pStartPoint.x = PERFECT_HIT_X;
                _pStartPoint.y = PERFECT_HIT_Y;
                _pEndPoint.x = END_POINT_X_PERFECT_LEFT;
                _pEndPoint.y = END_POINT_Y_PERFECT;
                _oHitValue = _oBall.y - PERFECT_HIT_Y;
                if(_oHitValue < 0){
                    _oHitValue *= -1;
                }
                _bHitted = true;
                _aTrajectoryPoint = {start:_pStartPoint, end:_pEndPoint, traj:_pEndPoint};
            }else{
                _iCntFrames = 0;
                _pStartPoint.x = PERFECT_HIT_X;
                _pStartPoint.y = PERFECT_HIT_Y;
                _pEndPoint.x = END_POINT_X_PERFECT_RIGHT;
                _pEndPoint.y = END_POINT_Y_PERFECT;
                _oHitValue = _oBall.y - PERFECT_HIT_Y;
                if(_oHitValue < 0){
                    _oHitValue *= -1;
                }
                _bHitted = true;
                _aTrajectoryPoint = {start:_pStartPoint, end:_pEndPoint, traj:_pEndPoint};
            }
            
        }else if(_oBall.y >= ALMOST_MINUS && _oBall.y <= PERFECT_HIT_Y){

            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("baseball_hit_ball");
            }
            if(_aTrajectoryPoint.traj.x < CANVAS_WIDTH/2){   //IF IS COMING FROM LEFT
                _iCntFrames = 0;
                _pStartPoint.x = PERFECT_HIT_X;
                _pStartPoint.y = PERFECT_HIT_Y;
                _pEndPoint.x = END_POINT_X_ALMOST_MINUS_RIGHT;
                _pEndPoint.y = END_POINT_Y_ALMOST_MINUS;
                _oHitValue = _oBall.y - PERFECT_HIT_Y;
                if(_oHitValue < 0){
                    _oHitValue *= -1;
                }
                _bHitted = true;
                _aTrajectoryPoint = {start:_pStartPoint, end:_pEndPoint, traj:_pEndPoint};
            }else{
                _iCntFrames = 0;
                _pStartPoint.x = PERFECT_HIT_X;
                _pStartPoint.y = PERFECT_HIT_Y;
                _pEndPoint.x = END_POINT_X_ALMOST_MINUS_LEFT;
                _pEndPoint.y = END_POINT_Y_ALMOST_MINUS;
                _oHitValue = _oBall.y - PERFECT_HIT_Y;
                if(_oHitValue < 0){
                    _oHitValue *= -1;
                }
                _bHitted = true;
                _aTrajectoryPoint = {start:_pStartPoint, end:_pEndPoint, traj:_pEndPoint};
            }
            
        }else if(_oBall.y <= ALMOST_PLUS && _oBall.y >= PERFECT_HIT_Y){

            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                createjs.Sound.play("baseball_hit_ball");
            }
            if(_aTrajectoryPoint.traj.x < CANVAS_WIDTH/2){   //IF IS COMING FROM LEFT
                _iCntFrames = 0;
                _pStartPoint.x = PERFECT_HIT_X;
                _pStartPoint.y = PERFECT_HIT_Y;
                _pEndPoint.x = END_POINT_X_ALMOST_PLUS_RIGHT;
                _pEndPoint.y = END_POINT_Y_ALMOST_PLUS;
                _oHitValue = _oBall.y - PERFECT_HIT_Y;
                if(_oHitValue < 0){
                    _oHitValue *= -1;
                }
                _bHitted = true;
                _aTrajectoryPoint = {start:_pStartPoint, end:_pEndPoint, traj:_pEndPoint};
            }else{
                _iCntFrames = 0;
                _pStartPoint.x = PERFECT_HIT_X;
                _pStartPoint.y = PERFECT_HIT_Y;
                _pEndPoint.x = END_POINT_X_ALMOST_PLUS_LEFT;
                _pEndPoint.y = END_POINT_Y_ALMOST_PLUS;
                _oHitValue = _oBall.y - PERFECT_HIT_Y;
                if(_oHitValue < 0){
                    _oHitValue *= -1;
                }
                _bHitted = true;
                _aTrajectoryPoint = {start:_pStartPoint, end:_pEndPoint, traj:_pEndPoint};
            }
            
        }
        _bUpdate = true;
        
    };
    
    
    
    this.unload = function(){

    };
    
    this.update = function(){
        if(_bUpdate){
            this._updateBall();
        }
    };
    
    this._init(oParentContainerBall);
    
}