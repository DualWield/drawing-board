define(function (require) {
    /*
     *  @param: {string} name 笔刷类型
     *
     * */
    var shapes = require('core/shapes');
    var Base = require('tools/Base');
    var Class = require('Class');

    var Pencil = Class.extend({
        init: function () {
            this.type = this.type || 'Basic';
            this.classes = {
                Basic: Basic.create(),
                HalfTone: new HalfTone(),
                HLine: new HLine(),
                VLine: new VLine(),
                Spray: new Spray(),
                Neighbor: new Neighbor(),
                Fur: new Fur(),
                Shaded: new Shaded(),
                Squares: new Squares(),
                Ribbon: new Ribbon()

            };
            this.name = 'pencil';
            this.subTool = this.classes[this.type];
        },
        setType: function (type) {
            this.subTool = this.classes[type];
        }
    });


    var Basic = Base.extend({
        init: function () {
            this.name = 'pencil';
            this.path = [];
        },
        setting: {
            Opacity: {
                min: 1,
                max: 100,
                value: 100
            },
            Size: {
                min: 1,
                max: 50,
                value: 5
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilBasicShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvasId = mc.dc.getCanvas().id;
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);

        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
            mc.repaintBufferLayer();
        },

        end: function (x, y, mc) {
        }
    });

    var HalfTone = function () {
        this.name = 'halftone';
    };
    HalfTone.prototype = {
        setting: {
            Opacity: {
                min: 0,
                max: 100,
                value: 100
            },
            Size: {
                min:1,
                max: 100,
                value: 50
            },
            DotSize: {
                min: 1,
                max: 100,
                value: 50
            }
        },
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.setting.DotSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');
            patternCanvas.width = patternCanvas.height = dotWidth + dotDistance;
            var color = mc.getColor();
            var opacity = this.setting.Opacity / 100;
            var RGBAColor = _.hexToRGBA(color, opacity);
            patternCtx.fillStyle = RGBAColor;
            patternCtx.beginPath();
            patternCtx.arc(dotWidth / 2, dotWidth / 2, dotWidth / 2, 0, Math.PI * 2, false);
            patternCtx.closePath();
            patternCtx.fill();
            return ctx.createPattern(patternCanvas, 'repeat');
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilHalfToneShape.create();
            mc.bufferShape = this.currentShape;
            this.currentShape.canvas = mc.dc.getCanvas();
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.addPoint(x, y);
            mc.saveShape(this.currentShape);

        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
            //mc.drawShapeInProgress(this.currentShape);
            mc.repaintBufferLayer();
        },
        end: function (x, y, mc) {
        }
    };

    var HLine = function () {
        this.name = 'hline';
    };
    HLine.prototype = {
        setting: {
            Opacity: {
                min: 0,
                max: 100,
                value: 100
            },
            Size: {
                min: 1,
                max: 100,
                value: 20
            },
            LineSize: {
                min: 1,
                max: 100,
                value: 10
            }
        },
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.setting.LineSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');

            patternCanvas.width = patternCanvas.height = dotWidth * 2;

            var color = mc.getColor();
            var opacity = this.setting.Opacity / 100;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            patternCtx.strokeStyle = RGBAColor;
            patternCtx.beginPath();
            patternCtx.lineWidth = dotWidth;
            patternCtx.moveTo(0, dotWidth);
            patternCtx.lineTo(dotWidth * 2, dotWidth);

            patternCtx.closePath();
            patternCtx.stroke();
            return ctx.createPattern(patternCanvas, 'repeat');
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilHLineShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPoint(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
            //mc.drawShapeInProgress(this.currentShape);
            mc.repaintBufferLayer();
        },
        end: function (x, y, mc) {
        }
    };

    var VLine = function () {
        this.name = 'vline';
        this.path = [];
    };
    VLine.prototype = {
        setting: {
            Opacity: {
                min: 0,
                max: 100,
                value: 100
            },
            Size: {
                min: 1,
                max: 100,
                value: 40
            },
            LineSize: {
                min: 1,
                max: 100,
                value: 47
            }
        },
        getPattern: function (ctx) {
            var patternCanvas = document.createElement('canvas'),
                dotWidth = this.setting.LineSize,
                dotDistance = 5,
                patternCtx = patternCanvas.getContext('2d');
            patternCanvas.width = patternCanvas.height = dotWidth * 2;
            var color = mc.getColor();
            var opacity = this.setting.Opacity / 100;
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            patternCtx.strokeStyle = RGBAColor;
            patternCtx.beginPath();
            patternCtx.lineWidth = dotWidth;
            patternCtx.moveTo(dotWidth, 0);
            patternCtx.lineTo(dotWidth, dotWidth * 2);

            patternCtx.closePath();
            patternCtx.stroke();
            return ctx.createPattern(patternCanvas, 'repeat');
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilVLineShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPoint(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPoint(x, y);
            mc.repaintBufferLayer();

        },
        end: function (x, y, mc) {
        }
    };



    var Spray = function () {
        this.name = 'spray';
        this.path = [];
    };
    Spray.prototype = {
        setting: {
            Density: {
                min: 1,
                max: 100,
                value: 10
            },
            Opacity: {
                min: 1,
                max: 100,
                value: 100
            },
            Size: {
                min: 1,
                max: 100,
                value: 10
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilSprayShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
            this.currentShape.setInterVal();
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);

        },
        end: function (x, y, mc) {
            this.currentShape.clearInterval();
        }
    };

    var Neighbor = function () {
        this.name = 'neighbor';
        this.path = [];
    };
    Neighbor.prototype = {
        setting: {
            Opacity: {
                min: 1,
                max: 100,
                value: 100
            },
            Size: {
                min: 1,
                max: 100,
                value: 20
            },
            Density: {
                min: 1,
                max: 100,
                value: 50
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilNeighborShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        }
    };


    var Fur = function () {
        this.name = 'fur';
        this.path = [];
    };
    Fur.prototype = {
        setting: {
            Opacity: {
                min: 1,
                max: 100,
                value: 100
            },
            Size: {
                min: 1,
                max: 100,
                value: 50
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilFurShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        }



    };

    var Shaded = function () {
        this.name = 'shaded';
        this.path = [];
    };
    Shaded.prototype = {
        setting: {
            Opacity: {
                min: 0,
                max: 100,
                value: 100
            },
            Size: {
                min: 1,
                max: 100,
                value: 50
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilShadedShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        }
    };

    var Squares = function () {
        this.name = 'squares';
    };
    Squares.prototype = {
        setting: {
            Size: {
                min: 1,
                max: 100,
                value: 50
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilSquaresShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();
        },
        end: function (x, y, mc) {
        }
    };

    var Ribbon = function () {
        this.name = 'ribbon';
        this.path = [];
        // this.init();

    };
    Ribbon.prototype = {
        setting: {
            LineNum: {
                min: 1,
                max: 100,
                value: 10
            },
            Opacity: {
                min: 1,
                max: 100,
                value: 10
            }
        },
        update: function () {
            var i;
            var ctx = window.mc.bcCtx;

            ctx.lineWidth = 1;
            var opacity = this.setting.Opacity / 100;
            var color = mc.getColor();
            var RGBAColor = 'rgba(' + (+('0x' + color[1] + color[2])) + ',' +
                (+('0x' + color[3] + color[4])) + ',' +
                (+('0x' + color[5] + color[6])) + ',' + opacity + ')';
            ctx.strokeStyle = RGBAColor;

            for (i = 0; i < this.path.length; i++) {
                ctx.beginPath();
                ctx.moveTo(this.path[i].dx, this.path[i].dy);

                this.path[i].dx -= this.path[i].ax = (this.path[i].ax + (this.path[i].dx - this.mouseX) * this.path[i].div) * this.path[i].ease;
                this.path[i].dy -= this.path[i].ay = (this.path[i].ay + (this.path[i].dy - this.mouseY) * this.path[i].div) * this.path[i].ease;
                ctx.lineTo(this.path[i].dx, this.path[i].dy);
                ctx.stroke();
            }
        },
        begin: function (x, y, mc) {
            this.currentShape = shapes.PencilRibbonShape.create();
            mc.bufferShape = this.currentShape;
            _.each(this.setting, function (value, key) {
                this.currentShape.setting[key] = value.value;
            }.bind(this));
            this.currentShape.canvas = mc.dc.getCanvas();
            this.currentShape.addPath(x, y);
            mc.saveShape(this.currentShape);
            for (var i = 0; i < this.setting.LineNum; i++) {
                this.currentShape.tempPath.push({
                    dx: 0,
                    dy: 0,
                    ax: 0,
                    ay: 0,
                    div: 0.1,
                    ease: Math.random() * 0.2 + 0.6
                });
            }
            this.interval = setInterval(
                this.currentShape.update.bind(this.currentShape), 1000 / 60);

            this.mouseX = x;
            this.mouseY = y;
            for (var i = 0; i < this.currentShape.tempPath.length; i++) {
                this.currentShape.tempPath[i].dx = x;
                this.currentShape.tempPath[i].dy = y;
            }

        },
        continue: function (x, y, mc) {
            this.currentShape.addPath(x, y);
            mc.repaintlayer();

        },
        end: function (x, y, mc) {
            clearInterval(this.interval);
        }
    };
    return Pencil;


});