/**
 * =============================================
 *  #DEVELOPER NEEDS TO CHANGE THESE
 * =============================================
 */


var gamenametitle   = 'dsc_spl_act_isleofthelostrush',  // the title our tracking software is expecting i.e. (example spl_act_asteroids_cocos2d )
    ctoGameBuCode   = 'dc',                       //Replace** twds | dc | xd | djr
    ctoAssetId      = '514df10fee77c10de34b9f82';   //Replace ** ID from CMS  (example '4e5fb137837304f98c37c067' )




/**
 * =============================================================
 *  NO DEVELOPER CHANGES NEEDED  UNLESS PRODUCER DIRECTED
 * =============================================================
 */

var gn = gamenametitle.split("_");
var ctoAssetTypeCode = "gam";
var ctoGameEvent = "load";						// 'load' for now
var ctoGameSeriesCode= gn[0];    	            //BU code
var ctoGameOwnerName = "dol";       	  		// dol
var ctoGameTypeCode = gn[1];         			// spl or mp
var ctoGameGenreCode = gn[2];   	  		    // Game Genre
var ctoGameName = gn[3];      					// Game Name