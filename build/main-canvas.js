define(function (require) {
    /* buffer-canvas */
    var $ = require('jquery');

    var BufferCanvas = function () {
        this.init();
    };


    BufferCanvas.prototype = {
        init : function () {
            this.$canvas = $('.buffer-canvas');
            this.canvas = this.$canvas[0];
            this.context = this.canvas.getContext('2d');
            this._initCanvasStyle();
            this._bindEvent();
            this.pathTempArr = [];
        },
        getWidth : function () {
            return this.$canvas.attr('width');
        },
        getHeight : function () {
            return this.$canvas.attr('height');
        },
        clear : function(){
            this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
        },
        _initCanvasStyle : function () {
            this.$canvas.attr('width', 1006).attr('height', 453);

        },
        _bindEvent : function () {
            var paint;
            this.$canvas.on('mousedown', $.proxy(this._bufferCanvasMouseDown,this))
                .on('mousemove',$.proxy(this._bufferCanvasMouseMove,this))
                .on('mouseup',$.proxy(this._bufferCanvasMouseUp,this))
                .on('mouseenter',$.proxy(this._bufferCanvasMouseEnter,this))
                .on('mouseleave',$.proxy(this._bufferCanvasMouseLeave,this))
        },
        _bufferCanvasMouseDown : function (e) {
            this.startX = e.clientX-this.$canvas.offset().left;
            this.startY = e.clientY-this.$canvas.offset().top;
            this.isPaint = true;
            this.pathTempArr = [];

            this.pathTempArr.push({x : this.startX, y : this.startY });

        },
        _bufferCanvasMouseMove : function (e) {
            if(this.isPaint){
               /* this.endX = e.clientX-this.$canvas.offset().left;
                this.endY = e.clientY-this.$canvas.offset().top;
                this.context.beginPath();
                this.context.lineWidth = this.getLineWidth();
                this.context.lineCap = 'round';
                this.context.lineJoin = 'round';
                this.context.strokeStyle = this.getStrokeStyle();
                this.context.globalAlpha = 0.2;
                //this.context.strokeStyle = 'rgba(127, 127, 127, 0.42)';
                this.context.moveTo(this.startX,this.startY);
                this.context.lineTo(this.endX,this.endY);
                this.context.stroke();


                this.startX = this.endX;
                this.startY = this.endY;*/

                this.endX = e.clientX-this.$canvas.offset().left;
                this.endY = e.clientY-this.$canvas.offset().top;

                this.pathTempArr.push({ x : this.endX, y : this.endY});
                this.redraw();

                this.startX = this.endX;
                this.startY = this.endY;

            }

        },
        _bufferCanvasMouseUp : function (e) {
            //this.context.stroke();
            this.isPaint = false;
            mainModule.getPaintCanvas().getCurrentCanvas().context.drawImage(this.$canvas[0],0,0);
            this.clear();
        },
        _bufferCanvasMouseEnter : function (e) {
            if(this.isPaint){
                this.startX = e.offsetX;
                this.startY = e.offsetY;
                this.pathTempArr.push({ x : e.offsetX, Y : e.offsetY});
            }
        },
        _bufferCanvasMouseLeave : function (e) {

        },
        redraw : function () {
           // this.clear();

            var dist = _.distanceBetween({x : this.startX, y: this.startY}, {x: this.endX, y : this.endY});
            var angle = _.angleBetween({x : this.startX, y: this.startY}, {x: this.endX, y : this.endY});

            for(var i = 0,len = dist; i < len ; i++){
                var x = this.startX + (Math.sin(angle) * i);
                var y = this.startY + (Math.cos(angle) * i);
                var radgrad = this.context.createRadialGradient(x, y, 10, x, y, 20);
                radgrad.addColorStop(0, '#000');
                radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
                radgrad.addColorStop(1, 'rgba(0,0,0,0)');

                this.context.fillStyle = radgrad;
                this.context.globalAlpha = 0.2;
                this.context.fillRect(x-20, y-20, 40, 40);

            }

/*
            this.context.beginPath();
            for(var i = 0,len = this.pathTempArr.length; i < len ; i++){
                this.context.moveTo(this.pathTempArr[i].startX, this.pathTempArr[i].startY);
                this.context.lineTo(this.pathTempArr[i].endX, this.pathTempArr[i].endY);
            }
            this.context.lineWidth = this.getLineWidth();
            this.context.lineCap = 'round';
            this.context.lineJoin = 'round';
            this.context.strokeStyle = this.getStrokeStyle();
            //this.context.globalAlpha = this.getGlobalAlpha();
            this.context.globalAlpha = this.getGlobalAlpha();
            //this.context.shadowBlur = 50;
            //this.context.shadowColor = this.getStrokeStyle();

            this.context.stroke();
            this.context.closePath();*/
        },
        getStrokeStyle : function () {
            return this.strokeStyle || '#000';
        },
        setStrokeStyle : function (value) {
            this.strokeStyle = value;
        },
        getLineWidth : function () {
            return this.lineWidth || '30';
        },
        setLineWidth : function (value) {
            this.lineWidth = value;
        },
        getGlobalAlpha : function () {
            return this.globalAlpha || '1';
        },
        setGlobalAlpha : function (value) {
            this.globalAlpha = value;
        }

    };

    var Canvas = function (options) {
        this.options = options;


        this.name = options.name || '默认';
        this.order = options.order;
        this.opacity = 1;
        this.width = options.width || '1006';
        this.height = options.height || '453';
        this.isCurrent = options.isCurrent || 'false';
        this.visibility = options.visibility || 'true';
        this.init();
    };
    Canvas.prototype = {
        init : function () {

            this._render();
        },
        _render : function () {
            this.$canvas = $('<canvas>')
                .attr('width', 1006)
                .attr('height' , 453)
                .css({
                    width : this.width,
                    height : this.height,
                    zIndex : this.order,
                    opacity : this.opacity
                }).appendTo($('.draw-pic-canvas'));
            this.canvas = this.$canvas[0];
            this.context = this.canvas.getContext('2d');
        },
        getWidth : function () {
            return this.$canvas.width();
        },
        getHeight : function () {
            return this.$canvas.height();
        },
        clear : function(){
            this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
        }
    };


    var PaintCanvas = function () {

        this.canvasArr = [];
        this.init();
    };
    PaintCanvas.prototype = {
        init : function () {
            var options = {
                selector : ',',
                name : 'background',
                order : 1,
                width : this.width,
                height : this.height,
                isCurrent : true,
                visibility : true
            };
            var bgCanvas = new Canvas(options);
            bgCanvas.context.fillStyle = '#fff';
            bgCanvas.context.fillRect(0, 0, bgCanvas.getWidth(), bgCanvas.getHeight());
            this.canvasArr.push(bgCanvas);
        },
        getCurrentCanvas : function () {
            return _.findWhere(this.canvasArr, {isCurrent : true});
        },
        clear : function () {
            _.each(this.canvasArr, function (canvas) {
                canvas.clear();
            })
        }
    };

    var mainModule = {
        init : function () {
            this.bufferCanvas = new BufferCanvas();
            this.paintCanvas = new PaintCanvas();


        },
        getPaintCanvas : function () {
            return this.paintCanvas;
        },
        getBufferCanvas : function () {
            return this.bufferCanvas;
        }
    };
    return mainModule;
});