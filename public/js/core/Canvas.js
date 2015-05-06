/**
 * @author: xuli@shnow.cn
 *
 * */
define(function (reuquire) {
    var Class = require('Class');

    var Canvas = Class.extend({
        init: function (options) {
            options = options || {};
            this.id = options.id || _.uniqueId('canvas_');
            this.name = options.name || 'layer';
            this.order = options.order || 1;
            this.opacity = 1;
            this.width = options.width;
            this.height = options.height;
            this.isCur = options.isCur || true;
            this.visibility = options.visibility || true;
            this.undoStack = [];
            this.redoStack = [];
            this.canvas = $('<canvas>')
                .attr({
                    width: this.width,
                    height: this.height,
                    id: this.id
                })
                .data({
                    name: this.name
                })
                .css({
                    opacity: this.opacity,
                    zIndex: this.order
                })
                .appendTo($('.draw-pic-canvas'));
            this.ctx = this.canvas[0].getContext('2d');
            this._bindEvent();
        },
        _bindEvent: function () {
            this.canvas.on('onchangeOpacity', $.proxy(this.onChangeOpacity, this))
                .on('onDelete', $.proxy(this.onDelete, this));

        },
        clear: function () {
            this.ctx.clearRect(0, 0, this.width, this.height);
        },
        onDelete: function () {
            this.canvas.remove();
        },
        onChangeOpacity: function (event, data) {
            this.canvas.css({opacity: data});
        },
        setBackground: function (color) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.width, this.height);
        },
        setOpacity: function (value) {
            this.opacity = value;
            this.canvas.trigger('onchangeOpacity', value);
        },
        convertToJSON: function () {
            var obj = {
                id: this.id,
                name: this.name,
                order: this.order,
                opacity: this.opacity,
                width: this.width,
                height: this.height,
                isCur: this.isCur,
                visibility: this.visibility
            };
            return JSON.stringify(obj);

        }

    });
    return Canvas;
});