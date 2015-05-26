/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {

    var insertFontButton = {
        init: function (mc) {
            this.mc = mc;
            this.id = 'insertFontButton';
            this.render();
            this.bindEvent();
        },
        render: function () {
            this.element = $('#' + this.id);
            this.element.html('<div class="btn btn-default">插入文字</div>');
        },
        bindEvent: function () {
            this.element.find('.btn').on('click', this.handleInsertWordClick.bind(this));
        },
        handleInsertWordClick: function () {
            mc.addBottomBlur();
            mc.addTopBlur();
            this.addLeftModel();
        },
        addLeftModel: function () {
            var self = this;
            mc.canDraw = false;
            var left = $('#slide-bar');
            var model = $('<div class="left-model font">').insertAfter(left);
            var html = '\
                    <div>\
                        <h1>Insert Text:</h1>\
                        <div class="form-group">\
                            <textarea class="form-control" rows="3"></textarea>\
                        </div>\
                        <div class="form-group">\
                            <select class="form-control font-size">\
                                <option>12px</option>\
                                <option>18px</option>\
                                <option>24px</option>\
                                <option>32px</option>\
                                <option>40px</option>\
                                <option>48px</option>\
                                <option>56px</option>\
                            </select>\
                        </div>\
                        <div class="form-group">\
                            <select class="form-control font-family">\
                                <option>Open Sans</option>\
                                <option>Helvetica Neue</option>\
                                <option>Arial</option>\
                                <option>Hiragino Sans GB</option>\
                                <option>Microsoft YaHei</option>\
                                <option>WenQuanYi Micro Hei</option>\
                                <option>sans-serif</option>\
                            </select>\
                        </div>\
                         <div class="button-control">\
                                    <div class="button-wrap">\
                                    <button type="button" class="l btn btn-default cancel">Cancel</button>\
                                    <button type="button" class="r btn btn-success ok">OK</button>\
                                    </div>\
                        </div>\
                    </div>\
            ';
            model.html(html);
            var insertFontDemo = $('<div class="insert-font-demo">').appendTo('.draw-pic-canvas')
                .draggable({
                    containment:"parent",
                    cursor: "move"
                });
            this.font_wrap = insertFontDemo;
            $('.left-model.font').find('textarea').on('keyup', function () {
                var value = $(this).val();
                insertFontDemo.html(value);
            });
            $('.left-model.font').find('.font-size').on('change', function () {
                var value = $(this).val();
                self.fontSize = value;
                insertFontDemo.css({
                    'fontSize': value
                })
            });

            $('.left-model.font').find('.font-family').on('change', function () {
                var value = $(this).val();
                self.fontFamily = value;
                insertFontDemo.css({
                    'fontFamily': value
                })
            });
            $('.left-model.font').find('.font-size').trigger('change');
            $('.left-model.font').find('.font-family').trigger('change');
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
            this.font_wrap.remove();
            mc.canDraw = true;
        },
        handleOkClick: function () {
            var word = this.font_wrap.html();
            var x = this.font_wrap.offset().left - $('.draw-pic-canvas').offset().left ;
            var y = this.font_wrap.offset().top - $('.draw-pic-canvas').offset().top;

            var shape = require('core/shapes').FontShape.create({
                word : word,
                fontSize : this.fontSize,
                fontFamily: this.fontFamily,
                x: x,
                y: y,
                height: this.font_wrap.height()
            });
            shape.canvas = mc.dc.getCanvas();

            mc.saveShape(shape);
            mc.mediator.publish('drawOnchange');
            this.hideAll();
        }

    };
    return insertFontButton;
});