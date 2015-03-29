define(function (require) {
    /*
     *  @param: {string} name 笔刷类型
     *
     * */
    var shapes = require('core/shapes');
    var Tool = require('tools/tool')
/*
    var Tool = Class.extend({
        setType: function (type) {
            this.subTool = this.classes[type];
        },
        begin: function (x, y, mc) {
            this.subTool.begin(x, y, mc);
        },
        continue: function (x, y, mc) {
            this.subTool.continue(x, y, mc);

        },
        end: function (x, y, mc) {
            this.subTool.end(x, y, mc);
        }
    });*/
   /* var Pencil = Tool.extend({
        init: function () {
            this.classes = {
                Basic: new Basic(),
                HalfTone: new HalfTone(),
                HLine: new HLine(),
                VLine: new VLine(),
                Circle: new Circle(),
                Spray: new Spray(),
                Neighbor: new Neighbor(),
                Fur: new Fur(),
                Shaded: new Shaded(),
                Squares: new Squares(),
                Ribbon: new Ribbon()

            };
            this.name = 'pencil';
            this.subTool = this.classes[this.type];
        }
    });*/
    var Pencil = function (type) {
        Tool.call(this, arguments);
        this.classes = {
            Basic: new Basic(),
            HalfTone: new HalfTone(),
            HLine: new HLine(),
            VLine: new VLine(),
            Circle: new Circle(),
            Spray: new Spray(),
            Neighbor: new Neighbor(),
            Fur: new Fur(),
            Shaded: new Shaded(),
            Squares: new Squares(),
            Ribbon: new Ribbon()

        };
        this.name = 'pencil';
        this.subTool = this.classes[this.type];

    };
    Pencil.prototype = new Tool();

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
            this.currentShape = shapes.PencilBasicShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
            //mc.drawShapeInProgress(this.currentShape);
            mc.repaintlayer();
        },

        end: function (x, y, mc) {
        }
    };

    var HalfTone = function () {
        this.name = 'halftone';
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
            this.currentShape = shapes.PencilHalfToneShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPoint(x, y);
            mc.saveShape(this.currentShape);

        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
            //mc.drawShapeInProgress(this.currentShape);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
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
            this.currentShape = shapes.PencilHLineShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPoint(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
            //mc.drawShapeInProgress(this.currentShape);

            mc.repaintlayer();
        },
        end: function (x, y, mc) {
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
            this.currentShape = shapes.PencilVLineShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPoint(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
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
            this.currentShape = shapes.PencilCircleShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPoint(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
          //  mc.repaintlayer();
            mc.drawShapeInProgress(this.currentShape);
        },
        end: function (x, y, mc) {
        }
    };

    var Spray = function () {
        this.name = 'spray';
        this.path = [];
    };
    Spray.prototype = {
        setting: {
            Density: 50,
            Opacity: 100,
            Size: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilSprayShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
            this.currentShape.setInterVal();
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);

        },
        end: function (x, y, mc) {
            this.currentShape.clearInterval();
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
            this.currentShape = shapes.PencilNeighborShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        },
        redraw: function (mc) {
            var ctx = mc.bcCtx;
            var nowPoint = this.path[this.path.length - 1];
            var lastPoint = this.path[this.path.length - 2];
            var opacity = this.setting.Opacity / 100;
            var color = mc.getColor();
            var dx, dy;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';

            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            ctx.strokeStyle = RGBAColor;
            ctx.lineWidth = this.setting.Size / 20;
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(nowPoint.x, nowPoint.y);
            ctx.stroke();
            for (var i = 0, len = this.path.length; i < len; i += 5) {
                dx = this.path[i].x - nowPoint.x;
                dy = this.path[i].y - nowPoint.y;
                var d = dx * dx + dy * dy;
                if (d < 1000) {
                    ctx.beginPath();
                    ctx.strokeStyle = RGBAColor;
                    ctx.moveTo(nowPoint.x + (dx * 0.2), nowPoint.y + (dy * 0.2));
                    ctx.lineTo(this.path[i].x - (dx * 0.2), this.path[i].y - (dy * 0.2));
                    ctx.stroke();
                }
            }


        }
    };


    var Fur = function () {
        this.name = 'fur';
        this.path = [];
    };
    Fur.prototype = {
        setting: {
            Opacity: 100,
            Size: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilFurShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        },
        redraw: function (mc) {
            var length = this.path.length;
            var ctx = mc.bcCtx;
            var nowPoint = this.path[this.path.length - 1];
            var lastPoint = this.path[this.path.length - 2];
            var opacity = this.setting.Opacity / 100;
            var color = mc.getColor();
            var dx, dy;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';

            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            ctx.strokeStyle = RGBAColor;
            ctx.lineWidth = this.setting.Size / 20;
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(nowPoint.x, nowPoint.y);
            ctx.stroke();
            for (var i = 0, len = this.path.length; i < len; i++) {
                dx = this.path[i].x - nowPoint.x;
                dy = this.path[i].y - nowPoint.y;
                var d = dx * dx + dy * dy;

                if (d < 2000 && Math.random() > d / 2000) {
                    ctx.beginPath();
                    ctx.strokeStyle = RGBAColor;
                    ctx.lineWidth = 1;
                    ctx.moveTo(nowPoint.x + (dx * 0.5), nowPoint.y + (dy * 0.5));
                    ctx.lineTo(nowPoint.x - (dx * 0.5), nowPoint.y - (dy * 0.5));
                    ctx.stroke();
                }
            }


        }
    };

    var Shaded = function () {
        this.name = 'shaded';
        this.path = [];
    };
    Shaded.prototype = {
        setting: {
            Opacity: 100,
            Size: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilShadedShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        }
    };

    var Squares = function () {
        this.name = 'squares';
    };
    Squares.prototype = {
        setting: {
            Size: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilSquaresShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        }
    };

    var Ribbon = function () {
        this.name = 'ribbon';
        this.path = [];
        // this.init();

    };
    Ribbon.prototype = {
        setting: {
            LineNum: 50,
            Opacity: 50
        },
        update: function () {
            var i;
            var ctx = window.mc.bcCtx;

            ctx.lineWidth = 1;
            var opacity = this.setting.Opacity / 100;
            var color = mc.getColor();
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            ctx.strokeStyle = RGBAColor;

            for (i = 0; i < this.path.length; i++) {
                ctx.beginPath();
                ctx.moveTo(this.path[i].dx, this.path[i].dy);

                this.path[i].dx -= this.path[i].ax = (this.path[i].ax + (this.path[i].dx - this.mouseX) * this.path[i].div) * this.path[i].ease;
                this.path[i].dy -= this.path[i].ay = (this.path[i].ay + (this.path[i].dy - this.mouseY) * this.path[i].div) * this.path[i].ease;
                ctx.lineTo(this.path[i].dx, this.path[i].dy);
                ctx.stroke();
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilRibbonShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
            for (var i = 0; i < this.setting.LineNum; i++) {
                this.currentShape.tempPath.push({
                    dx: 0,
                    dy: 0,
                    ax: 0,
                    ay: 0,
                    div: 0.1,
                    ease: Math.random() * 0.2 + 0.6
                });
            }
            this.interval = setInterval(
                this.currentShape.update.bind(this.currentShape), 1000 / 60);

            this.mouseX = x;
            this.mouseY = y;
            for (var i = 0; i < this.currentShape.tempPath.length; i++) {
                this.currentShape.tempPath[i].dx = x;
                this.currentShape.tempPath[i].dy = y;
            }

        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();

        },
        end: function (x, y, mc) {
            clearInterval(this.interval);
        }
    };
    return Pencil;


});