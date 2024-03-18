/**
*
*   @define {HTML5GameContaier} This class will be used by all Games Portal (games.disney.com, play.disney.com) HTML5 games.
*   It will help simplify and unify general game portal processes like tracking, social network sharing,
*   and future planned features like rating games.
*
*
*
*   ==================================================================================
*   ==================================================================================
*   WINDOW (Global) level variables
*       
*       gameObj global level game container object
*   ==================================================================================
*   ==================================================================================
*
*   Change 3.2.1    Placing the Canvas so it can be displayed above a WebGL canvas.
*   Change 3.2      Moved Canvas sizing functions from the modules to this container.
*   Change 3.1      Using MVC and Inheritence in the Modules
*   Change 3.0      Adding Modules to the code so we can pick and choose which modules to load.
*                   Gutted much of the code.  Took out the age gate, rating and sharing code to put them
*                   into separate modules.
*
*
*   Change 2.2.2    Added a loaded variable to make the loading process a two step load instead of one.
*   Change 2.2.0    Adding in Get App and Suggestion Engine capabilities.
*   Change 2.1.8    Backwards compatibility proofing.
*                    Corrected a problem with OpenFL adding moz-opaque to the canvas.  This would cause
*                   our canvas to be solid black and hide the game underneath.
*   Change 2.1.7.1  Made all console.log calls go to trace so I can turn them off in production
*   Change 2.1.7 -  Removed references to 'Score' to 'message' to make sharing more generic
*   Change 2.1.6 -  Generalizing more of the build process such as @SCORE@ -> @placeholder@
*   Change 2.1.5 -  Removed these changes
*   Change 2.1.3 -  An update to load sequence.
*   Change 2.1.2 -  Mouse and Touch are now being added via this class instead of on the index.html file.
*                    Events are now added via javascript and not jQuery.
*   Change 2.1.1 -  Mouse and Touch Events are now added to the parent DIV and passed down to
*                    all the canvases on the page.
*   Change 2.0.9 -  added more flexibility to the display of the sharing icons.
*                     • you can now change text size, text color, font adn actual verbiage of the 
*                        sharing caption
*                     • this script automatically measures the size of the sharing text caption so
*                        centering the icons under the text is easier.
*                     • you can choose which icons and in what order they appear.
*   Change 2.0.8 -  trying to implement facebook
*   Change 2.0.7 -  Added Text Color Attribute to the endGame method to be able to change the color
*                   of the 'Share Your Score!' text.
*/

/**
*   What version is this?
*/
var version = "3.2.1";

console.log("HTMLGameContainer loaded version "+version);

/**
*   Just makes the global gameProps variable local
*/
var gameProps = window.gameProps;


// two step loading process for our games
 if(window.loadFired && !window.containerLoaded) {
    window.continue();
    console.log("Page is completely loaded according to HTML5GameContainer.js");
}
        
window.containerLoaded = true;

function HTML5GameContainer(){
    this._name = 'HTML5GameContainer';
    // allows me to turn of console output for this file only
    this.allowTrace = true;
    this.hudContainer = "HUDcanvas";
    this.displayList = null;
    this.elem;
    this.gameHUDLocation;
    this.elemLeft;
    this.elemTop;
    this.activeModules = [];
    this.initialized = false;
    this.globallyVisible = false;   // this determines if the game has allowed the canvas to be visible or not.
    this.layerCount=0,              // how many layers are currently on screen.
        
        
    /**
    *
    *   Store some initial attributes of the canvas before we make any changes to it
    */
    this._canvasWidth = 0;
    this._canvasHeight = 0;
        
    /**
    *
    *   Dont directly set these variables outside the class.  Use the setter functions.
    */
    this._shrinkTime = 500;        // how many milliseconds we want to take to shrink the canvas
    this._shrinkAmount = 220;       // how many pixels we want to shrink the canvas by including 'Click Anywhere' text
    this._shrinkIntervalTime = 10;  // how many milliseconds between each step
    this._shrinkDirection = 'Width';// which attribute are we shrinking?  'Width' or 'Height'
    this._shrinkCallBack = function()  { } // handle callbacks after shrinking/growing is complete
    // use the formulat to set stepsize
    this.setStepSize(); 
    // used for shrinking the canvas
    this._animationINT = 0;
    // growing or shrinking?
    this._animationGrow = 0;
    
    window.globalActive = true;
    
    // mobile test
    this.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        Amazon: function() {
            var match = /(?:; ([^;)]+) Build\/.*)?\bSilk\/([0-9._-]+)\b(.*\bMobile Safari\b)?/.exec(navigator.userAgent);
            if (match) {
                //alert("Amazon match "+ match);
                if(match[1]) return true;
            }
        },
        any: function() {
            return (
                    this.Android() || 
                    this.BlackBerry() || 
                    this.iOS() || 
                    this.Opera() || 
                    this.Windows() || 
                    this.Amazon()
                   );
        }
    };
}

/**
*   create global HUDCanvas and HUDctx objects to reference from any script
*
*/
HTML5GameContainer.prototype = {
   
    /**
    *   @define {function} Creates the canvas element that displays on top of the game.  It includes
    *   the age gate when necessary and all the social network icons that are requested for each game.
    *
    *   
    */
    _initializeGameCanvas : function (){
        if(!this.initialized){
            
            // create the canvas tag that will be needed to display our icons
            $("<canvas id='"+this.hudContainer+"' name='"+this.hudContainer+"' class='hudCANVAS'></canvas>").insertAfter(GAMECanvas); 
            
            // save some initial attributes
            this._canvasHeight  = GAMECanvas.clientHeight;
            this._canvasWidth   = GAMECanvas.clientWidth;
            
            // reference our new canvas element and its context
            window.HUDCanvas    = document.getElementById(this.hudContainer);
            window.HUDctx       = HUDCanvas.getContext("2d");
            
            this.onResize();

            this.initialized    = true;
            this.globallyVisible = true;
            
            window.addEventListener("resize", function() { this.onResize(); }.bind(this) );
            
            window.DisplayList.init();
            // window.ButtonList.init();
        }
    },
    
    onResize : function ()
    {
        HUDCanvas.width         = GAMECanvas.width;
        HUDCanvas.height        = GAMECanvas.height;
        HUDCanvas.style.width   = document.body.clientWidth + "px";
        HUDCanvas.style.height  = document.body.clientHeight + "px";
        HUDCanvas.style.position = "absolute";
        HUDCanvas.style.zIndex  = 20;
        
        /*
            // check orientation.  If this is not the correct orientation we should hide our canvas
            if(this.checkOrientation()) HUDCanvas.style.display = " block";
            else HUDCanvas.style.display = "none";
        */
    },
    
    
    checkOrientation : function(){
        var orientationTemp;
        // landscape 0
        if(document.body.clientHeight > document.body.clientWidth) orientationTemp = 0;
        // portrait
        else orientationTemp = 1;
        
        if(orientationTemp == gameProps.orientation) return 1;
        else return 0;
    },

    /**
    *   @define {function} touch event listener for mobile devices.
    *   @private
    *
    */
    touch : function(event){
        this.trace("Called touch event");
        // find the size of the canvas
        var rect = HUDCanvas.getBoundingClientRect();
        
        // get the first touch event in the event
        var first = event.changedTouches[0];
        
        // find the x/y of the touch event which is offset by the elements offset attribute
        x = Math.round((first.pageX-rect.left)/(rect.right-rect.left)*HUDCanvas.width);
        y = Math.round((first.pageY-rect.top)/(rect.bottom-rect.top)*HUDCanvas.height);
        
        // find out of this coordinate is in our array of activeElements
        //this.testHit(x,y);
    },
    
    /**
    *   @define {function} canvasListener mouse event listener for desktops.
    *   @private
    *
    */
    canvasListener : function(event)
    {
        this.trace("Called canvasListener ["+this+"]");
        var rect = HUDCanvas.getBoundingClientRect();

        x = Math.round((event.clientX-rect.left)/(rect.right-rect.left)*HUDCanvas.width);
        y = Math.round((event.clientY-rect.top)/(rect.bottom-rect.top)*HUDCanvas.height);

        //window.ButtonList.hitTest(x,y);
    },
    
    
    /**
    *   @define {function} addActiveElement Make a universal button tracker.  The HTML5GameContainer needs to track
    *   all buttons and objects on canvas so canvas redraws can have the appropriate items displayed with the proper z depths.
    *
    *   @param active bool set to true if an item needs to be checked for clicks or touch events.
    *   @param
    */
    
    /*
    addElement : function(Elem,x,y,active,callback){
        console.log("Container trying to addElement");
        // if an item is active add it to the activeElements array to do hits tests on.
        if(active) {
            this.activeElements.push({left:x, top:y, width:Elem.width, height:Elem.height});
        } 
        // now add the item to the screen 
        //this.DisplayList.push(img,x,y,w,h);
    },
    */
    
    /**
    *   @define {function} testhit Iterate through our elements array and see if any of our registered
    *   elements are being hit.
    *
    *   @private
    *
    */
    
    /*
    testHit : function(x, y){
        console.log("Testing hit");
        this.activeElements.forEach(function(element) {
            if (y > element.top && y < element.top + element.height 
                && x > element.left && x < element.left + element.width) 
            {
                element.callback();
            }
        });
    },
    */
    
    
    addCanvasAttributes : function(){
        this.trace("Adding Canvas Attributes");
        
        var attr=GAMECanvas.attributes;
        
        for(var i=0; i < attr.length; i++){
            if(attr[i].name != "name" && attr[i].name != "id" && attr[i].name != "moz-opaque")  HUDCanvas.setAttribute(attr[i].name, attr[i].value);
        }
        
        // make sure the background stays transparent
        //canvasElem.setAttribute("background-color", "none");
        HUDCanvas.style.backgroundColor  = "transparent";
    },
    
    adjustPosition : function(){
        $(this.hudContainer).css("left",GAMECanvas.style.left);
        $(this.hudContainer).css("width",GAMECanvas.style.width);
    },


    //  Store age cookie
    checkCookie : function(){
        var name = "age=";
        var ca = document.cookie.split(';');

        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
                //name = i
            if (c.indexOf(name) != -1) 
            {
                var temp = c.split("=");
                this.trace("age ["+temp[1]+"]");
                return temp[1];
            }
        }

        return undefined;
    },
    
    // Store True for user over 13
    storeCookie : function(cvalue){
        var d = new Date();
        var cname = "age"; // name of the cookie
        var exdays = 1; // 1 day expiration on the cookie
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    
    gamePlayedCookie : function(){
        var cName = gamenametitle;
    },

    trace  : function(msg) {
        if(this.allowTrace) console.log(msg);   
    },

    listenerObj:parent,


    /**
    *
    *   @param canvas - the canvas (HTMLCanvasElement) we are going to copy
    *               canvas was - the id of the game canvas that we are going to clone the attributes of
    */
    initializeGameCanvas:function(myCanvas){

        // leaving legacy code of allowing canvas to be a string (name) of an element instead of the element itself.
        if(myCanvas.tagName == "CANVAS"){
            this.listenerObj = GAMECanvas = myCanvas;
        } else {
            // find the canvas on screen
            this.listenerObj = GAMECanvas = window.document.getElementById(myCanvas);
        }
        // initialize our canvas
        if( !this.initialized ) this._initializeGameCanvas();
        
        console.log("Canvas is ["+myCanvas+"]   GAMECanvas ["+GAMECanvas+"]");
    },

/*
    // turn hud pieces back on after rotating to the proper orientation
    goodRotation:function()
    {
        if(HUDActive)
        {
            //$("#"+this.hudContainer).css("display", "block");
            $("#endgameHUD").css("display", "block");
        }
    },
    // hide the hud while in the wrong orientation
    badRotation:function(){
        if(HUDActive)
        {
            $("#"+this.hudContainer).css("display", "none");
            $("#endgameHUD").css("display", "none");
        }
    },
*/
    getCanvas:function(){
        return HUDCanvas ; 
    },

    hideCanvas : function ()
    {
        this.trace("Hiding canvas");
        HUDCanvas.style.display = "none";
    },
    
    showCanvas : function()
    {
         HUDCanvas.style.display = "block";
    },
    
    /**
    *
    *   Make the canvas size adjustments
    *   clientWidth and clientHeight return integers we can test against.  width and height return strings with 'px' in them.
    */
    adjustCanvas : function(event)
    {
        // clientWidth returns just an int so we can do math on it but then width needs 'px' added to it
        // which direction are we adjusting?
        if(this._shrinkDirection == "Width" ) 
        {
            GAMECanvas.style.width = ( GAMECanvas.clientWidth - this._shrinkStep ) + "px";
            // now calculate the proper proportion in height
            GAMECanvas.style.height = (GAMECanvas.clientWidth * (this._canvasHeight/this._canvasWidth)) + "px";
        }
        else GAMECanvas.style.height = ( GAMECanvas.clientHeight - this._shrinkStep ) + "px";

        
        // are we growing or shrinking the canvas?
        if(!this._animationGrow)
        {
            // has it moved far enough?
            if(eval("GAMECanvas.client"+this._shrinkDirection) < eval("this._canvas"+this._shrinkDirection) - this._shrinkAmount + this._shrinkStep) {
                // its going to be small enough this step so stop the timer and set the canvas to the exact amount we want
                clearInterval(this._animationINT); 
                // make sure we got to exactly the size we wanted
                GAMECanvas.style[this._shrinkDirection.toLowerCase()] = eval("this._canvas"+this._shrinkDirection) - this._shrinkAmount + "px"; 
                // now turn off animating draw 
                this._animationStatus = SuggestionEngineView.POST_ANIMATION;
                // send the complete callback
                this._shrinkCallBack(this._animationGrow);
            } 
        } else {
            if(eval("GAMECanvas.client"+this._shrinkDirection) > eval("this._canvas"+this._shrinkDirection)) {
                // its going to be big enough this step so stop the timer and set the canvas to the exact amount we want
                clearInterval(this._animationINT); 
                // make sure we got to exactly the size we wanted
                GAMECanvas.style[this._shrinkDirection.toLowerCase()] = eval("this._canvas"+this._shrinkDirection) + "px"; 
                // send the complete callback
                this._shrinkCallBack(this._animationGrow);
            } 
        }

        // redraw the canvas
        window.DisplayList.draw();
    },
        
    /**
    *
    *   Prepare our variables for shrinking the canvas
    *   **Before** calling this function set  this._animationStepSize
    *
    *   @param direction {string} width or height
    */
    shrinkCanvas : function(direction){
        this._animationGrow = 0;
        // in case there is an interval going lets stop it
        if(this._animationINT > 0) clearInterval(this._animationINT); 
        // incase the attribute was set without using the setter lets make the calculation
        this.setStepSize();
        // set up our Interval timer
        this._animationINT = setInterval(this.adjustCanvas.bind(this),this._shrinkIntervalTime); 
        if(typeof direction != undefined) this._shrinkDirection = direction; // set the direction.  _shrinkDirection is defaulted to width.
        
    },

    /**
    *
    *   Prepare our variables for expanding the canvas back to its full size
    *   **Before** calling this function set  this._animationStepSize
    */
    animatedClose : function()
    {
        this.trace("Animated CLOSE");
        // in case there is an interval going lets stop it
        if(this._animationINT > 0) clearInterval(this._animationINT); 
        // reset some variables
        this.setStepSize();
        this._shrinkStep *= -1;
        this._animationGrow = 1;
        // set up our Interval timer
        this._animationINT = setInterval(this.adjustCanvas.bind(this),this._shrinkIntervalTime);
    },
    
    /**
    *   If these variables are changed we need to adjust the stepSize
    *
    */
    set shrinkTime(t) {
        this._shrinkTime = t;        // how many milliseconds we want to take to shrink the canvas
    },
    
    set shrinkAmount(a) {
        this._shrinkAmount = a;       // how many pixels we want to shrink the canvas by
    },
    
    set shrinkIntervalTime(i)
    {
        this._shrinkIntervalTime = i;  // how many milliseconds between each step
    },
    
    setStepSize : function () {
        this._shrinkStep =  this._shrinkAmount / (this._shrinkTime / this._shrinkIntervalTime);  // how many pixels per step do we need to shrink
    }

};