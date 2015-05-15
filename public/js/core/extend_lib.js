define(function (require) {
    var _ = require('underscore');
    _.mixin({
        distanceBetween: function (point1, point2) {
            return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
        },
        angleBetween: function (point1, point2) {
            return Math.atan2(point2.x - point1.x, point2.y - point1.y);
        },
        midPoint: function (p1, p2) {
            return {
                x: (p2.x + p1.x) / 2,
                y: (p2.y + p1.y) / 2
            };
        },
        rgbToHex: function (R, G, B) {
            return _.toHex(R) + _.toHex(G) + _.toHex(B)
        },
        toHex: function (n) {
            n = parseInt(n, 10);
            if (isNaN(n)) return "00";
            n = Math.max(0, Math.min(n, 255));
            return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
        },
        preloadimages: function (arr) {
            var newimages = [], loadedimages = 0;
            var postaction = function () {
            };  //此处增加了一个postaction函数
            var arr = (typeof arr != "object") ? [arr] : arr;

            function imageloadpost() {
                loadedimages++;
                if (loadedimages == arr.length) {
                    postaction(newimages); //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
                }
            }

            for (var i = 0; i < arr.length; i++) {
                newimages[i] = new Image();
                newimages[i].src = arr[i];
                newimages[i].onload = function () {
                    imageloadpost()
                };
                newimages[i].onerror = function () {
                    imageloadpost()
                };
            }
            return { //此处返回一个空白对象的done方法
                done: function (f) {
                    postaction = f || postaction;
                }
            }
        },
        /* 将#fff 转化成 rgba()的形式*/
        hexToRGBA: function (hex, a) {
            var colorReg = /^#([0-9]|[a-f]){3}$/i;
            var anotherColorReg = /^#([0-9]|[a-f]){6}/;
            var rgba;
            if (typeof a !== 'number' || a < 0 && a > 100) {
                return false;
            }
            if (colorReg.test(hex)) {
                hex = hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
            }
            if (anotherColorReg.test(hex)) {
                rgba = 'rgba(' + (+('0x' + hex[1] + hex[2])) + ',' +
                (+('0x' + hex[3] + hex[4])) + ',' +
                (+('0x' + hex[5] + hex[6])) + ',' + a + ')';
            }
            return rgba;

        }

    });
});
