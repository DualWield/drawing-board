define(function (require) {
    /*
     *  @param: {string} name 笔刷类型
     *
     * */
    var Pencil = function (type) {
        type = type || 'Basic';
        this.subTool = {
            Basic: new Basic(),
            HalfTone: new HalfTone(),
            HLine: new HLine(),
            VLine: new VLine(),
            Circle: new Circle(),
            Spray: new Spray(),
            Neighbor: new Neighbor()
        };
        this.name = 'pencil';
        this.type = this.subTool[type];
    };
    Pencil.prototype = {
        setType: function (type) {
            this.type = this.subTool[type];
        },
        begin: function (x, y, mc) {
            this.type.begin(x, y, mc);
        },
        continue: function (x, y, mc) {
            this.type.continue(x, y, mc);

        },
        end: function (x, y, mc) {
            this.type.end(x, y, mc);

        }
    };
    var Basic = function () {
        this.name = 'pencil';
        this.path = [];
    };
    Basic.prototype = {
        setting: {
            Opacity: 100,
            Size: 20
        },
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});
        },
        continue: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.redraw(mc);
        },
        end: function (x, y, mc) {
            this.path = [];
        },
        redraw: function (mc) {
            mc.clearBc();

            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            var color = mc.getColor();
            var opacity = this.setting.Opacity / 100;
            var RGBAcolor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            mc.bcCtx.strokeStyle = RGBAcolor;

            mc.bcCtx.strokeStyle = RGBAcolor;
            mc.bcCtx.lineWidth = this.setting.Size;

            mc.bcCtx.moveTo(this.path[0].x, this.path[0].y);

            for (var i = 1, len = this.path.length; i < len; i++) {
                mc.bcCtx.lineTo(this.path[i].x, this.path[i].y);
            }
            mc.bcCtx.stroke();
        }
    };

    var HalfTone = function () {
        this.name = 'halftone';
        this.path = [];
    };
    HalfTone.prototype = {
        setting: {
            Opacity: 100,
            Size: 20,
            DotSize: 50
        },
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.setting.DotSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');

            patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;

            var color = mc.getColor();
            var opacity = this.setting.Opacity / 100;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            patternCtx.fillStyle = RGBAColor;
            patternCtx.beginPath();
            patternCtx.arc(dotWidth / 2, dotWidth / 2, dotWidth / 2, 0, Math.PI * 2, false);
            patternCtx.closePath();
            patternCtx.fill();
            return ctx.createPattern(patternCanvas, 'repeat');
        },
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});
        },
        continue: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.redraw(mc);
        },
        end: function (x, y, mc) {
            this.path = [];
        },
        redraw: function (mc) {
            mc.clearBc();

            var ctx = mc.bcCtx;

            ctx.strokeStyle = this.getPattern(ctx);
            ctx.lineWidth = this.setting.Size;
            ctx.lineJoin = ctx.lineCap = 'round';

            var p1 = this.path[0];
            var p2 = this.path[1];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            for (var i = 1, len = this.path.length; i < len; i++) {
                var midPoint = _.midPoint(p1, p2);
                ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                p1 = this.path[i];
                p2 = this.path[i + 1];
            }
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
        }
    };

    var HLine = function () {
        this.name = 'hline';
        this.path = [];
    };
    HLine.prototype = {
        setting: {
            Opacity: 100,
            Size: 25,
            LineSize: 13
        },
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.setting.LineSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');

            patternCanvas.width = patternCanvas.height = dotWidth * 2;

            var color = mc.getColor();
            var opacity = this.setting.Opacity / 100;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            patternCtx.strokeStyle = RGBAColor;
            patternCtx.beginPath();
            patternCtx.lineWidth = dotWidth;
            patternCtx.moveTo(0, dotWidth);
            patternCtx.lineTo(dotWidth * 2, dotWidth);

            patternCtx.closePath();
            patternCtx.stroke();
            return ctx.createPattern(patternCanvas, 'repeat');
        },
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});
        },
        continue: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.redraw(mc);
        },
        end: function (x, y, mc) {
            this.path = [];
        },
        redraw: function (mc) {
            mc.clearBc();

            var ctx = mc.bcCtx;

            ctx.strokeStyle = this.getPattern(ctx);
            ctx.lineWidth = this.setting.Size;
            ctx.lineJoin = ctx.lineCap = 'round';

            var p1 = this.path[0];
            var p2 = this.path[1];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            for (var i = 1, len = this.path.length; i < len; i++) {
                var midPoint = _.midPoint(p1, p2);
                ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                p1 = this.path[i];
                p2 = this.path[i + 1];
            }
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
        }
    };

    var VLine = function () {
        this.name = 'vline';
        this.path = [];
    };
    VLine.prototype = {
        setting: {
            Opacity: 100,
            Size: 47,
            LineSize: 24
        },
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.setting.LineSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');

            patternCanvas.width = patternCanvas.height = dotWidth * 2;

            var color = mc.getColor();
            var opacity = this.setting.Opacity / 100;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            patternCtx.strokeStyle = RGBAColor;
            patternCtx.beginPath();
            patternCtx.lineWidth = dotWidth;
            patternCtx.moveTo(dotWidth, 0);
            patternCtx.lineTo(dotWidth, dotWidth * 2);

            patternCtx.closePath();
            patternCtx.stroke();
            return ctx.createPattern(patternCanvas, 'repeat');
        },
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});
        },
        continue: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.redraw(mc);
        },
        end: function (x, y, mc) {
            this.path = [];
        },
        redraw: function (mc) {
            mc.clearBc();

            var ctx = mc.bcCtx;

            ctx.strokeStyle = this.getPattern(ctx);
            ctx.lineWidth = this.setting.Size;
            ctx.lineJoin = ctx.lineCap = 'round';

            var p1 = this.path[0];
            var p2 = this.path[1];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            for (var i = 1, len = this.path.length; i < len; i++) {
                var midPoint = _.midPoint(p1, p2);
                ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
                p1 = this.path[i];
                p2 = this.path[i + 1];
            }
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
        }
    };

    var Circle = function () {
        this.name = 'circle';
        this.path = [];
    };
    Circle.prototype = {
        setting: {
            Opacity: 100,
            Size: 20,
            Density: 50
        },
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});
        },
        continue: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.redraw(mc);
        },
        end: function (x, y, mc) {
            this.path = [];
        },
        redraw: function (mc) {
            var length = this.path.length;
            var nowPoint = this.path.slice(length - 1, length)[0];
            var lastPoint = this.path.slice(length - 2, length - 1)[0];
            var dist = _.distanceBetween(nowPoint, lastPoint);

            if (dist < 1) {
                return;
            }
            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            var color = mc.getColor();
            var opacity = this.setting.Opacity / 100;
            var RGBAcolor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            mc.bcCtx.fillStyle = RGBAcolor;

            mc.bcCtx.strokeStyle = RGBAcolor;
            mc.bcCtx.lineWidth = this.setting.Size;

            for (var i = 0, len = dist; i < len; i += this.setting.Density) {
                var s = i / dist;
                var radius = this.setting.Size * Math.random();
                mc.bcCtx.globalAlpha = opacity * Math.random();
                mc.bcCtx.arc(lastPoint.x * s + nowPoint.x * (1 - s),
                    lastPoint.y * s + nowPoint.y * (1 - s), radius, 0, Math.PI * 2);
            }
            mc.bcCtx.fill();
        }
    };

    var Spray = function () {
        this.name = 'spray';
        this.path = [];
    };
    Spray.prototype = {
        setting: {
            Opacity: 100,
            Size: 20,
            Density: 50
        },
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.timer = setInterval(function () {
                for (var i = 0, len = this.setting.Density; i < len; i++) {
                    var angle = Math.PI * Math.random() * 2;
                    var size = this.setting.Size * Math.random();
                    mc.bcCtx.fillRect(this.path[this.path.length - 1].x + size * Math.cos(angle),
                        this.path[this.path.length - 1].y + size * Math.sin(angle),
                        1, 1);
                }
                mc.bcCtx.fill();
            }.bind(this), 50);
        },
        continue: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.redraw(mc);
        },
        end: function (x, y, mc) {
            this.path = [];
            this.timer && clearInterval(this.timer);
        },
        redraw: function (mc) {
            var length = this.path.length;
            var ctx = mc.bcCtx;
            var nowPoint = this.path.slice(length - 1, length)[0];
            var lastPoint = this.path.slice(length - 2, length - 1)[0];
            var opacity = this.setting.Opacity / 100;

            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            var color = mc.getColor();
            var RGBAcolor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            mc.bcCtx.fillStyle = RGBAcolor;
            mc.bcCtx.strokeStyle = RGBAcolor;


        }
    };

    var Neighbor = function () {
        this.name = 'neighbor';
        this.path = [];
    };
    Neighbor.prototype = {
        setting: {
            Opacity: 100,
            Size: 20,
            Density: 50
        },
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});

        },
        continue: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.redraw(mc);
        },
        end: function (x, y, mc) {
            this.path = [];
        },
        redraw: function (mc) {
            var length = this.path.length;
            var ctx = mc.bcCtx;
            var nowPoint = this.path.slice(length - 1, length)[0];
            var lastPoint = this.path.slice(length - 2, length - 1)[0];
            var opacity = this.setting.Opacity / 100;
            var color = mc.getColor();
            var dx, dy;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';

            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            ctx.strokeStyle = RGBAColor;
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(nowPoint.x, nowPoint.y);
            for (var i = 0, len = this.path.length; i < len; i++) {
                dx = this.path[i].x - nowPoint.x;
                dy = this.path[i].y - nowPoint.y;
                var d = dx * dx + dy * dy;
                if (d < 1000) {
                    ctx.beginPath();
                    ctx.strokeStyle = RGBAColor;
                    ctx.moveTo( this.path[this.path.length-1].x + (dx * 0.2), this.path[this.path.length-1].y + (dy * 0.2));
                    ctx.lineTo( this.path[i].x - (dx * 0.2), this.path[i].y - (dy * 0.2));
                    ctx.stroke();
                }
            }
          /*  ctx.stroke();
            var RGBAcolor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            mc.bcCtx.fillStyle = RGBAcolor;
            mc.bcCtx.strokeStyle = RGBAcolor;
*/

        }
    };


    return Pencil;

});