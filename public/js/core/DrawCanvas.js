define(function (require) {
    //var Mediator = require('mediator');

    var DrawCanvas = function (mc) {
        this.mc = mc;
        this.canvasArr = [];
        this.mediator = new Mediator();
        this.order = 10;


    };
    DrawCanvas.prototype = {
        addCanvas: function (options) {
            options = options || {};
            /* 对name进行加工,layer自增1 */
            var nameTempArr = [], nameTemp, numArr = [], i, len, orderArr = [], orderTempArr = [];
            for (i = 0, len = this.canvasArr.length; i < len; i++) {
                if (nameTemp = /layer(\d)/.exec(this.canvasArr[i].name)) {
                    nameTempArr.push(+nameTemp[1]);
                }
                orderTempArr.push(this.canvasArr[i].order);
            }

            for (i = 1, len = nameTempArr.length + 2; i < len; i++) {
                numArr.push(i);
            }
            for (i = 1, len = orderTempArr.length + 2; i < len; i++) {
                orderArr.push(i);
            }

            var num = _.difference(numArr, nameTempArr);

            options.name = options.name || 'layer' + num[0];

            /* 对order进行加工 */

            var order = _.difference(orderArr, orderTempArr);
            options.order = order[0];

            var canvas = new Canvas(options);
            for (i = 0, len = this.canvasArr.length; i < len; i++) {
                this.canvasArr[i].isCur = false;
            }
            this.canvasArr.unshift(canvas);
            this.mc.mediator.publish('onChangeLayer');

            return canvas;
        },
        getCanvas: function () {
            for (var i = 0, len = this.canvasArr.length; i < len; i++) {
                if (this.canvasArr[i].isCur) {
                    return this.canvasArr[i];
                }
            }
        },
        delCurCanvas: function () {
            if (this.canvasArr.length <= 1) {
                return false;
            }
            var arr = [];
            for (var i = 0, len = this.canvasArr.length; i < len; i++) {
                if (!this.canvasArr[i].isCur) {
                    arr.push(this.canvasArr[i]);
                } else {
                    this.canvasArr[i].canvas.trigger('onDelete');
                }
            }
            this.canvasArr = arr;
            arr[0].isCur = true;
            this.mc.mediator.publish('onChangeLayer');


        },
        removeCanvas: function (id) {
            var deledCanvas = _.where(this.canvasArr, {id: id})[0];
            var i = _.indexOf(this.canvasArr, deledCanvas);
            this.canvasArr.splice(i, 1);
            deledCanvas.canvas.trigger('onDelete');
            this.mc.mediator.publish('onChangeLayer');

        },
        concatLayer: function () {
            var orderArr = this.getOrderArr(this.canvasArr);
            for (var i = 1, len = orderArr.length; i < len; i++) {
                this.removeCanvas(orderArr[i - 1].id);
                orderArr[i].ctx.globalAlpha = orderArr[i - 1].opacity;
                orderArr[i].ctx.drawImage(orderArr[i - 1].canvas[0], 0, 0);
            }

            this.canvasArr[0].isCur = true;
            /*  把shapes 所在的canvas指向这一个 */
            _.each(mc.shapes, function (shape) {
                shape.canvas = this.canvasArr[0];
            }.bind(this));
            this.mc.mediator.publish('onChangeLayer');

        },
        getOrderArr: function (arr) {
            var orderArr = [];
            _.each(arr, function (canvas) {
                orderArr[canvas.order] = canvas;
            });
            orderArr = _.compact(orderArr).reverse();

            return orderArr;
        },
        /*
         *  reset By IDs
         * */
        resetCanvasArr: function (idArr) {
            var newArr = [];
            for (var i = 0, len = idArr.length, j = idArr.length; i < len; i++, j--) {
                var canvas = _.where(this.canvasArr, {id: idArr[i]})[0];
                canvas.canvas.css({
                    zIndex: j
                });
                canvas.order = j;
            }
            this.mc.mediator.publish('onChangeLayer');
        }
    };

    var Canvas = function (options) {
        options = options || {};
        this.id = _.uniqueId('canvas_');
        this.name = options.name || 'layer';
        this.order = options.order || 1;
        this.opacity = 1;
        this.width = options.width || 1006;
        this.height = options.height || 453;
        this.isCur = options.isCur || true;
        this.visibility = options.visibility || true;
        this.undoStack = [];
        this.redoStack = [];
        this.canvas = $('<canvas>')
            .attr({
                width: this.width,
                height: this.height
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
    };
    Canvas.prototype = {
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
        }
    };
    return DrawCanvas;
});