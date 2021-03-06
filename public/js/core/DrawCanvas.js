define(function (require) {
    //var Mediator = require('mediator');
    var Canvas = require('core/Canvas');

    var DrawCanvas = function (mc) {
        this.mc = mc;
        this.canvasArr = [];
        this.order = 10;
    };
    DrawCanvas.prototype = {
        addCanvas: function (options) {
            options = options || {};
            _.extend(options, {
                width: this.mc.width,
                height: this.mc.height
            });
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
            if (!options.name) {
                //如果没有定义name的话
                var num = _.difference(numArr, nameTempArr);
                options.name = options.name || 'layer' + num[0];
            }
            /* 对order进行加工 */
            if(!options.order){
                var order = _.difference(orderArr, orderTempArr);
                options.order = order[0];
            }

            /* 对id进行加工 */
            var tempArr = _.map(_.pluck(this.canvasArr, 'id'), function (canvasId) {
                return +canvasId.replace('canvas_', '');
            }.bind(this));
            if (tempArr.length === 0) {
                options.id = 'canvas_1';
            } else {
                options.id = 'canvas_' + (_.max(tempArr) + 1);
            }

            var canvas = Canvas.create(options);
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
            var orderArr = this.getOrderArr(this.canvasArr).reverse();
            for (var i = 1, len = orderArr.length; i < len; i++) {
                this.removeCanvas(orderArr[i - 1].id);
            }

            this.canvasArr[0].isCur = true;
            /*  把shapes 所在的canvas指向这一个 */
            //首先要根据shapes 的order进行排序
            mc.shapes = _.sortBy(mc.shapes, function(data){ return data.canvas.order;});
            var shapes = [];
            _.each(mc.shapes, function (shape) {
                if(shape.canvas.visibility){
                    shape.canvas = this.canvasArr[0];
                    shape.canvasId = this.canvasArr[0].id;
                    shapes.push(shape);
                }
            }.bind(this));
            mc.shapes = shapes;
            this.mc.mediator.publish('onChangeLayer');
            this.mc.mediator.publish('drawOnchange');


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
        },
        removeAllCanvas: function () {
            for(var i = 0 , len = this.canvasArr.length ; i < len ; i++){
                var canvas = this.canvasArr[i];
                canvas.canvas.remove();
            }
            this.canvasArr = [];
        }
    };


    return DrawCanvas;
});