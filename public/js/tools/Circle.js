define(function (require) {

    var shapes = require('core/shapes');
    var Base = require('tools/Base');
    var Class = require('Class');

    var Circle = Class.extend({
        init: function () {
            this.type = this.type || 'Basic';
            this.classes = {
                Basic: new Basic(),
                Solid: new Solid()
            };
            this.name = 'circle';
            this.subTool = this.classes[this.type];
        },
        setType: function (type) {
            this.subTool = this.classes[type];
        }
    });

    var Basic = function () {
        this.name = 'Basic'

    };
    Basic.prototype = {
        setting: {
            Border: {
                min: 1,
                max: 100,
                value: 4
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.CircleBasicShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
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

    var Solid = function () {
        this.name = 'Solid';
    };
    Solid.prototype = {
        setting: {
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.CircleSolidShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
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

    return Circle;

});