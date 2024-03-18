window.onload = function() {
    var ul = document.getElementById("snake");
    var lis = ul.children;
    var head = lis[0];
    var img = head.getElementsByTagName("img")[0];
    var box = document.getElementById("box");
    var apple = document.getElementById("apple");
    var score = document.getElementById("score").getElementsByTagName("span")[0];
    var level = document.getElementById("score").getElementsByTagName("span")[1];
    var gameOver;
    var square = 20;
    var dirArr = {
        left: { name: "left", key: 65, point: { x: -1, y: 0 }, img: "left.png" },
        right: { name: "right", key: 68, point: { x: 1, y: 0 }, img: "right.png" },
        up: { name: "up", key: 87, point: { x: 0, y: -1 }, img: "up.png" },
        down: { name: "down", key: 83, point: { x: 0, y: 1 }, img: "down.png" }
    };
    var dirList = [];
    var currentDir = dirArr["right"];
    document.onkeydown = function(event) {
        var event = event || window.event;
        addDirection(event.keyCode);
    }

    function addDirection(key) {
        var dir;
        // 获取方向
        for (k in dirArr) {
            if (dirArr[k].key == key) {
                dir = dirArr[k];
            }
        }
        if (!dir) {
            return;
        }
        //获取上一次的方向
        var lastDirection = dirList[dirList.length - 1];
        if (!lastDirection) { lastDirection = currentDir }
        if (lastDirection.name == dir.name) {
            return;
        } else if (lastDirection.point.x + dir.point.x == 0 && lastDirection.point.y + dir.point.y == 0) {
            return;
        }
        if (dirList.length > 3) {
            return;
        }
        dirList.push(dir);
    }

    function getDirection(arr) {
        if (arr.length != 0) {
            currentDir = arr.shift();
        }
        return currentDir;
    }

    function point(x, y) {
        this.x = x;
        this.y = y;
    }

    function move() {
        //处理按键队列
        var d = getDirection(dirList);
        img.src = d.img;
        //下一个要走的点
        var pre = new point(head.offsetLeft + d.point.x * square, head.offsetTop + d.point.y * square);
        //死亡判定机制
        if (die(pre)) {
            clearInterval(timer)
            alert("GAME_OVER");
            return;
        }
        //吃的机制
        if (eat(pre)) {
            console.log("eat");
        }
        //移动身子
        for (var i = lis.length - 1; i > 0; i--) {
            lis[i].style.left = lis[i - 1].offsetLeft + "px";
            lis[i].style.top = lis[i - 1].offsetTop + "px";
        }
        head.style.left = pre.x + "px";
        head.style.top = pre.y + "px";
    }
    var timer = setInterval(move, 300);

    function die(p) {
        var left = p.x;
        var right = p.x + head.offsetWidth;
        var toper = p.y;
        var bottom = p.y + head.offsetHeight;
        for (var i = 1; i < lis.length - 1; i++) {
            if (left == lis[i].offsetLeft && toper == lis[i].offsetTop)
                return 1;
        }
        if (left < 0 || toper < 0 || right > box.offsetWidth || bottom > box.offsetHeight) {
            console.log(1)
            return 1;
        }
    }
    //初始化
    for (var i = 0; i < lis.length; i++) {
        lis[i].idx = i;
        lis[i].style.left = -square * i + "px";
        var backgroundColor = parseInt(255 * 255 * 255 * Math.random());
        lis[i].style.backgroundColor = "#" + backgroundColor.toString(16);
    }

    //吃
    function eat(p) {
        if (p.x == apple.offsetLeft && p.y == apple.offsetTop) {
            apple.style.left = 20 * Math.floor(Math.random() * 39) + "px";
            apple.style.top = 20 * Math.floor(Math.random() * 29) + "px";
            var li = document.createElement("li");
            li.className = "heihei";
            var backgroundColor = parseInt(255 * 255 * 255 * Math.random());
            li.style.backgroundColor = "#" + backgroundColor.toString(16);
            ul.appendChild(li);
            score.innerHTML++;
            clearInterval(timer);
            var scoreLevel = Math.floor(score.innerHTML / 4);
            level.innerHTML = scoreLevel + 1;
            var timeLevel = scoreLevel > 7 ? 7 : scoreLevel;
            timer = setInterval(move, 250 - timeLevel * 25);
        }
    }
}
