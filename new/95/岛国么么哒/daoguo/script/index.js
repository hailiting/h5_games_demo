

Array.prototype._random = function() {
	this.sort(function(d, e) {
		return Math.random() <= 0.5 ? -0x1 : 0x1
	});
	return this
};
Array.prototype.random = function() {
	var d = Math.ceil(this.length / 0x2),
		e = this.length;
	var f = this.slice(0x0, d),
		g = this.slice(d, this.length);
	f._random(), g._random();
	for (var h = 0x0; h < e; h += 0x2) {
		var i = Math.floor(h / 0x2);
		f[i] && (this[h] = f[i]);
		g[i] && (this[h + 0x1] = g[i])
	};
	this._random();
	return this
};
Array.prototype.remove = function(d) {
	if (d <= 0x0) {
		this.shift()
	} else if (d >= this.length - 0x1) {
		this.pop()
	} else {
		var e = this.slice(0x0, d).concat(this.slice(d + 0x1, this.length));
		for (var f = 0x0, max = this.length; f < max; f++) {
			this.pop()
		};
		for (var f = 0x0, max = e.length; f < max; f++) {
			this.push(e[f])
		};
		e = null
	};
	return this
};
String.prototype.format = function(d, e) {
	return this.replace(e || /\${([^}]*)}/g, function(f, h) {
		var i = d;
		if (h.indexOf(".") >= 0x0) {
			var j = h.split("."),
				k;
			while (k = j.shift()) {
				i = i[k];
				if (!i) break
			}
		} else {
			i = i[h]
		};
		return i || ""
	})
};
var a = {};
a.debug = false;
a.width = 0x1e0;
a.height = 0x2f8;
btGame.makePublisher(a);;~

function(a) {
	a.load = [];
	var d = null;
	a.load.add = function(e) {
		a.load.push(e)
	};
	a.load.start = function() {
		var e = a.load,
			f = 0x0,
			g = e.length;
		d = $("<div></div>");
		d.css({
			position: "absolute",
			top: 0x1,
			left: 0x1,
			"z-index": -0x1,
			opacity: 0x0,
			overflow: "hidden",
			height: 0x1,
			width: 0x1
		});
		$("body").append(d);
		a.fire("loadProgress", 0x0);
		for (var h = 0x0, max = e.length; h < max; h++) {
			var i = $("<img />");
			i.one("load error", function() {
				f++;
				a.fire("loadProgress", f / g)
			});
			d.append(i);
			var j = e[h];
			i.attr({
				"data-id": j.id || j.src,
				src: j.src
			})
		}
	};
	a.load.get = function(e) {
		return d.find("[data-id='" + e + "']")
	};
	a.on("loadProgress", function(e, f) {
		btGame.gameLoading(f)
	})
}(a);;~

function(a) {
	a.gameMap = {
		"1": ["苍井空", "松岛枫", "吉泽明步", "波多野结衣", "天海翼", "麻生希", "泷泽萝拉", "冲田杏梨", "上原亚衣", "小泽玛利亚"],
		"2": ["橘梨纱", "京香JULIA", "濑亚美莉", "武藤兰", "饭岛爱", "大桥未久", "樱井莉亚", "雨宫琴音", "早乙女露依", "柚木提娜"],
		"3": ["羽田爱", "佐藤遥希", "小泽圆", "小仓奈奈", "大沢佑香", "桐谷尤莉亚", "芦名尤莉亚", "月野里沙", "西野翔", "白石瞳"],
		"4": ["立花美凉", "白鸟樱", "长濑爱", "常盘樱子", "川岛和津实", "堤莎也加", "高树玛莉亚", "古都光", "黑崎扇菜", "渡濑晶", "橘未稀", "立花瞳", "铃木麻奈美", "早川濑里奈", "明日花绮罗", "横山美雪", "北原多香子", "爱田由", "红音萤", "樱井步", "大冢咲", "穗花", "绫波芹", "春咲梓美", "黑木麻衣", "尾上若叶", "希岛爱理", "樱理惠", "美竹凉子", "瑠川莉娜", "上原Kaera", "美祢藤", "小川亚纱美", "菅野亚梨沙", "木下柚花", "小蕾", "伊泽千夏", "秋山祥子", "纹舞兰", "上原瑞穂", "大沢美加", "月野莉纱", "葵实野理", "加藤莉娜", "友田彩也香", "村上里沙", "希志爱野", "仁科百华", "椎名由奈", "冬月枫", "立花里子", "小川阿佐美", "成濑心美", "上原结衣", "里美尤利娅", "希崎杰西卡", "雾岛奈津美", "石川铃华", "桥本舞", "原干惠"]
	};
	a.gameList = [];
	a.maxLevel = 0x1e;
	a.currentLevel = 0x0;
	a.maxGate = 0x3;
	a.picPath = "resource/";
	var d = a.gameMap,
		e = a.picPath,
		f = 0x0;
	for (var g in d) {
		f++;
		var h = d[g];
		for (var i = 0x0, max = h.length; i < max; i++) {
			var j = h[i],
				k = i + 0x1 + (f - 0x1) * 0xa,
				l = e + k + ".jpg";
			h[i] = {
				key: k,
				name: j,
				pic: l
			};
			a.gameList.push(h[i])
		}
	};
	a.MODE = {
		PIC: "picture",
		NAM: "name"
	};
	a.playMode = a.MODE.PIC;
	a.setPlayMode = function(h) {
		if (typeof h == "number") {
			if (h == 0x0) {
				a.playMode = a.MODE.PIC
			} else {
				a.playMode = a.MODE.NAM
			}
		} else if (h == a.MODE.PIC) {
			a.playMode = a.MODE.PIC
		} else {
			a.playMode = a.MODE.NAM
		};
		a.fire("playModeChange", a.playMode)
	};
	for (var g = 0x0, max = a.gameList.length; g < max; g++) {
		var h = a.gameList[g];
		a.load.add({
			id: h.key,
			src: h.pic
		})
	};
	a.load.start()
}(a);;~

function(a) {
	var d = $("#main .page"),
		e = "hide",
		f = 0xc8;

	function g() {
		var h = Math.random() > 0.5 ? "100%" : "-100%",
			i = Math.random() > 0.5 ? "100%" : "-100%";
		return {
			left: h,
			top: i
		}
	};
	a.on("pageChange", function(h, i) {
		d.css(g());
		var j;
		if (typeof i === "number") {
			j = d.eq(i)
		} else {
			j = d.filter(i)
		};
		j.removeClass("animate");
		j.css(g());
		setTimeout(function() {
			j.addClass("animate");
			j.css({
				left: 0x0,
				top: 0x0
			})
		}, f);
	})
}(a);;~

function(a) {
	var d = $("#start");
	d.on("click", ".guessPic, .guessNam", function(e) {
		a.setPlayMode($(this).index() - 0x1);
		a.fire("pageChange", 0x1);
		a.fire("gameStart")
	});
	d.find(".moreLink").click(function() {
		$(this).attr("href", btGame.URL.getMoreGame())
	})
}(a);;~

function(a) {
	var d = "",
		e = $(".container"),
		f = $("#play .time"),
		g = $("#play .tip");
	var h = $(".heartList"),
		i = $("#play .level");
	a.on("playModeChange", function(k, l) {
		d = $(l === a.MODE.PIC ? "#template_game_pic" : "#template_game_nam").html();
		d = $.trim(d)
	});
	a.on("gameStart", function(k) {
		for (var l in a.gameMap) {
			a.gameMap[l].random()
		};
		j.reset()
	});
	var j = {
		reset: function() {
			a.currentLevel = 0x0;
			a.maxWrongCount = 0x3;
			a.wrongCount = 0x0;
			this.next(false);
			var k = 0x3,
				l = this;
			var m = setInterval(function() {
				k--;
				if (k <= 0x0) {
					clearInterval(m);
					l.timer.start()
				};
				a.fire("playPrepare", k)
			}, 0x3e8);
			a.fire("playPrepare", k);
			this.heart(0x3)
		},
		next: function(k) {
			var l = ++a.currentLevel;
			if (a.currentLevel > a.maxLevel) {
				a.fire("gameEnd");
				return
			};
			var m = Math.ceil(a.currentLevel / 0xa),
				n = a.gameMap[m][l - (m - 0x1) * 0xa - 0x1];
			var o = a.gameList.slice(0x0).remove(n.key - 0x1).random().slice(0x0, 0x3);
			o.push(n);
			o.random();
			a.fire("nextLevel", o, n);
			if (k) {
				this.timer.start()
			}
		},
		heart: function(k) {
			a.fire("resetHeartCount", k)
		},
		timer: {
			timer: null,
			start: function() {
				clearInterval(this.timer);
				var k = 0xa,
					l = this;
				a.fire("timeChange", k);
				this.timer = setInterval(function() {
					k--;
					a.fire("timeChange", k);
					if (k <= 0x0) {
						l.timeup();
						clearInterval(l.timer)
					}
				}, 0x3e8);
				a.isTimeup = false
			},
			stop: function() {
				clearInterval(this.timer);
				this.timer = null
			},
			timeup: function() {
				a.fire("gameEnd");
				a.isTimeup = true
			}
		}
	};
	a.on("gameEnd", function() {
		j.timer.stop()
	});
	a.on("playPrepare", function(k) {
		f.html(0xa)
	});
	e.on("click", ".answer1, .answer2", function() {
		var k = $(this);
		if (a.wrongCount >= a.maxWrongCount || a.isPreparingNext || a.isTimeup) {
			return false
		};
		var l = e.find(".gameTip");
		var m = k.data("key"),
			n = l.data("key");
		if (m == n) {
			k.addClass("right");
			a.isPreparingNext = true;
			j.timer.stop();
			setTimeout(function() {
				j.next(true);
				a.isPreparingNext = false
			}, 0x3e8)
		} else {
			k.addClass("error");
			setTimeout(function() {
				k.removeClass("error")
			}, 0x7d0);
			a.wrongCount++;
			a.fire("answerWrong", a.wrongCount)
		}
	});
	a.on("nextLevel", function(k, l, m) {
		i.html(a.currentLevel);
		e.html(d.format({
			data: m,
			arr1: l[0x0],
			arr2: l[0x1],
			arr3: l[0x2],
			arr4: l[0x3]
		}));
		if (a.debug) {
			e.find("a[data-key='" + m.key + "']").css("background", "#99ccff")
		}
	});
	a.on("timeChange", function(k, l) {
		f.html(l)
	});
	a.on("playModeChange", function(k, l) {
		if (l == a.MODE.PIC) {
			g.html("根据提示的名字，找出对应的照片")
		} else {
			g.html("根据提示的照片，找出对应的名字")
		}
	});
	a.on("answerWrong", function(k, l) {
		a.fire("resetHeartCount", a.maxWrongCount - l);
		if (l >= a.maxWrongCount) {
			setTimeout(function() {
				a.fire("gameEnd")
			}, 0x1f4)
		}
	});
	a.on("resetHeartCount", function(k, l) {
		var m = "";
		for (var n = 0x0; n < l; n++) {
			m += '<em class="heart"></em>'
		};
		h.html(m)
	});
	if (a.debug) {
		window.b = j;
		a.on("nextLevel", function(k, l, m) {
			console.log(l)
		})
	}
}(a);;~

function(a) {
	var d = $("#prepare"),
		e = d.find(".text");
	a.on("playPrepare", function(f, g) {
		if (g <= 0x0) {
			d.css("top", "-100%");
			setTimeout(function() {
				d.css("top", 0x0);
				d.hide()
			}, 0x1f4)
		} else {
			d.show();
			e.html(g)
		}
	});
	d.hide()
}(a);;~

function(a) {
	var d = $("#end"),
		e = d.find(".level"),
		f = d.find(".title");
	d.on("click", ".again", function() {
		a.fire("pageChange", 0x0);
		return false
	}).on("click", ".notify", function() {
		btGame.playShareTip();
		return false
	});
	var g = [{
		key: 0x0,
		title: "小纯洁"
	}, {
		key: 0x5,
		title: "右手战士"
	}, {
		key: 0xa,
		title: "一卷手纸"
	}, {
		key: 0xf,
		title: "痴汉体质"
	}, {
		key: 0x14,
		title: "变态绅士"
	}, {
		key: 0x19,
		title: "色魔附体"
	}, {
		key: 0x1d,
		title: "阅片大湿"
	}, {
		key: 0x1e,
		title: "色即是空"
	}];

	function h(i) {
		var j = g[0x0].title;
		for (var k = 0x0, max = g.length; k < max; k++) {
			var l = g[k];
			j = l.title;
			if (i <= l.key) {
				break
			}
		};
		return j
	};
	window.c = h;
	a.on("gameEnd", function() {
		a.fire("pageChange", 0x2);
		var i = h(a.currentLevel - 0x1);
		f.html(i);
		e.html("LV" + (a.currentLevel - 0x1));
		var j = {
			level: (a.currentLevel - 0x1),
			title: i
		};
		a.fire("gameResult", j)
	});
	d.find(".moreLink").click(function() {
		$(this).attr("href", btGame.URL.getMoreGame())
	})
}(a);;~

function(a, btGame) {
	a.on("gameResult", function(d, e) {
		var f = "我玩《岛国么么答》获得【" + e.title + "】称号，我很纯洁别怀疑！";
		if (e.level >= 0x5) {
			f = "我玩《岛国么么答》获得【" + e.title + "】称号，别说你没看过？"
		};
		var f = btGame.setShare({
			title: f
		});
		setTimeout(function() {
			btGame.playScoreMsg("你认出" + e.level + "个老湿,获得【" + e.title + "】称号，快去刷屏吧！")
		}, 0x12c)
	})
}(a, btGame);;~

function(a, btGame) {
	var d = $("body,html"),
		e = $("#main");

	function f() {
		var g = a.width,
			h = window.innerWidth;
		var i = h / g;
		if (i > 0x1) i = 0x1;
		var j = "scale(" + (i) + ")";
		e.css({
			"-webkit-transform": j,
			"-moz-transform": j,
			"-o-transform": j,
			"transform": j,
			"top": -a.height * (0x1 - i) / 0x2,
			"left": -g * (0x1 - i) / 0x2
		});
		if (i < 0x1) {
			d.css("height", a.height * i)
		} else {
			d.css("height", "auto")
		}
	};
	btGame.checkHScreen(f, false);
	$(function() {
		setTimeout(f, 0x3e8)
	})
}(a, btGame);