define(function (require) {
    var DrawCanvas = function () {
        this.canvasArr = [];

        this.order = 10;

    };
    DrawCanvas.prototype = {
        addCanvas: function (options) {
            options = options || {};
            /* 对name进行加工,layer自增1 */
            var nameTempArr = [], nameTemp, numArr=[], i, len, orderArr=[],orderTempArr=[];
            for (i = 0, len = this.canvasArr.length; i < len; i++) {
                if (nameTemp = /layer(\d)/.exec(this.canvasArr[i].name)) {
                    nameTempArr.push(+nameTemp[1]);
                }
                orderTempArr.push(this.canvasArr[i].order);
            }

            for (i = 1, len = nameTempArr.length+2; i < len; i++) {
                numArr.push(i);
            }
            for (i = 1, len = orderTempArr.length+2; i < len; i++) {
                orderArr.push(i);
            }

            var num = _.difference(numArr, nameTempArr);

            options.name = options.name || 'layer' + num[0];

            /* 对order进行加工 */

            var order = _.difference(orderArr,orderTempArr);
            options.order = order[0];

            var canvas = new Canvas(options);
            for (i = 0, len = this.canvasArr.length; i < len; i++) {
                this.canvasArr[i].isCur = false;
            }
            this.canvasArr.unshift(canvas);
        },
        getCanvas: function () {
            for (var i = 0, len = this.canvasArr.length; i < len; i++) {
                if (this.canvasArr[i].isCur) {
                    return this.canvasArr[i];
                }
            }
        },
        delCurCanvas: function () {
            if(this.canvasArr.length <= 1){
                return false;
            }
            var arr = [];
            for (var i = 0, len = this.canvasArr.length; i < len; i++) {
                if (!this.canvasArr[i].isCur) {
                    arr.push(this.canvasArr[i]);
                }else{
                    this.canvasArr[i].canvas.remove();
                }
            }
            this.canvasArr = arr;
            arr[0].isCur = true;


        },
        /*
        *  reset By IDs
        * */
        resetCanvasArr: function (idArr) {
            var newArr = [];
            for(var i = 0,len = idArr.length, j = idArr.length; i<len ; i++,j--){
                var canvas = _.where(this.canvasArr,{id: idArr[i]})[0];
                canvas.canvas.css({
                    zIndex: j
                });
                canvas.order = j;
            }
        }


    };

    var Canvas = function (options) {
        options = options || {};
        this.id= _.uniqueId('canvas_');
        this.name = options.name || 'layer';
        this.order = options.order || 1;
        this.opacity = 1;
        this.width = options.width || 1006;
        this.height = options.height || 453;
        this.isCur = options.isCur || true;
        this.visibility = options.visibility || true;
        this.canvas = $('<canvas>')
            .attr({
                width: this.width,
                height: this.height
            })
            .data({
                name: this.name
            })
            .css({
                opacity:this.opacity,
                zIndex: this.order
            })
            .appendTo($('.draw-pic-canvas'));
        this.ctx = this.canvas[0].getContext('2d');
        this._bindEvent();
    };
    Canvas.prototype = {
        _bindEvent: function () {
            this.canvas.on('onchangeOpacity', $.proxy(this.onChangeOpacity, this));
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