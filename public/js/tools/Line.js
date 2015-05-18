define(function (require) {
    var Base = require('tools/Base');
    var shapes = require('core/shapes');
    var Class = require('Class');

    var Line = Class.extend({
        init: function () {
            this.type = this.type || 'Basic';
            this.classes = {
                Basic: new Basic(),
                Dotted: new Dotted()
            };
            this.name = 'Line';
            this.subTool = this.classes[this.type];
        },
        setType: function (type) {
            this.subTool = this.classes[type];
        }
    });

    var Basic = function () {
        this.name = 'solid';
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
        this.name = 'dotted';
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