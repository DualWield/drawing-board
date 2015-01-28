define(function (require) {
    var DrawCanvas = function () {
        this.canvasArr = [];

        this.order = 10;

    };
    DrawCanvas.prototype = {
        addCanvas : function (options) {
            var canvas = new Canvas(options);
            for(var i = 0,len = this.canvasArr.length; i<len; i++){
                this.canvasArr[i].isCur = false;
            }
            this.canvasArr.push(canvas);
        },
        getCanvas : function () {
            for(var i = 0,len = this.canvasArr.length; i<len; i++){
                if(this.canvasArr[i].isCur){
                    return this.canvasArr[i];
                }
            }
        }


    };

    var Canvas = function (options) {
        options = options || {};
        this.name = options.name || 'layer';
        this.order = options.order || this.order--;
        this.opacity = 1;
        this.width = options.width || 1006;
        this.height = options.height || 453;
        this.isCur = options.isCur || true;
        this.visibility = options.visibility || false;
        this.canvas = $('<canvas>')
            .attr({ width : this.width, height: this.height})
            .appendTo($('.draw-pic-canvas'));
        this.ctx = this.canvas[0].getContext('2d');
    };
    Canvas.prototype = {
        setBackground : function (color) {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
    };
    return DrawCanvas;
});