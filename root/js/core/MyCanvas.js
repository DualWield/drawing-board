define(function (require) {
    var bindEvent = require('core/bindEvent');

    var Tools = require('tools/tools');


    var DrawCanvas = require('core/DrawCanvas');
    var component = require('component/init');

    /*  const value */
    window.MC = window.MC || {};
    window.MC.WIDTH = 1006;
    window.MC.HEIGHT = 453;


    function MyCanvas(){
        this.width = 1006;
        this.height = 453;
        this.mediator = new Mediator();

        this.$bc = $('#buffer-canvas')
            .attr('width', this.width)
            .attr('height', this.height);
        this.bc = this.$bc[0];
        this.bcCtx = this.bc.getContext('2d');

        this.tool = Tools.pencil;

        this.zoom = 1; //缩放

        this.dc = new DrawCanvas(this);
        //新加一个背景的layer
        this.dc.addCanvas({name:'background'});
        this.dc.getCanvas().setBackground('#fff');


        bindEvent(this);
        this.refreshStyle();
        this.mediator.subscribe('drawEnd', function () {
            this.dc.getCanvas().ctx.drawImage(this.bc, 0, 0);
            this.clearBc();
        }.bind(this));
    }
    MyCanvas.prototype = {
        refreshStyle : function () {
            this.$bc.css({ width : this.width, height:this.height});
        },
        begin: function (x, y) {
            this.tool.begin(x, y, this);
            this.isDragging = true;
            this.mediator.publish('drawStart', { tool : this.tool });
        },
        continue : function (x, y) {
            if(this.isDragging){
                this.tool.continue(x, y, this);
                this.mediator.publish('drawContinue', { tool: this.tool });
            }

        },
        end: function (x, y) {
            this.isDragging = false;
            this.tool.end(x, y, this);
            this.mediator.publish('drawEnd', { tool: this.tool });
        },
        drawEnd : function () {
           /* this.dc.getCanvas().ctx.drawImage(this.bc, 0, 0);
            this.clearBc();
            this.cloneToZoomCanvas();*/
        },

        /*cloneToZoomCanvas : function () {
            if(this.timer){
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(function () {
                this.zcCtx.drawImage(this.dc.getCanvas().canvas[0], 0, 0);
            }.bind(this), 1000);
        },*/
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
            this.tool = Tools[toolName];
        }
    };



    return MyCanvas;
});