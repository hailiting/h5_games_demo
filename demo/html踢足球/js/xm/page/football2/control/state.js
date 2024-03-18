define(['app', 'utils/canvas', 'page/football2/element/ball', 'page/football2/element/role', 'page/football2/element/enmery', 'page/football2/pool/objectpool', 'utils/api', 'utils/tool'],

// Map dependencies from above array.
function(app, Canvas, Ball, Role, Enmery, ObjectPool, Api, Tool) {

	var BasePage = {};

	// Default View.
	BasePage.View = Backbone.View.extend({
		canvas : null,
		texTure : null,
		ball : null,
		role : null,

		input : null,

		framerate : 60,
		interval : null,

		pipes : [],
		idNum : 0,

		pool : null,

		addPipeTime : 65,
		nowTime : 0,

		//screenHeight : $(window).height() - 15,
		//screenWidth : $(window).width(),
		screenHeight : 348,
		screenWidth : 320,

		score : 0,

		scoreDiv : null,

		frameRateTime : null,

		gel : 0.005,
		startTime : null,

		speedBall : 5,
		speedEnmery : 2,

		startNum : 0,

		pageY : null,

		gameId : null,

		speedRY : 5,
		initialize : function(value) {
			this.canvas = new Canvas.View({
				el : value.stage
			})

			this.initClass();

			var con = this

			$('.overlay2').show();
			$('#p3').show().animate({
				marginLeft : "14px",
				marginTop : "25px",
				height : "188px",
				width : "156px",
				opacity : 0
			}, 900, 'linear', function() {
				$('#p2').show();
				$('#p3').hide()
			});
			$('#p2').delay(1000).animate({
				marginLeft : "14px",
				marginTop : "25px",
				height : "188px",
				width : "156px",
				opacity : 0
			}, 900, function() {
				$('#p1').show();
				$('#p2').hide()
			});
			//
			$('#p1').delay(2000).animate({
				marginLeft : "14px",
				marginTop : "25px",
				height : "188px",
				width : "156px",
				opacity : 0
			}, 900, function() {
				$('#p1').hide();
			});

			setTimeout(function() {
				Api.getList().done(function(value) {

					$('.an').show();
					con.gameId = value.gameid
					window.currentGameId = value.gameid
					//   setTimeout($.proxy(con.startGame,con),3000);
					// $.proxy(con.startGame,con);
					con.startGame();
					$(document).on('touchstart', $.proxy(con.clickTouch, con))
					$(document).on('touchend', $.proxy(con.clickStart, con))
					$(document).on('touchmove', $.proxy(con.keyBroad, con))

				});

			}, 3000);

			/*this.startGame()
			$(document).on('touchstart', $.proxy(con.clickTouch, con))
			$(document).on('touchend', $.proxy(con.clickStart, con))
			$(document).on('touchmove', $.proxy(con.keyBroad, con))*/
			//console.log(this.screenWidth)
			///this.speedEnmery=value.zo*1.5
			//this.speedBall=value.zo*4
			console.log(this.speedEnmery, this.speedBall)

			//$(document).on('click', $.proxy(this.clickStart, this))
			//$(document).on('mousemove', $.proxy(this.keyBroad, this))
			//$(document).on('keydown', $.proxy(this.keyBroad, this))
		},
		initClass : function() {

			this.texTure = _.where(app.res, {
				id : "0"
			})
			this.role = new Role.View({
				id : "0",
				img : this.texTure[0].img
			})
			this.role.changePos({
				//y:0,
				//x:0
				x : (this.screenWidth - this.role.rec.width) / 2 + 5,
				y : this.screenHeight - this.role.rec.height - 8
			})

			//this.role.translt.scale=5
			this.ball = new Ball.View({
				id : "0",
				img : this.texTure[0].img
			})
			this.ball.changePos({
				//x:100,
				x : (this.screenWidth - this.ball.rec.width) / 2 + 2,
				y : this.screenHeight - this.role.ranage.height - 8 - this.ball.ranage.height
			})
			//this.pool = new ObjectPool.View()
			this.creatEnemy()
		},
		clickTouch : function(e) {
			var orig = e.originalEvent;
			$('.an').hide()
			this.pageY = orig.changedTouches[0].pageY
			console.log(this.pageY)
		},
		clickStart : function(e) {
			//alert('dajskd')
			var orig = e.originalEvent;
			if (!this.input) {
				this.input = 'start'

				this.ball.speedY = -this.speedBall
				this.ball.translt.y += -10
				//	this.startTime = new Date()
				var con = this
				window.track()
			}
		},
		creatEnemy : function() {
			var xpos = [this.screenWidth * 0.2, this.screenWidth * 0.6, this.screenWidth * 0.4, this.screenWidth * 0.7, this.screenWidth * 0.5]
			for (var i = 0; i < 5; i++) {
				var tt = new Enmery.View({
					id : String(i),
					img : this.texTure[0].img
				})
				tt.changePos({
					'y' : 55 + Math.floor(i / 2) * 83,
					'x' : xpos[i]
				})
				if (i == 2 || i == 3) {//2
					tt.speedX = 3
				}
				if (i == 1 || i == 0) {//1
					tt.speedX = -this.speedEnmery
				}
				if (i == 4) {
					tt.speedX = 3
				}
				this.pipes.push(tt)
			}
		},
		startGame : function() {
			this.startTime = new Date();
			for (var i = 0; i < this.pipes.length; i++) {
				this.canvas.addChild(this.pipes[i].cacheCanvas, this.pipes[i].rec, this.pipes[i].translt)
			}
			this.canvas.addChild(this.role.cacheCanvas, this.role.rec, this.role.translt)
			this.canvas.addChild(this.ball.cacheCanvas, this.ball.rec, this.ball.translt)
			this.canvas.render()
			this.frameRateTime = new Date().getTime()
			this.interval = setInterval($.proxy(this.render, this), 1000 / this.framerate)
		},
		keyBroad : function(e) {
			//console.log(e.pageX)
			var orig = e.originalEvent;
			var en = orig.changedTouches[0].pageX
			//var en = e.pageX
			var jg = ($(window).width() - 320) / 2
			var dis = en - jg < 0 ? 20 : en - jg
			if (dis > 320 - this.role.ranage.width) {
				dis = 320 - this.role.ranage.width
			}
			//console.log(dis)
			if (this.input != 'start') {
				this.ball.translt.x = dis
			}
			this.role.translt.x = dis
		},
		reset : function() {
			/*this.role.changePos({
				//y:0,
				//x:0
				x : (this.screenWidth - this.role.rec.width) / 2 + 5,
				y : this.screenHeight - this.role.rec.height - 8
			})*/
			/*this.ball.changePos({
				//x:100,
				x : this.role.translt.x+1,
				y : this.screenHeight - this.role.ranage.height - 8 - this.ball.ranage.height
			})0*/
			this.ball.speedY=0
			this.ball.speedX=0
			//this.input=null
		},
		hitTest : function() {
			var con = this
			var tt = false
			/*_.each(this.pipes, function(value, index) {
			tt = con.recHitest(con.ball, value)
			})*/
			//console.log(this.ball.translt.y)
			if (this.ball.translt.y + this.ball.speedY > 55 - this.ball.ranage.height && this.ball.translt.y + this.ball.speedY < 55 + 15 + 38) {

				this.recHitest(this.ball, this.pipes[0])
				this.recHitest(this.ball, this.pipes[1])
			}
			if (this.ball.translt.y + this.ball.speedY > 55 + 83 - this.ball.ranage.height && this.ball.translt.y + this.ball.speedY < 55 + 83 + 15 + 38) {

				this.recHitest(this.ball, this.pipes[2])
				this.recHitest(this.ball, this.pipes[3])
			}
			if (this.ball.translt.y + this.ball.speedY > 55 + 83 * 2 - this.ball.ranage.height && this.ball.translt.y + this.ball.speedY < 55 + 83 * 2 + 15 + 38) {

				this.recHitest(this.ball, this.pipes[4])
			}
			if (this.ball.translt.y + this.ball.speedY + this.ball.ranage.height > this.screenHeight - this.role.ranage.height - 10 - 8 && this.ball.translt.y + this.ball.speedY < this.screenHeight - this.role.ranage.height - 8 + 15 + 38) {
				this.recHitest(this.ball, this.role, true)
			}
			/*if (!tt) {
			 tt = this.recHitest(this.ball, this.role)
			 }*/
			if (!tt) {
				if (this.ball.translt.x + this.ball.speedX <= 0) {
					this.ball.translt.x = 0
					this.ball.speedX = -this.ball.speedX
					tt = true
				}

				if (this.ball.translt.x + this.ball.speedX >= this.screenWidth - this.ball.ranage.width) {
					this.ball.translt.x = this.screenWidth - this.ball.ranage.width
					this.ball.speedX = -this.ball.speedX
					tt = true
				}

				//meng kuang
				if (this.ball.translt.y + this.ball.speedY <= 0 && this.ball.translt.y + this.ball.speedY >= -15 && (this.ball.translt.x < 136 || this.ball.translt.x > 187 - this.ball.ranage.width)) {
					this.ball.translt.y = 0
					this.ball.speedY = Math.abs(this.ball.speedY)
					tt = true
				}
				if (this.ball.translt.y + this.ball.speedY + this.ball.ranage.height >= this.screenHeight) {
					
					this.ball.translt.y = this.screenHeight - this.ball.ranage.height
					this.ball.speedY = -Math.abs(this.ball.speedY)
					tt = true
				}

			}
			if (tt) {
				_.each(this.pipes, function(value, index) {
					//console.log(con.screenWidth - value.speedX-value.rec.width)
					con.canvas.addChild(value.cacheCanvas, value.rec, value.translt)
				})
				this.canvas.addChild(this.role.cacheCanvas, this.role.rec, this.role.translt)
				this.canvas.addChild(this.ball.cacheCanvas, this.ball.rec, this.ball.translt)
				this.canvas.render()
			}
			return tt
		},
		recHitest : function(value1, value2, bl) {
			var rand = {
				'y' : value1.translt.y + value1.speedY,
				'x' : value1.translt.x + value1.speedX,
				'width' : value1.ranage.width,
				'height' : value1.ranage.height
			}
			var rolle = {
				'y' : value2.translt.y + 15,
				'x' : value2.translt.x,
				'width' : value2.ranage.width,
				'height' : value2.ranage.height
			}
			if (rand.x + rand.width > rolle.x && rand.x < rolle.x + rolle.width) {
				//console.log(value1.translt.y + rand.height, rolle.y)
				if (value1.translt.y + rand.height <= rolle.y) {
					value1.translt.y = rolle.y - rand.height
					if (value1.speedY > 0 && !bl) {
						if (Math.abs(value1.speedY) < this.speedRY) {
							value1.speedY = -this.speedRY-1
						} else {
							value1.speedY = -value1.speedY-1
						}
					}
					if (bl) {
						//console.log('www')
						value1.speedY = -this.speedBall-1
					}
					value1.translt.x = value1.translt.x + value1.speedX
					return true
				}
				if (value1.translt.y >= rolle.y + rolle.height) {
					value1.translt.y = rolle.y + rolle.height
					if (value1.speedY < 0 && !bl) {
						if (Math.abs(value1.speedY) < this.speedRY) {
							value1.speedY = this.speedRY+1
						} else {
							value1.speedY = value1.speedY+1
						}

					}
					if (bl) {
						
						value1.speedY = this.speedBall+1
					}
					//value1.speedY = this.speedBall
					value1.translt.x = value1.translt.x + value1.speedX
					return true
				}
				if (value1.translt.x + rand.width < rolle.x + rolle.width / 2) {
					//value1.speedX = -this.speedBall
					//value1.speedY = -this.speedBall
					if (bl) {
						//console.log('aa', rolle.x - rand.width, value1.translt.y)
						value1.speedY = -this.speedBall
						//value1.speedX=-this.speedBall
						//console.log(value2.speedX)
						value1.translt.y = rolle.y - rand.height
						//console.log(this.ball.speedX,this.ball.translt.y)
					}
					if (value2.speedX && !bl) {
						//value1.speedX = Math.abs(Math.floor(value2.speedX * 1.8))
						value1.speedX=-this.speedRY
						if (Math.abs(value1.speedY) < this.speedRY) {
							value1.speedY = -this.speedRY
						}
						value1.translt.x = rolle.x - rand.width
					}

					return true
				}
				if (value1.translt.x > rolle.x + rolle.width / 2) {
					//value1.speedX = this.speedBall
					//value1.speedY = -this.speedBall
					if (bl) {
						value1.speedY = -this.speedBall
						//value1.speedX=this.speedBall
						//console.log(this.ball.speedX)
						value1.translt.y = rolle.y - rand.height
						console.log(value2.speedX)
						//value1.translt.x = rolle.x + rand.width
					}

					if (value2.speedX && !bl) {
						//value1.speedX = -Math.abs(Math.floor(value2.speedX * 1.8))
						value1.speedX=this.speedRY
						if (Math.abs(value1.speedY) < this.speedRY) {
							value1.speedY = -this.speedRY
						}
						
						value1.translt.x = rolle.x + rand.width
					}

					return true
				}
			}
			return false
		},
		render : function() {
			var con = this
			this.hitTest()
			//console.log(this.ball.speedY)
			_.each(this.pipes, function(value, index) {
				//console.log(con.screenWidth - value.speedX-value.rec.width)
				if (value.translt.x > -value.speedX || value.translt.x < con.screenWidth - value.speedX - value.rec.width) {
					value.translt.x += value.speedX
				}
				if (value.id == 0 || value.id == 1) {
					//console.log(con.pipes[0].translt.x,con.pipes[1].translt.x)
					if (value.translt.x + value.speedX < 0 && value.id == 0) {
						value.speedX = -value.speedX
						con.pipes[1].speedX = value.speedX
						con.pipes[1].translt.x = value.translt.x + con.screenWidth * 0.4
					}
					if (value.translt.x > con.screenWidth - value.rec.width && value.id == 1) {
						value.speedX = -value.speedX
						con.pipes[0].speedX = value.speedX
						con.pipes[0].translt.x = value.translt.x - con.screenWidth * 0.4
					}
				}
				if (value.id == 2 || value.id == 3) {
					if (value.translt.x + value.speedX < 0 && value.id == 2) {
						value.speedX = -value.speedX
						con.pipes[3].speedX = value.speedX
						con.pipes[3].translt.x = value.translt.x + con.screenWidth * 0.3
					}
					if (value.translt.x > con.screenWidth - value.rec.width && value.id == 3) {
						value.speedX = -value.speedX
						con.pipes[2].speedX = value.speedX
						con.pipes[2].translt.x = value.translt.x - con.screenWidth * 0.3
					}
				}
				if (value.id == 4) {
					if (value.translt.x + value.speedX < 0 || value.translt.x > con.screenWidth - value.rec.width) {
						value.speedX = -value.speedX
					}
				}
				con.canvas.addChild(value.cacheCanvas, value.rec, value.translt)
			})
			if (this.input == 'start') {
				this.ball.translt.y += this.ball.speedY
				if (this.ball.speedY < -this.gel) {
					this.ball.speedY += this.gel
				}
				if (this.ball.speedY > this.gel) {
					this.ball.speedY -= this.gel
				}
				if (this.ball.speedY >= -this.gel && this.ball.speedY <= this.gel) {
					this.ball.speedY = 0
				}
				this.ball.translt.x += this.ball.speedX
				if (this.ball.speedX < -this.gel) {
					this.ball.speedX += this.gel
				}
				if (this.ball.speedX > this.gel) {
					this.ball.speedX -= this.gel
				}
				if (this.ball.speedX >= -this.gel && this.ball.speedX <= this.gel) {
					this.ball.speedX = 0
				}
				if (this.startNum < 4) {
					this.startNum++
					var num = this.startNum
					if (this.startNum > 2) {
						num = 4 - this.startNum
					}
					//console.log(num)
					this.role.changeStyle(String(num), this.texTure[0].img)
				}

			}
			if (this.ball.speedY != 0 || this.ball.speedX != 0) {
				if(this.input =='start'){
					this.ball.translt.angle += 15
				}
			}
			if(this.ball.translt.y>this.screenHeight-this.ball.ranage.height-10){
				//clearInterval(this.interval)
				//alert('不好意思你没有接到球哦！再来一次')
				this.reset()
			}
			/*if (this.ball.speedY == 0 && this.ball.speedX == 0) {
				this.reset()
			}*/
			//console.log(this.ball.speedX,this.ball.speedY)
			this.canvas.addChild(this.role.cacheCanvas, this.role.rec, this.role.translt)
			this.canvas.addChild(this.ball.cacheCanvas, this.ball.rec, this.ball.translt)
			this.canvas.render()
			var ww = new Date();
			if (this.startTime) {
				var m = ('0' + Math.floor((ww.getTime() - this.startTime.getTime()) / 60000)).slice(-2)
				var s = ('0' + (Math.floor((ww.getTime() - this.startTime.getTime()) / 1000) - Math.floor((ww.getTime() - this.startTime.getTime()) / 60000) * 60)).slice(-2)
				var h = String((ww.getTime() - this.startTime.getTime()) / 1000).split('.')[1]
				if (h < 100) {
					h = ('0' + h).substr(0, 2)
				} else {
					h = String(h).substr(0, 2)
				}
				$('.time').html("<b>" + m + ':' + s + ':' + h + "</b>")
			}
			if (this.ball.translt.y < -20) {
				//console.log()
				clearInterval(this.interval)
				$('.lastResult_min').html('请稍候...');
				// $('.theBtList').hide();
				$(".overlay").css('height', '100%');
			
				var _hash = s + Tool.getWord(Math.floor(Math.random() * 3) + 1) + m + Tool.getWord(Math.floor(Math.random() * 3) + 1) + h + Tool.getWord(Math.floor(Math.random() * 3) + 1);
				
				window.currentHash = _hash;
				// alert(this.gameId);
				Api.setScore({
					'gameid' : this.gameId,
					'hash' : _hash
				}).done(function(value) {
					// alert(value);
				});
				$('.lastResult_min').html(m + ':' + s + ':' + h);

				//   $('.theBtList').show();
				$(".overlay").show();
			}
			//console.log(Math.floor(1000 / (ww.getTime() - this.frameRateTime)))
			//$('.ftps').html(Math.floor(1000 / (ww.getTime() - this.frameRateTime)))
			//this.frameRateTime = ww.getTime()
		}
	});

	// Return the module for AMD compliance.
	return BasePage;

});
