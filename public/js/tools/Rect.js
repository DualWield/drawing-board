define(function (require) {

    var shapes = require('core/shapes');
    var Tool = require('tools/tool');


    var Rect = function () {
        Tool.call(this, arguments);
        this.classes = {
            Basic: new Basic(),
            Solid: new Solid()
        };
        this.name = 'rect';
        this.subTool = this.classes[this.type];

    };
    Rect.prototype = new Tool();

    var Basic = function () {
        this.name = 'Basic'

    };
    Basic.prototype = {
        setting: {
            Border: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.RectBasicShape.create();
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

    var Solid = function () {
        this.name = 'Solid';
    };
    Solid.prototype = {
        setting: {
            Border: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.RectSolidShape.create();
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

    return Rect;

});