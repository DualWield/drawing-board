/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {

    var $ = require('jquery');
    require('plugin/jquery.form');

    var insertImageButton = {

        init : function (mc) {
            this.mc = mc;
            this.id = 'insertImageButton';
            this.render();
            this.bindEvent();
        },
        render: function () {
            this.element = $('#' + this.id);
            this.element.html('' +
            '<div class="btn btn-default">插入图片</div><form id="uploadForm" \
            enctype="multipart/form-data"\
            action="/api/photos"\
            method="post"\
            class="uploadForm">\
            <input type="file" id="uploadImage" name="uploadImage"/>\
            </form>');
        },
        bindEvent: function () {
            this.element.find('.btn').on('click', function () {
                $('#uploadImage').click();
            });
            this.element.find('#uploadImage').on('change', function () {
                $('#uploadForm').ajaxSubmit({
                    error: function (xhr) {
                    },
                    success: this.uploadSuccess.bind(this)
                });
            }.bind(this))
        },
        uploadSuccess: function (res) {
            this.imageSrc = res;
        
            this.insertImage();
        },
        addBottomBlur: function () {
            var bottom = $('#bottom-area');
            $('<div class="bottom-stop-touch">').insertAfter(bottom).height(bottom.height());
            bottom.addClass('blur');
        },
        addTopBlur: function () {
            var top = $('#top-area');
            $('<div class="top-stop-touch">').insertAfter(top);
            top.addClass('blur');
        },
        removeBottomBlur: function () {
            $('#bottom-area').removeClass('blur');
            $('.bottom-stop-touch').remove();

        },
        removeTopBlur: function () {
            $('#top-area').removeClass('blur');
            $('.top-stop-touch').remove();
        },
        addLeftModel: function () {
            var self = this;
            this.isWidthHeightLocked = true;
            var left = $('#slide-bar');
            var model = $('<div class="left-model image">').insertAfter(left);
            var html = '<div>\
                                <h1>Save Image:</h1>\
                                <div class="input-inline">\
                                    Layer:\
                                    <input type="text" id="layer-name-input"/>\
                                </div>\
                                <div class="img-sliders">\
                                     <div class="row-slider width">\
                                        <div class="label">Width:</div>\
                                        <div class="track"></div>\
                                        <div class="value">' + this.image.width() + 'px</div>\
                                    </div>\
                                    <div class="row-slider height">\
                                        <div class="label">Height:</div>\
                                        <div class="track"></div>\
                                        <div class="value">' + this.image.height() + 'px</div>\
                                    </div>\
                                    <div class="row-slider rotate">\
                                        <div class="label">Rotate:</div>\
                                        <div class="track"></div>\
                                        <div class="value">0°</div>\
                                    </div>\
                                    <div class="lockWrapper">\
                                        <div class="lockButton font-icon Locked"></div>\
                                     </div>\
                                </div>\
                                <div class="button-control">\
                                    <div class="button-wrap">\
                                    <button type="button" class="l btn btn-default cancel">Cancel</button>\
                                    <button type="button" class="r btn btn-success ok">OK</button>\
                                    </div>\
                                </div>\
            \
            \
                        </div>';
            model.html(html);
           $('.width.row-slider').find('.track').slider({
                value: this.image.width(),
                orientation: 'horizontal',
                range: "min",
                min: 20,
                max: this.image.width()*2,
                animate: true,
                change: function (event, data) {
                  /*  if(this.isWidthHeightLocked){
                        $('.height.row-slider').find('.track').slider('value', data.value /  this.originWidth * this.originHeight);
                    }
                    this.image.width(data.value);
                    $('.width.row-slider').find('.value').html(data.value + 'px');*/
                    this.image.width(data.value);
                    $('.width.row-slider').find('.value').html(data.value + 'px');
                }.bind(this),
               slide: function (event ,data) {
                   if(this.isWidthHeightLocked){
                       $('.height.row-slider').find('.track').slider('value', data.value /  this.originWidth * this.originHeight);
                   }
                   this.image.width(data.value);
                   $('.width.row-slider').find('.value').html(data.value + 'px');

               }.bind(this)

            });
           $('.height.row-slider').find('.track').slider({
                value: this.image.height(),
                orientation: 'horizontal',
                range: "min",
                min: 20,
                max: this.image.height()*2,
                animate: true,
               change: function (event, data) {
                   this.image.height(data.value);
                   $('.height.row-slider').find('.value').html(data.value + 'px');
                }.bind(this),
               slide: function (event, data) {
                     if(this.isWidthHeightLocked){
                    $('.width.row-slider').find('.track').slider('value', data.value /  this.originHeight * this.originWidth);
                    }
                    this.image.height(data.value);
                    $('.height.row-slider').find('.value').html(data.value + 'px');
               }.bind(this)
            });
           $('.rotate.row-slider').find('.track').slider({
                value: 0,
                orientation: 'horizontal',
                range: "min",
                min: -180,
                max: 180,
                animate: true,
                slide: function (event, data) {
                    this.image.css({
                        'transform' : 'rotate(' + data.value + 'deg)',
                        '-webkit-transform' : 'rotate(' + data.value + 'deg)',
                        '-moz-transform' : 'rotate(' + data.value + 'deg)',
                        '-ms-transform' : 'rotate(' + data.value + 'deg)',
                        '-o-transform' : 'rotate(' + data.value + 'deg)'
                    });
                    $('.rotate.row-slider').find('.value').html(data.value + '°');

                }.bind(this)
            });
            $('.left-model').find('.lockButton').on('click', function () {
                if($(this).hasClass('Locked')){
                    $(this).removeClass('Locked').addClass('unLocked');
                    self.isWidthHeightLocked = false;
                }else {
                    $(this).removeClass('unLocked').addClass('Locked');
                    self.isWidthHeightLocked = true;
                    var width = self.image.width();
                    var height = self.image.height();
                    if(width > height){
                        //self.image.height();
                        $('.height.row-slider').find('.track').slider("option",'value', width / self.originWidth * self.originHeight )
                    }else{
                        $('.width.row-slider').find('.track').slider("option",'value', height / self.originHeight * self.originWidth);
                        //self.image.width();
                    }

                }
            });
            $('.left-model').find('.cancel').on('click', this.handleCancelClick.bind(this));
            $('.left-model').find('.ok').on('click', this.handleOkClick.bind(this));
        },
        handleCancelClick: function () {
            this.hideAll();

        },
        hideAll: function () {
            mc.removeBottomBlur();
            mc.removeTopBlur();
            mc.removeLeftModel();
            this.image_wrap.remove();
            mc.canDraw = true;
        },
        handleOkClick: function () {
            this.drawImageToCanvas();
        },
        insertImage: function () {
            var self = this;
            mc.canDraw = false;
            this.addBottomBlur();
            this.addTopBlur();
            // 原始值记录在data上面
            var image = $('<img>')
                .css({
                    /*  zIndex: 100,
                     position: 'absolute',*/
                    top: 0,
                    left: 0,
                    cursor: 'crosshair'
                })
                .attr('src', this.imageSrc)
                .on('load', function () {
                    $(this)
                        .data('width', this.width)
                        .data('height', this.height)
                        .css({
                            width: this.width,
                            height: this.height
                        });
                    self.addLeftModel();
                    self.originWidth = this.width;
                    self.originHeight = this.height;

                });
            var image_wrap = $('<div class="uploadImageWrap">')
                .append(image)
                .draggable()
                .appendTo('.draw-pic-canvas');

            this.image_wrap = image_wrap;
            this.image = image;
        },
        cancelInsertImage: function () {
            this.image_wrap.remove();
        },
        getRotationDegrees: function (obj) {
            var matrix = obj.css("-webkit-transform") ||
                obj.css("-moz-transform")    ||
                obj.css("-ms-transform")     ||
                obj.css("-o-transform")      ||
                obj.css("transform");
            if(matrix !== 'none') {
                var values = matrix.split('(')[1].split(')')[0].split(',');
                var a = values[0];
                var b = values[1];
                var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            } else { var angle = 0; }
            return (angle < 0) ? angle + 360 : angle;
        },
        drawImageToCanvas: function () {
            var name = $('#layer-name-input').val();
            var canvas = mc.dc.addCanvas({name: name});
            require('jsx!component/layer').init(mc);
            var radioX = this.image.width() / this.image.data('width');
            var radioY = this.image.height() / this.image.data('height');
            var rotate = this.getRotationDegrees(this.image);
            //记录的xy为图片中心的位置
            var x = this.image.parent().offset().left - $('.draw-pic-canvas').offset().left + this.image.width()/2;
            var y = this.image.parent().offset().top - $('.draw-pic-canvas').offset().top + this.image.height()/2;
            var originWidth = this.image.width();
            var originHeight = this.image.height();
            var shape = require('core/shapes').ImageShape.create({
                x: x,
                y: y,
                originWidth: originWidth,
                originHeight: originHeight,
                radioX: radioX,
                radioY: radioY,
                url: this.image.attr('src'),
                rotate: rotate
            });
            shape.canvas = mc.dc.getCanvas();

            mc.saveShape(shape);
            mc.mediator.publish('drawOnchange');

            this.hideAll();

        }
    };
    return insertImageButton;

});