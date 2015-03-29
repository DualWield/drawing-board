define(function (require) {
    var Tool = require('tools/tool');
    var shapes = require('core/shapes');

    var Eraser = function (type) {
        Tool.call(this, arguments);
        this.classes = {
            Basic: new Basic()
        };
        this.name = 'eraser';
        this.subTool = this.classes[this.type];
    };
    Eraser.prototype = new Tool();

    var Basic = function () {
        this.name = 'eraser';
        this.path = [];
    };
    Basic.prototype = {
        setting: {
            Size: 20
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.EraserShape.create();
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
            var ctx = mc.dc.getCanvas().ctx;
            //var ctx = mc.bcCtx;
            ctx.save();
            var nowPoint = this.path[this.path.length - 1];
            var lastPoint = this.path[this.path.length - 2];
            var w = this.setting.Size,
                dist = _.distanceBetween(nowPoint, lastPoint);
            for (var j = 0; j < dist; j += 6) {
                var s = j / dist;
                ctx.beginPath();
                ctx.globalCompositeOperation = 'destination-out';
                ctx.arc(lastPoint.x * s + nowPoint.x * (1 - s),
                    lastPoint.y * s + nowPoint.y * (1 - s), w, 0, Math.PI * 2);
                ctx.fill();

            }

            ctx.restore();

        }
    };

    return Eraser;

});