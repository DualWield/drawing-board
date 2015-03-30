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
            this.currentShape.createDrawPath();
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            this.currentShape.createDrawPath();
            mc.repaintlayer();

        },
        end: function (x, y, mc) {
        }
    };

    return Eraser;

});