define(function (require) {
    var shapes = {};

    var Shape = Class.extend({
        init: function () {
            this.path = [];
            this.color = mc.getColor();
            for (var i in mc.tool.subTool.setting) {
                this[i] = mc.tool.subTool.setting[i];
            }
        },
        addPoint: function (x, y) {
            this.path.push({x: x, y: y});
        },
        addPath: function (x, y) {
            this.path.push({x: x, y: y});
        }
    });

    var PencilBasicShape = Shape.extend({
        /*  init: function () {
         this.path = [];
         this.color = mc.getColor();
         this.opacity = mc.tool.subTool.setting.Opacity;
         this.size = mc.tool.subTool.setting.Size
         },*/
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');
            ctx.lineCap = ctx.lineJoin = 'round';
            ctx.beginPath();
            var color = this.color;
            var opacity = this.Opacity / 100;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            ctx.strokeStyle = RGBAColor;
            ctx.strokeStyle = RGBAColor;
            ctx.lineWidth = this.Size;
            ctx.moveTo(this.path[0].x, this.path[0].y);
            for (var i = 1, len = this.path.length; i < len; i++) {
                ctx.lineTo(this.path[i].x, this.path[i].y);
            }
            ctx.stroke();
        }
    });

    var PencilHalfToneShape = Shape.extend({
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.DotSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');

            patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;

            var color = this.color;
            var opacity = this.Opacity / 100;
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
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');
            ctx.strokeStyle = this.getPattern(ctx);
            ctx.lineWidth = this.Size;
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
    });

    var PencilHLineShape = Shape.extend({
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.LineSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');

            patternCanvas.width = patternCanvas.height = dotWidth * 2;

            var color = this.color;
            var opacity = this.Opacity / 100;
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
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');

            ctx.strokeStyle = this.getPattern(ctx);
            ctx.lineWidth = this.Size;
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
    });
    var PencilVLineShape = Shape.extend({
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.LineSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');

            patternCanvas.width = patternCanvas.height = dotWidth * 2;

            var color = mc.getColor();
            var opacity = this.Opacity / 100;
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
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');

            ctx.strokeStyle = this.getPattern(ctx);
            ctx.lineWidth = this.Size;
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
    });
    var PencilCircleShape = Shape.extend({
        /* TODO:有bug尚未解决*/
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');
            ctx.save();
            var length = this.path.length;
            var nowPoint = this.path.slice(length - 1, length)[0];
            var lastPoint = this.path.slice(length - 2, length - 1)[0] ||
                {x: nowPoint.x, y: nowPoint.y - 1};
            var dist = _.distanceBetween(nowPoint, lastPoint);

            if (dist < 1) {
                return;
            }
            ctx.lineCap = ctx.lineJoin = 'round';
            ctx.beginPath();
            var color = this.color;
            var opacity = this.Opacity / 100;
            var RGBAcolor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            ctx.fillStyle = RGBAcolor;

            ctx.strokeStyle = RGBAcolor;
            ctx.lineWidth = this.Size;

            for (var i = 0, len = dist; i < len; i += this.Density) {
                var s = i / dist;
                var radius = this.Size/* * Math.random()*/;
                ctx.globalAlpha = opacity/* * Math.random()*/;
                ctx.arc(lastPoint.x * s + nowPoint.x * (1 - s),
                    lastPoint.y * s + nowPoint.y * (1 - s), radius, 0, Math.PI * 2);
            }
            ctx.fill();
            ctx.restore();
        }
    });
    var PencilSprayShape = Shape.extend({
        init: function () {
            this.callSuper();
            this.points = [];
        },
        setInterVal: function () {
            this.timer = setInterval(function () {
                for (var i = 0, len = this.Density; i < len; i++) {
                    var angle = Math.PI * Math.random() * 2;
                    var size = this.Size * Math.random();
                    this.points.push(
                        {
                            x: this.path[this.path.length - 1].x + size * Math.cos(angle),
                            y: this.path[this.path.length - 1].y + size * Math.sin(angle)
                        });
                }
                mc.repaintlayer();
            }.bind(this), 50);
        },
        addPath: function (x, y) {
            this.path.push({x: x, y: y});
        },
        clearInterval: function () {
            this.timer && clearInterval(this.timer);
        },
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');

            ctx.save();
            var opacity = this.Opacity / 100;

            ctx.lineCap = ctx.lineJoin = 'round';
            ctx.beginPath();
            var color = this.color;
            var RGBAcolor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            ctx.fillStyle = RGBAcolor;
            ctx.strokeStyle = RGBAcolor;
            for (var i = 0, len = this.points.length; i < len; i++) {
                ctx.fillRect(this.points[i].x, this.points[i].y, 1, 1);
            }
            ctx.restore();

        }
    });
    var PencilNeighborShape = Shape.extend({
        init: function () {
            this.callSuper();
            this.linePath = [];
        },
        /*
         *  this.path 2个一组，连成一条线
         * */
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');

            var nowPoint = this.path[this.path.length - 1];
            var lastPoint = this.path[this.path.length - 2] ||
                {x: nowPoint.x, y:nowPoint.y-1};
            var opacity = this.Opacity / 100;
            var color = this.color;
            var dx, dy;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';

            ctx.strokeStyle = RGBAColor;
            ctx.lineWidth = this.Size / 20;
            this.linePath.push({
                x1: lastPoint.x, y1: lastPoint.y,
                x2: nowPoint.x, y2: nowPoint.y
            });
            for (var i = 0, len = this.path.length; i < len; i += 5) {
                dx = this.path[i].x - nowPoint.x;
                dy = this.path[i].y - nowPoint.y;
                var d = dx * dx + dy * dy;
                if (d < 1000) {
                    ctx.strokeStyle = RGBAColor;
                    this.linePath.push({x1: nowPoint.x + (dx * 0.2), y1: lastPoint.y,
                        x2:this.path[i].x - (dx * 0.2), y2:this.path[i].y - (dy * 0.2)});
                }
            }
            ctx.beginPath();
            for(var i = 0,len = this.linePath.length; i< len ; i++){
                ctx.moveTo(this.linePath[i].x1, this.linePath[i].y1);
                ctx.lineTo(this.linePath[i].x2, this.linePath[i].y2);
            }
            ctx.stroke();

        }
    });
    var PencilFurShape = Shape.extend({
        init: function () {
            this.callSuper();
            this.linePath = [];
        },
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');

            var nowPoint = this.path[this.path.length - 1];
            var lastPoint = this.path[this.path.length - 2] ||
                {x: nowPoint.x, y:nowPoint.y-1};
            var opacity = this.Opacity / 100;
            var color = this.color;
            var dx, dy;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';

            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            ctx.strokeStyle = RGBAColor;
            ctx.lineWidth = this.Size / 10;
            this.linePath.push({
                x1: lastPoint.x, y1: lastPoint.y,
                x2: nowPoint.x, y2: nowPoint.y
            });
            for (var i = 0, len = this.path.length; i < len; i++) {
                dx = this.path[i].x - nowPoint.x;
                dy = this.path[i].y - nowPoint.y;
                var d = dx * dx + dy * dy;

                if (d < 2000 && Math.random() > d / 2000) {
                    ctx.strokeStyle = RGBAColor;
                    ctx.lineWidth = 1;
                    this.linePath.push({
                        x1: nowPoint.x + (dx * 0.5), y1: nowPoint.y + (dy * 0.5),
                        x2: nowPoint.x - (dx * 0.5), y2: nowPoint.y - (dy * 0.5)
                    });

                }
            }
            ctx.beginPath();
            for(var i = 0,len = this.linePath.length; i< len ; i++){
                ctx.moveTo(this.linePath[i].x1, this.linePath[i].y1);
                ctx.lineTo(this.linePath[i].x2, this.linePath[i].y2);
            }
            ctx.stroke();
        }
    });
    var PencilShadedShape = Shape.extend({
        init: function () {
            this.callSuper();
            this.linePath = [];
        },
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');
            var nowPoint = this.path[this.path.length - 1];
            var lastPoint = this.path[this.path.length - 2] ||
                {x: nowPoint.x, y:nowPoint.y-1};
            var opacity = this.Opacity / 100;
            var color = this.color;
            var dx, dy;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';

            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            ctx.strokeStyle = RGBAColor;
            ctx.lineWidth = this.Size / 20;
            this.linePath.push({
                x1: lastPoint.x, y1: lastPoint.y,
                x2: nowPoint.x, y2: nowPoint.y
            });
            for (var i = 0, len = this.path.length; i < len; i++) {
                dx = this.path[i].x - nowPoint.x;
                dy = this.path[i].y - nowPoint.y;
                var d = dx * dx + dy * dy;

                if (d < 1000) {
                    ctx.strokeStyle = RGBAColor;
                    ctx.lineWidth = 1;

                    this.linePath.push({
                        x1: this.path[i].x, y1: this.path[i].y,
                        x2: nowPoint.x, y2: nowPoint.y
                    });
                }
            }
            ctx.beginPath();
            for(var i = 0,len = this.linePath.length; i< len ; i++){
                ctx.moveTo(this.linePath[i].x1, this.linePath[i].y1);
                ctx.lineTo(this.linePath[i].x2, this.linePath[i].y2);
            }
            ctx.stroke();

        }
    });
    var PencilSquaresShape = Shape.extend({
        /*
        * this.linePath 四个一组，画矩形
        * */
        init: function () {
            this.callSuper();
            this.linePath = [];
        },
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');
            var nowPoint = this.path[this.path.length - 1];
            var lastPoint = this.path[this.path.length - 2] ||
                {x: nowPoint.x, y:nowPoint.y-1};
            var dx = nowPoint.x - lastPoint.x;
            var dy = nowPoint.y - lastPoint.y;
            var angle = 1.57;
            var px = Math.cos(angle) * dx - Math.sin(angle) * dy;
            var py = Math.sin(angle) * dx + Math.cos(angle) * dy;
            var color = this.color;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + '1' + ')';

            ctx.strokeStyle = RGBAColor;
            ctx.fillStyle = '#fff';
            ctx.lineWidth = this.Size / 10;
            this.linePath.push({
                x1:lastPoint.x - px,y1:lastPoint.y - py,
                x2:lastPoint.x + px,y2:lastPoint.y + py,
                x3:nowPoint.x + px,y3:nowPoint.y + py,
                x4:nowPoint.x - px,y4:nowPoint.y - py
            });
            ctx.beginPath();
            _.each(this.linePath, function (value, key) {
                ctx.moveTo(value.x1, value.y1);
                ctx.lineTo(value.x2, value.y2);
                ctx.lineTo(value.x3, value.y3);
                ctx.lineTo(value.x4, value.y4);
                ctx.lineTo(value.x1, value.y1);
            });

            ctx.fill();
            ctx.stroke();

        }
    });
    var PecilRibbonShape = Shape.extend({
        init: function () {
            this.tempPath = [];
            this.linePath = [];
            this.callSuper();
            for (var i = 0; i < this.LineNum; i++) {
                this.path.push({
                    dx: 0,
                    dy: 0,
                    ax: 0,
                    ay: 0,
                    div: 0.1,
                    ease: Math.random() * 0.2 + 0.6
                });
            }
        },
        draw: function (canvas) {
            var ctx = canvas.getContext('2d');
            ctx.beginPath();

            ctx.lineWidth = 1;
            var opacity = this.Opacity / 100;
            var color = this.color;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            ctx.strokeStyle = RGBAColor;
            for(var i = 0,len = this.linePath.length; i< len ; i++){
                ctx.moveTo(this.linePath[i].x1, this.linePath[i].y1);
                ctx.lineTo(this.linePath[i].x2, this.linePath[i].y2);
            }
            ctx.stroke();
        },
        update: function () {
            var i;
            for (i = 0; i < this.tempPath.length; i++) {
                var tempX = this.tempPath[i].dx, tempY = this.tempPath[i].dy;
                this.tempPath[i].dx -= this.tempPath[i].ax = (this.tempPath[i].ax + (this.tempPath[i].dx - this.path[this.path.length-1].x) * this.tempPath[i].div) * this.tempPath[i].ease;
                this.tempPath[i].dy -= this.tempPath[i].ay = (this.tempPath[i].ay + (this.tempPath[i].dy - this.path[this.path.length-1].y) * this.tempPath[i].div) * this.tempPath[i].ease;
                this.linePath.push({
                    x1: tempX, y1: tempY,
                    x2: this.tempPath[i].dx, y2:this.tempPath[i].dy
                });
            }

        }
    });

    shapes = {
        PencilBasicShape: PencilBasicShape,
        PencilHalfToneShape: PencilHalfToneShape,
        PencilHLineShape: PencilHLineShape,
        PencilVLineShape: PencilVLineShape,
        PencilCircleShape: PencilCircleShape,
        PencilSprayShape: PencilSprayShape,
        PencilNeighborShape: PencilNeighborShape,
        PencilFurShape: PencilFurShape,
        PencilShadedShape: PencilShadedShape,
        PencilSquaresShape: PencilSquaresShape,
        PecilRibbonShape: PecilRibbonShape
    };

    return shapes;

});