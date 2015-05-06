define(function (require) {
    var Base = require('tools/Base');
    var shapes = require('core/shapes');
    var Class = require('Class');

    var Font = Class.extend({
        init: function () {
            this.type = this.type || 'Basic';
            this.classes = {
                Basic: new Basic()
            };
            this.name = 'Font';
            this.subTool = this.classes[this.type];
        }
    });



    var Basic = function () {
        this.name = 'Basic'

    };
    Basic.prototype = {
        setting: {
            Size: 50
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.FontBasicShape.create();
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.path[0] = {x:x, y:y};
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        }
    };


    return Font;

});