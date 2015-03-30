define(function (require) {
    var bindEvent = require('core/bindEvent');

    var Tools = require('tools/tools');
    var action = require('core/action');

    var DrawCanvas = require('core/DrawCanvas');
    var component = require('component/init');




    function MyCanvas() {

        //this.width = $(window).width() - 300;
        //this.height = $(window).height() - $('#top-area').height() - $('#bottom-area').height();
        this.width = 1006;
        this.height = 453;
        this.mediator = new Mediator();

        this.$dcWrap = $('.draw-pic-canvas')
            .css({
                width: this.width,
                height: this.height
            });
        this.$bc = $('#buffer-canvas')
            .attr('width', this.width)
            .attr('height', this.height);
        this.bc = this.$bc[0];
        this.bcCtx = this.bc.getContext('2d');

        this.tool = Tools.pencil;

        this.shapes = [];
        this.undoStack = [];
        this.redoStack = [];
        this.position = {
            x: 0,
            y: 0
        };

        this.zoom = 1; //缩放

        this.dc = new DrawCanvas(this);
        //新加一个背景的layer
        this.dc.addCanvas({name: 'background', mc: this});
        //新加一个透明的layer
        //this.dc.addCanvas({name: 'layer1', mc: this});

        bindEvent(this);
        this.refreshStyle();

        setTimeout(function () {
            this.recoverFromLS();
        }.bind(this),0)
    }

    MyCanvas.prototype = {
        refreshStyle: function () {
            this.$bc.css({width: this.width, height: this.height});
        },
        begin: function (x, y) {
            this.tool.begin(x, y, this);
            this.isDragging = true;
            this.mediator.publish('drawStart', {tool: this.tool});
        },
        continue: function (x, y) {
            if (this.isDragging) {
                this.tool.continue(x, y, this);
                this.mediator.publish('drawContinue', {tool: this.tool});
            }

        },
        end: function (x, y) {
            this.isDragging = false;
            this.tool.end(x, y, this);
            this.mediator.publish('drawOnchange', {tool: this.tool});

        },
        drawShapeInProgress: function (shape) {
            this.clipped(function () {
                this.transformed(function () {
                    shape.draw(this.dc.getCanvas().canvas[0]);
                }.bind(this), this.bcCtx);
            }.bind(this), this.bcCtx);
        },
        clipped: function (fn, contexts) {
            contexts = [].slice.call(arguments, 1);
            var x = this.position.x;
            var y = this.position.y;
            var width = this.width * this.zoom;
            var height = this.height * this.zoom;
            var i, len, ctx;
            for (i = 0, len = contexts.length; i < len; i++) {
                ctx = contexts[i];
                ctx.save();
                ctx.beginPath();
                ctx.rect(x, y, width, height);
                ctx.clip();
            }
            fn();
            for (i = 0, len = contexts.length; i < len; i++) {
                ctx = contexts[i];
                ctx.restore()
            }

        },
        transformed: function (fn, contexts) {
            contexts = [].slice.call(arguments, 1);
            var i, len, ctx;
            for (i = 0, len = contexts.length; i < len; i++) {
                ctx = contexts[i];
                ctx.save();
                ctx.translate(this.position.x, this.position.y);
                ctx.scale(this.zoom, this.zoom);
            }
            fn();
            for (i = 0, len = contexts.length; i < len; i++) {
                ctx = contexts[i];
                ctx.restore()
            }
        },
        clearBc: function () {
            this.bcCtx.clearRect(0, 0, this.width, this.height);
        },
        getColor: function () {
            //todo
            return this.color;
        },
        setColor: function (color) {
            this.color = color;
        },
        setTool: function (toolName) {
            this.tool = Tools[toolName];
        },
        repaintlayer: function () {
            var canvasArr = this.dc.canvasArr;
            var i, len;
            for(i = 0, len = canvasArr.length; i< len ; i++){
                canvasArr[i].clear();
            }
            for (i = 0, len = this.shapes.length; i < len; i++) {
                var shape = this.shapes[i];
                shape.draw(shape.canvas.canvas[0]);
            }
            this.saveJsonToLS();
        },
        clear: function () {
            var oldShapes = this.shapes;
            var newShapes = [];
            this.execute(new action.ClearAction(this, oldShapes, newShapes));
            this.mediator.publish('drawOnchange');
        },
        saveShape: function (shape, triggerShapeSaveEvent, previousShapeId) {
            this.execute(new action.AddShapeAction(this, shape, previousShapeId));
        },
        canUndo: function () {
            return !!this.undoStack.length;
        },
        canRedo: function () {
            return !!this.redoStack.length;
        },
        execute: function (action) {
            this.undoStack.push(action);
            action.do();
            this.redoStack = [];
        },
        undo: function () {
            if (!this.undoStack.length) {
                return false;
            }
            var action = this.undoStack.pop();
            action.undo();
            this.redoStack.push(action);
            this.mediator.publish('drawOnchange');
        },
        redo: function () {
            if (!this.redoStack.length) {
                return false;
            }
            var action = this.redoStack.pop();
            action.do();
            this.undoStack.push(action);
            this.mediator.publish('drawOnchange');
        },
        saveJsonToLS: function () {
            /*  把shapes 转化成json 存进ls里面 */
            var shapesJSONArr = [];
            _.each(this.shapes, function (shape) {
                shapesJSONArr.push(shape.convertToJSON());
            });
            store.set('shapes', shapesJSONArr);
        },
        recoverFromLS: function () {
            this.shapes = [];
            if(store.get('shapes')){
                _.each(store.get('shapes'), function (shapeString) {
                    var obj = JSON.parse(shapeString);
                    var shape = require('core/shapes')[obj.name].create(obj);
                    shape.canvas = _.where(mc.dc.canvasArr, {id: shape.canvasId})[0];
                    if(!shape.canvas){
                        //如果这个canvas已经被删掉了
                        shape.canvas = this.dc.addCanvas({
                            id: shape.canvasId
                        });
                    }
                    this.shapes.push(shape);
                }.bind(this));
                this.repaintlayer();
                this.mediator.publish('drawOnchange');
            }

            //this.repaintlayer();
        }

    };


    return MyCanvas;
});