define(function (require) {
    var Base = require('tools/Base');
    var shapes = require('core/shapes');
    var Class = require('Class');

    var Eraser = Class.extend({
        init: function () {
            this.type = this.type || 'Basic';
            this.classes = {
                Basic: new Basic()
            };
            this.name = 'Eraser';
            this.subTool = this.classes[this.type];
        },
        setType: function (type) {
            this.subTool = this.classes[type];
        }
    });


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