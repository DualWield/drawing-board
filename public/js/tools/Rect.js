define(function (require) {
    var Base = require('tools/Base');
    var shapes = require('core/shapes');
    var Class = require('Class');

    var Rect = Class.extend({
        init: function () {
            this.type = this.type || 'Basic';
            this.classes = {

                Basic: new Basic(),
                Solid: new Solid()
            };
            this.name = 'Rect';
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
            Border: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.RectBasicShape.create();
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.canvasId = mc.dc.getCanvas().id;
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
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.RectSolidShape.create();
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.canvasId = mc.dc.getCanvas().id;
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