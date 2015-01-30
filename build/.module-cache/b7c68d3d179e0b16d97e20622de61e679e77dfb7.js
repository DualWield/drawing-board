/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {
    var zoom = {
        init :  function (mc) {
            this.mc = mc;
            this.MAX_SCALE = 5;
            this.MIN_SCALE = 0.1;

            this.element = $('#drawPlzZoom');
            this._render();
            mc.zc = $('#zoom-canvas')[0];
            mc.zcCtx = mc.zc.getContext('2d');

            this._bindEvent();
            this._refresh();
        },
        tpl: '<div class="zoom-well">\
                    <div class="zoom-capture">\
                        <div class="zoom-indicator"></div>\
                        </div>\
                    <div class="zoom-canvas-container">\
                         <canvas id="zoom-canvas" width="1006" height="453"></canvas>\
                    </div>\
                </div>\
                <div class="zoom-control">\
                    <div class="zoom-in zoom-button"></div>\
                    <div class="zoom-zero zoom-button"></div>\
                    <div class="zoom-out zoom-button"></div>\
                    <div class="zoom-percentage">100%</div>\
                </div>',
        _render: function () {
            this.element.html(this.tpl);
        },
        _refresh: function () {
            this.mc.cloneToZoomCanvas();
            if(this.mc.zoom >= 1){
                var defaultWidth = $('.zoom-indicator').parent().width();
                var defaultHeight = $('.zoom-indicator').parent().height();
                $('.zoom-indicator').css({
                    top: 0,
                    left:0,
                    width : defaultWidth/this.mc.zoom,
                    height: defaultHeight/this.mc.zoom
                });
                $('.zoom-indicator').trigger('drag');
            }

        },
        _bindEvent : function () {
            $('.zoom-in').on('click', $.proxy(this.zoomIn, this));
            $('.zoom-zero').on('click', $.proxy(this.zoomZero, this));
            $('.zoom-out').on('click', $.proxy(this.zoomOut, this));
            $('.zoom-indicator').draggable({
                containment:"parent",
                cursor: "crosshair",
                drag: function (event, ui) {
                    console.log(event, ui);
                    var position = ui.position;
                    var rate = $('#buffer-canvas').width()/288;
                    $('.draw-pic-canvas').children().css({
                        'transform' : 'translate(' + -position.left*rate + 'px,' + -position.top*rate + 'px)'
                    })
                }
            });

        },
        zoomIn: function () {
            var zoom = this.mc.zoom + 0.1;
            this.setScale(zoom);
        },
        zoomZero: function () {
            var zoom = 1;
            $('.draw-pic-canvas').children().css({
                'transform' : 'translate(0,0)'
            });
            this.setScale(zoom);
        },
        zoomOut: function () {
            var zoom = this.mc.zoom - 0.1;
            this.setScale(zoom);
        },

        setScale : function (scale) {
            if(scale > this.MAX_SCALE || scale < this.MIN_SCALE){
                return false;
            }
            this.mc.zoom = scale;
            this.onChangeZoom();
        },
        onChangeZoom: function () {
            var scale = this.mc.zoom;
            $('.zoom-percentage').text((scale*100).toFixed(0) + '%');
            var newWidth = window.MC.WIDTH*scale;
            var newHeight = window.MC.HEIGHT*scale;
            $('.draw-pic-canvas').children().css({
                width : newWidth,
                height: newHeight
            });
            if(scale <= 1){
                $('.draw-pic-canvas').css({
                    width : newWidth,
                    height: newHeight,
                    top : ($('.draw-pic-canvas').parent().height()-newHeight)/2,
                    left : ($('.draw-pic-canvas').parent().width()-newWidth)/2
                })
            }
            this._refresh();
        }

    };

    var ZoomCanvas = function () {

    };
    ZoomCanvas.prototype = {

    };

    return zoom;
});
