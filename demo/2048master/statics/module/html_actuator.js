function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.scoreContainer   = document.querySelector(".score-container");
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");

  this.score = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
	   /*var self = this;
	   var score = $('.score-container').text();
	   if(score!=0){
		   this.setMessage({'type':'game-switch','message':'正在为您提交成绩,请稍后...'})
		   if(!isNull(score)){
		 	  var plusIndex = score.indexOf('+');
		 	  if(score.indexOf('+')>-1){
		 		  score = score.substr(0,plusIndex);
		 	  }
		 	    $.ajax({
		 	        type: "GET",
		 	        url: 'gameResult.php',
		 	        data: {score:score},
		 	        dataType:"json",
		 	        success: function(msg){
		 	        	$('.bumpBox').hide();
		 	        	var msg ='<br/>您本次所得分数共计为:'+score+'<br/>';
		 	        	if(msg.result=='ok'){
		 	        		 msg += '排名为：第'+msg.myRank+'名！成绩不错，继续努力哦！';
		 	        	}else{
		 	        		
		 	        	}
		 	        	self.setMessage({'type':'game-over','message':'请努力加油哦！'})
		 	        }
		 	     });
		   }
	   }

	*/
	
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata.score);
    self.updateBestScore(metadata.bestScore);

    //Adaption Start
    var maxScore = 0;
    for(i in grid.cells){
      for(j in grid.cells[i]){
        if(grid.cells[i][j]){
          maxScore = maxScore > grid.cells[i][j].value ? maxScore : grid.cells[i][j].value;
        }
      }
    }
    //Adaption Close

    if (metadata.terminated) {
      if (metadata.over) {
        //Adaption Start
        //self.message(false); // You lose 
        self.message(false, maxScore); // You lose 
        //Adaption Close
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];

  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;
  //Adaption Start
  if(window.my_list){
    inner.textContent = my_list[tile.value] || tile.value;
    if(inner.textContent.substring(0,4)=='http'){
      inner.innerHTML = '<img src="'+inner.textContent+'" class="tile-inner"/>';
    }
   // inner.style.fontSize = (1/inner.textContent.length * girdWidth)+ 'px';
    inner.style.fontFamily = '黑体';
  }
  //Adaption Close

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScore = function (score) {
  this.clearContainer(this.scoreContainer);

  var difference = score - this.score;
  this.score = score;

  this.scoreContainer.textContent = this.score;

  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    this.scoreContainer.appendChild(addition);
  }
};

HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won, score) {
  var type    = won ? "game-won" : "game-over";
  //Adaption Start
  //var message = won ? "You win!" : "Game over!";
  var message = won ? "恭喜您，全新奥迪A3携未来驾到 " : (my_mark[score] || "Game over!");
  //Adaption Close
  var self = this;
  
   this.setMessage({'type':'game-switch','message':'正在为您提交成绩,请稍后...'})
  
  var score = $('.score-container').text();
  if(!isNull(score)){
	  var plusIndex = score.indexOf('+');
	  if(score.indexOf('+')>-1){
		  score = score.substr(0,plusIndex);
	  }
	    $.ajax({
	        type: "GET",
	        url: 'gameResult.php',
	        data: {score:score},
	        dataType:"json",
	        success: function(msg){
	        	$('.bumpBox').hide();
	        	var msg ='<br/>您本次所得分数共计为:'+score+'<br/>';
	        	if(msg.result=='ok'){
	        		 msg += '排名为：第'+msg.myRank+'名！成绩不错，继续努力哦！';
	        	}
	        	self.setMessage({'type':type,'message':message})
	        }
	     });
  }
   
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
  this.messageContainer.classList.remove("game-switch");
};
HTMLActuator.prototype.setMessage = function (metadata) {
	this.clearMessage();
	this.messageContainer.classList.add(metadata.type);
	this.messageContainer.getElementsByTagName("p")[0].textContent = metadata.message;
	};
