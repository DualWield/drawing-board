define(function (require) {

    var shapes = require('core/shapes');
    var Tool = require('tools/tool');

    var Line = function () {
        Tool.call(this, arguments);
        this.classes = {
            Basic: new Basic(),
            Dotted: new Dotted()
        };
        this.name = 'line';
        this.subTool = this.classes[this.type];

    };

    Line.prototype = new    Tool();

    var Basic = function () {
        this.name = '实线';
    };

    Basic.prototype = {
        setting: {
            Size: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.LineBasicShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.path[1] = {x:x, y:y};
            mc.repaintlayer();
        },
        end: function (x, y, mc) {

        }
    };

    var Dotted = function () {
        this.name = '虚线';
    };
    Dotted.prototype = {
        setting: {
            Size: 50,
            LineLongness: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.LineDottedShape.create();
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.path[1] = {x:x, y:y};
            this.currentShape.addDrawPath();
            mc.repaintlayer();


        },
        end: function (x, y, mc) {

        }
    };

    return Line;

});