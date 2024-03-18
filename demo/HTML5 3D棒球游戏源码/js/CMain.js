function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("baseball_soundtrack",{ loop:-1});
                s_oBgSound = createjs.Sound.play("crowd_cheering",{ loop:-1});
                s_oBgSound.volume = 0;
            }
            this.gotoMenu();
         }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/baseball_buzzer.ogg", "baseball_buzzer");
                createjs.Sound.registerSound("./sounds/baseball_countdown_1.ogg", "baseball_countdown1");
                createjs.Sound.registerSound("./sounds/baseball_countdown_2.ogg", "baseball_countdown2");
                createjs.Sound.registerSound("./sounds/baseball_crowd_homerun.ogg", "baseball_crowd_homerun");
                createjs.Sound.registerSound("./sounds/baseball_crowd_strike.ogg", "baseball_crowd_strike");
                createjs.Sound.registerSound("./sounds/baseball_drop_bounce_grass.ogg", "baseball_drop_bounce_grass");
                createjs.Sound.registerSound("./sounds/baseball_hit_ball.ogg", "baseball_hit_ball");
                createjs.Sound.registerSound("./sounds/crowd_cheering.ogg", "crowd_cheering");
                createjs.Sound.registerSound("./sounds/baseball_applauses.ogg", "baseball_applauses");
                createjs.Sound.registerSound("./sounds/baseball_soundtrack.ogg", "baseball_soundtrack");
                createjs.Sound.registerSound("./sounds/crowd_ohhh.ogg", "crowd_ohhh");
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/baseball_buzzer.mp3", "baseball_buzzer");
                createjs.Sound.registerSound("./sounds/baseball_countdown_1.mp3", "baseball_countdown1");
                createjs.Sound.registerSound("./sounds/baseball_countdown_2.mp3", "baseball_countdown2");
                createjs.Sound.registerSound("./sounds/baseball_crowd_homerun.mp3", "baseball_crowd_homerun");
                createjs.Sound.registerSound("./sounds/baseball_crowd_strike.mp3", "baseball_crowd_strike");
                createjs.Sound.registerSound("./sounds/baseball_drop_bounce_grass.mp3", "baseball_drop_bounce_grass");
                createjs.Sound.registerSound("./sounds/baseball_hit_ball.mp3", "baseball_hit_ball");
                createjs.Sound.registerSound("./sounds/crowd_cheering.mp3", "crowd_cheering");
                createjs.Sound.registerSound("./sounds/baseball_applauses.mp3", "baseball_applauses");
                createjs.Sound.registerSound("./sounds/baseball_soundtrack.mp3", "baseball_soundtrack");
                createjs.Sound.registerSound("./sounds/crowd_ohhh.mp3", "crowd_ohhh");
        }
        
        RESOURCE_TO_LOAD += 11;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("sitelogo2","./sprites/sitelogo2.png");
        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("logo_menu","./sprites/logo_menu.png");
        
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("score_panel","./sprites/score_panel.png");
        s_oSpriteLibrary.addSprite("air_view","./sprites/air_view.jpg");
        s_oSpriteLibrary.addSprite("ball","./sprites/ball.png");
        s_oSpriteLibrary.addSprite("ball_shadow","./sprites/ball_shadow.png");
        
        s_oSpriteLibrary.addSprite("area_bottom","./sprites/area_bottom.png");
        s_oSpriteLibrary.addSprite("area_top","./sprites/area_top.png");
        s_oSpriteLibrary.addSprite("crowd_left","./sprites/crowd_left.png");
        s_oSpriteLibrary.addSprite("crowd_right","./sprites/crowd_right.png");
        
        s_oSpriteLibrary.addSprite("1","./sprites/1.png");
        s_oSpriteLibrary.addSprite("2","./sprites/2.png");
        s_oSpriteLibrary.addSprite("3","./sprites/3.png");
        s_oSpriteLibrary.addSprite("start_msg","./sprites/start_msg.png");
        s_oSpriteLibrary.addSprite("strike_msg","./sprites/strike_msg.png");
        
        for(var i = 0; i<NUM_SPRITE_BATTING; i++){
            s_oSpriteLibrary.addSprite("batter_batting_"+i,"./sprites/batter_hit/batter_batting_"+i+".png");
        }
        for(var i = 0; i<NUM_SPRITE_PLAYERS; i++){
            s_oSpriteLibrary.addSprite("batter_idle_"+i,"./sprites/batter_idle/batter_idle_"+i+".png");
        }
        for(var i = 0; i<NUM_SPRITE_PLAYERS; i++){
            s_oSpriteLibrary.addSprite("pitcher_"+i,"./sprites/pitcher/pitcher_"+i+".png");
        }
        
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();
            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
            
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    

    this.gotoGame = function(){
        
        _oGame = new CGame(_oData);   						
        _iState = STATE_GAME;

        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate = function(){
            _bUpdate = false;
    };

    this.startUpdate = function(){
            _bUpdate = true;
    };
    
    this._update = function(event){
		if(_bUpdate === false){
			return;
		}
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_bBounce = true;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oStadium;
var s_oBall;
var s_oSpriteLibrary;
var s_oSoundtrack;
var s_oBgSound;
var s_oCanvas;
