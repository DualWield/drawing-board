define(function(require){
    require('plugin/farbtastic');

    var main_module = {
        init : function (mc) {
            this.mc = mc;
            this.initColorPicker();
            this._bindEvent();
        },
        _bindEvent: function () {
            var self = this;
            $('#color').on('change', function () {
                var colorReg = /^#([0-9]|[a-f]){3,6}/;
                var value =$(this).val();
                if(colorReg.test(value)){
                    self.onChangeColorFromInput(value);
                }
            });
        },
        initColorPicker : function () {
            this.farb = $('#colorPicker');
            this.farb = $.farbtastic(this.farb,{ callback: this.onChangeColor.bind(this), width:100, height:100});
        },
        onChangeColorFromInput: function (color) {
            this.farb.setColor(color);

        },
        onChangeColor : function (color) {
            $('#color').val(color).css({background:color});
            this.mc.setColor(color);
        }
    };
    return main_module;
});