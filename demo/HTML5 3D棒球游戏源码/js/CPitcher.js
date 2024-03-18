function CPitcher(oParentContainerPitcher){
    var _aPitcher = new Array();
    
    this._init = function(oParentContainerPitcher){
        
        for(var i = 0; i<NUM_SPRITE_PLAYERS; i++){
            _aPitcher.push(createBitmap(s_oSpriteLibrary.getSprite("pitcher_"+i)));
            _aPitcher[i].x = PITCHER_X;
            _aPitcher[i].y = PITCHER_Y;
            _aPitcher[i].rotation = 0;
            _aPitcher[i].visible = false;
            oParentContainerPitcher.addChild(_aPitcher[i]);
        }
        
        _aPitcher[0].visible = true;
    };
    
    this.viewPitcher = function(iPitcher){
        _aPitcher[iPitcher].visible = true;
    };
    
    this.hidePitcher = function(iPitcher){
        _aPitcher[iPitcher].visible = false;
    };
    
    this.getValue = function(){
        return _bCellOccupied;
    };
    
    this.unload = function(i){
        
    };
    
    s_oPticher = this;
    
    this._init(oParentContainerPitcher);
    
}
s_oPticher = null;