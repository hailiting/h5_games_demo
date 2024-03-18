function CBatter(oParentContainer){
    var _aBatter_batter = new Array();
    var _aBatter_idle = new Array();
    
    this._init = function(oParentContainer){
        
        for(var i = 0; i<NUM_SPRITE_BATTING; i++){
            _aBatter_batter.push(createBitmap(s_oSpriteLibrary.getSprite("batter_batting_"+i)));
            _aBatter_batter[i].x = BATTER_X-180;
            _aBatter_batter[i].y = BATTER_Y-45;
            _aBatter_batter[i].rotation = 0;
            _aBatter_batter[i].visible = false;
            oParentContainer.addChild(_aBatter_batter[i]);
        }
        
        for(var i = 0; i<NUM_SPRITE_PLAYERS; i++){
            _aBatter_idle.push(createBitmap(s_oSpriteLibrary.getSprite("batter_idle_"+i)));
            _aBatter_idle[i].x = BATTER_X;
            _aBatter_idle[i].y = BATTER_Y;
            _aBatter_idle[i].rotation = 0;
            _aBatter_idle[i].visible = false;
            oParentContainer.addChild(_aBatter_idle[i]);
        }
        _aBatter_idle[0].visible = true;
    };
    
    this.viewBatter = function(iBatter, bState){
        if(!bState){
            _aBatter_idle[iBatter].visible = true;
        }else{
            _aBatter_batter[iBatter].visible = true;
        }
        
    };
    
    this.hideBatter = function(iBatter, bState){
        if(!bState){
            _aBatter_idle[iBatter].visible = false;
        }else{
            _aBatter_batter[iBatter].visible = false;
        }
    };
    
    this.getValue = function(){
        return _bCellOccupied;
    };
    
    this.unload = function(i){
        
    };
    
    s_oBatter = this;
    
    this._init(oParentContainer);
    
}
s_oBatter = null;