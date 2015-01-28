define(function(require){
    require('plugin/farbtastic');

    var main_module = {
        init : function (mc) {
            this.mc = mc;
            this.initColorPicker();
        },
        initColorPicker : function () {
            $('#colorPicker').farbtastic({ callback: this.onChangeColor.bind(this), width:100, height:100});
        },
        onChangeColor : function (color) {
            $('#color').val(color).css({background:color});
            this.mc.setColor(color);
        }
    };
    return main_module;
});