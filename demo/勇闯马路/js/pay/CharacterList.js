var CharacterList = {
    car: function(posY) {
        //图片数据
        var dataList = new Array();
        dataList.push(new LBitmapData(imgList["che_1"], 0, 0, 1078 / 2, 181));
        dataList.push(new LBitmapData(imgList["che_2"], 0, 0, 604 / 2, 144));
        dataList.push(new LBitmapData(imgList["che_3"], 0, 0, 296 / 2, 89));
        dataList.push(new LBitmapData(imgList["che_4"], 0, 0, 310 / 2, 93));
        dataList.push(new LBitmapData(imgList["che_5"], 0, 0, 388 / 2, 147));
        dataList.push(new LBitmapData(imgList["che_6"], 0, 0, 310 / 2, 93));
        dataList.push(new LBitmapData(imgList["che_7"], 0, 0, 234 / 2, 114));
        dataList.push(new LBitmapData(imgList["gou"], 0, 0, 228 / 2, 64));
        //图片分割数据
        var coordinateList = new Array();
        coordinateList.push(LGlobal.divideCoordinate(1078, 181, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(604, 144, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(296, 89, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(310, 93, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(388, 147, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(310, 93, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(234, 114, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(228, 64, 1, 2));
        //图片位置数据
        var locationList = new Array();
        locationList.push({ x: -1078 / 2, y: posY - 80 });
        locationList.push({ x: -604 / 2, y: posY - 40 });
        locationList.push({ x: -296 / 2, y: posY + 10 });
        locationList.push({ x: -310 / 2, y: posY + 5 });
        locationList.push({ x: -388 / 2, y: posY - 45 });
        locationList.push({ x: -310 / 2, y: posY + 5 });
        locationList.push({ x: -234 / 2, y: posY - 20 });
        locationList.push({ x: -228 / 2, y: posY + 20 });
        //攻击范围
        var attackList = new Array();
        attackList.push([[0, 123], [538, 123], [0, 170], [538, 170]]);//1
        attackList.push([[0, 87], [298, 87], [0, 127], [298, 127]]);//2
        attackList.push([[0, 57], [147, 57], [0, 80], [147, 80]]);//3
        attackList.push([[0, 59], [153, 59], [0, 80], [153, 80]]);//4
        attackList.push([[0, 104], [193, 104], [0, 135], [193, 135]]);//5
        attackList.push([[0, 59], [153, 59], [0, 85], [153, 85]]);//6
        attackList.push([[0, 75], [115, 75], [0, 113], [115, 113]]);//7
        attackList.push([[36, 29], [85, 29], [36, 55], [85, 55]]);//gou
        return [dataList, coordinateList, locationList, attackList];
    }
    , hero: function() {
        //图片数据
        var dataList = new Array();
        dataList.push(new LBitmapData(imgList["zbox_deng"], 0, 0, 150 / 2, 122));
        dataList.push(new LBitmapData(imgList["zbox_zou"], 0, 0, 194 / 2, 122));
        dataList.push(new LBitmapData(imgList["zbox_chezhuang"], 0, 0, 880 / 4, 145));
        dataList.push(new LBitmapData(imgList["zbox_gouyao"], 0, 0, 340 / 2, 128));

        //图片分割数据
        var coordinateList = new Array();
        coordinateList.push(LGlobal.divideCoordinate(150, 122, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(194, 122, 1, 2));
        coordinateList.push(LGlobal.divideCoordinate(880, 145, 1, 4));
        coordinateList.push(LGlobal.divideCoordinate(340, 128, 1, 2));
        return [dataList, coordinateList, null, null];
    }
};