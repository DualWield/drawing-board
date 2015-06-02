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
            Size: {
                min: 1,
                max: 50,
                value: 10
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.LineBasicShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.canvasId = mc.dc.getCanvas().id;

            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.path[1] = {x:x, y:y};
            mc.repaintBufferLayer();
        },
        end: function (x, y, mc) {

        }
    };

    var Dotted = function () {
        this.name = 'dotted';
    };
    Dotted.prototype = {
        setting: {
            Size: {
                min: 1,
                max: 50,
                value: 10
            },
            LineLongness: {
                min: 1,
                max: 100,
                value: 50
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.LineDottedShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvasId = mc.dc.getCanvas().id;
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.path[1] = {x:x, y:y};
            this.currentShape.addDrawPath();
            mc.repaintBufferLayer();



        },
        end: function (x, y, mc) {

        }
    };

    return Line;

});