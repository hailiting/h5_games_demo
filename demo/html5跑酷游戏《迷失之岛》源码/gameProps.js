/**
 * =============================================
 *  #DEVELOPER NEEDS TO CHANGE THESE
 * =============================================
*/
var gameProps = {
    // The live game link without the http://
    gameLink        : "games.disney.com/cinderella-midnight-dash/",
    
    // the image(s) that will be used for each individual site
    pinterestImg    : "http://a.dolimg.com/media/en-US/games/html5/sandbox/cin_la_spl_arc_midnightdash/media/images/CinderellaPinImage.jpg",
    twitterImg      :"http://a.dolimg.com/media/en-US/games/html5/sandbox/cin_la_spl_arc_midnightdash/media/images/CinderellaPinImage.jpg",
    facebookImg     : "http://a.dolimg.com/media/en-US/games/html5/sandbox/cin_la_spl_arc_midnightdash/media/images/CinderellaPinImage.jpg",
    
    // site specific verbiage
    twitterVerbiage : "Beat my Midnight Dash score of @placeholder@ at http://bit.ly/1CswVC3. Don't miss the live action retelling of Cinderella in theatres March 13.",
    pinterestVerbiage : "Try to beat my Midnight Dash score of @placeholder@ at http://games.disney.com/cinderella-midnight-dash and don't miss the live action retelling of Cinderella in theatres March 13 -  http://bit.ly/1xcopG5",
    facebookVerbiage : "Try to beat my Midnight Dash score of @placeholder@ at http://games.disney.com/cinderella-midnight-dash and don't miss the live action retelling of Cinderella in theatres March 13 -  http://bit.ly/1xcopG5",
    facebookCaption : 'Beat My Score!',
    

/**
*   1 = Portrait
*   0 = Landscape
*
*   May need this for future expansion
*/
    orientation : 0
/**
*
*   Properties used in the Rating.js file
*
*/

};
/**
*   ==================================================================================
*   ==================================================================================
*   ==================================================================================
*   ==================================================================================
*   Game Properties that developers should change WITH CAUTION
*   ==================================================================================
*   ==================================================================================
*   ==================================================================================
*   ==================================================================================
*/


/**
*
*   Game tracking properties used in the gameTracking.js file
*
*/


require(["./gameConfig/gameTracking.js",
         "./gameConfig/isl.js",
        "./gameContainer_30/jquery.min.js",
        "./gameContainer_30/HTML5GameContainer_3.0.js"
    ], function() 
        {
            console.log("HTML5GameContainer modules have loaded");   
            window.gameObj = new HTML5GameContainer();
        });