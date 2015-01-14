define(function (require) {
    require('jqueryUi');
    require('plugin/farbtastic');

    var mainCanvas = require('component/main-canvas');



    var mainModule = {
        init : function () {
            this.initComponent();

        },
        initComponent : function () {
            $('#colorPicker').farbtastic({ callback: this._changeColor, width:100, height:100});

            $('.opacity-slider').find('.track').slider({
                value : 100,
                orientation : 'horizontal',
                range: "min",
                animate : true,
                slide : this.slideOpacity,
                change : this.changeOpacity
            });
            $('.size-slider').find('.track').slider({
                value : 30,
                orientation : 'horizontal',
                range: "min",
                animate : true,
                slide : this.slideSize,
                change : this.changeSize
            });
            $('.effect-slider').find('.track').slider({
                value : 50,
                orientation : 'horizontal',
                range: "min",
                animate : true,
                slide : this.slideSoftness,
                change : this.changeSoftness
            });
        },
        _changeColor : function (color) {
            $('#color').css({'background' : color});
            mainCanvas.getBufferCanvas().setStrokeStyle(color);
        },
        slideOpacity : function (event, ui) {
            $('.opacity-slider').find('.value').html(ui.value + '%');
        },
        slideSize : function (event, ui) {
            $('.size-slider').find('.value').html(ui.value + '%');
        },
        slideSoftness : function (event, ui) {
            $('.effect-slider').find('.value').html(ui.value + '%');
        },
        changeOpacity : function(event, ui){
            mainCanvas.getBufferCanvas().setGlobalAlpha(ui.value/100);
        },
        changeSize : function(event, ui){
            mainCanvas.getBufferCanvas().setLineWidth(ui.value);
        },
        changeSoftness : function(event, ui){

        }
    };

    return mainModule;
});