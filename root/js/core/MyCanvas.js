define(function (require) {
    var bindEvent = require('core/bindEvent');

    var Pencil = require('tools/Pencil');
    var Eraser = require('tools/Eraser');
    var Line = require('tools/Line');
    var Rect = require('tools/Rect');

    var DrawCanvas = require('core/DrawCanvas');
    var component = require('component/init');

    /*  const value */
    window.MC = window.MC || {};
    window.MC.WIDTH = 1006;
    window.MC.HEIGHT = 453;


    function MyCanvas(){
        this.width = 1006;
        this.height = 453;

        this.$bc = $('#buffer-canvas')
            .attr('width', this.width)
            .attr('height', this.height);
        this.bc = this.$bc[0];
        this.bcCtx = this.bc.getContext('2d');
        this.tool = new Pencil();

        this.zoom = 1; //缩放

        this.dc = new DrawCanvas();
        //新加一个背景的layer
        this.dc.addCanvas({name:'background'});
        this.dc.getCanvas().setBackground('#fff');



        bindEvent(this);
        this.refreshStyle();
    }
    MyCanvas.prototype = {
        trigger : function (name, data) {
            this.bc.dispatchEvent(new CustomEvent(name, {
                detail : data
            }));
        },
        _trigger : function (name, data) {
            this[name](data);
        },
        refreshStyle : function () {
            this.$bc.css({ width : this.width, height:this.height});
        },
        on: function (name, fn) {
            var wrapper = function (e) {
                fn(e.detail);
            };
            this.bc.addEventListener(name, wrapper);
        },
        begin: function (x, y) {
            this.tool.begin(x, y, this);
            this.isDragging = true;
            this.trigger('drawStart', { tool : this.tool });
        },
        continue : function (x, y) {
            if(this.isDragging){
                this.tool.continue(x, y, this);
                this.trigger('drawContinue', { tool: this.tool });
            }

        },
        end: function (x, y) {
            this.isDragging = false;
            this.tool.end(x, y, this);
            this._trigger('drawEnd', { tool: this.tool });
        },
        drawEnd : function () {
            this.dc.getCanvas().ctx.drawImage(this.bc, 0, 0);
            this.clearBc();
            this.cloneToZoomCanvas();
        },

        cloneToZoomCanvas : function () {
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(function () {
                this.zcCtx.drawImage(this.dc.getCanvas().canvas[0], 0, 0);
            }.bind(this), 1000);
        },
        clearBc : function () {
            this.bcCtx.clearRect(0, 0, this.width, this.height);
        },
        getColor : function () {
            //todo
            return this.color;
        },
        setColor : function (color) {
            this.color = color;
        },
        setTool : function (toolName) {
            var tools = {
                'Pencil' : Pencil,
                'Eraser' : Eraser,
                'Line' : Line,
                'Rect' : Rect
            };
            this.tool = new tools[toolName]();
        }
    };



    return MyCanvas;
});