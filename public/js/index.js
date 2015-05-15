requirejs.config({
    baseUrl: 'js',
    paths: {
        'react': 'lib/react-with-addons',
        'mediator-js': 'lib/mediator.min',
        'jquery': 'lib/jquery',
        'jquery.ui': 'lib/jquery-ui',
        'Class': 'core/Class',
        'underscore': 'lib/underscore',
        'farbtastic': 'plugin/farbtastic'
    },
    shim: {

    },
    jsx: {
        fileExtension: '.jsx'
    }

});

define(function (require) {
    var MyCanvas = require('core/MyCanvas');
    var component = require('component/init');

    //对_进行扩展
    require('core/extend_lib');

    var mc = new MyCanvas();

    window.mc = mc;
    component.init(mc);


    var $ = require('jquery');
    $(function(){
        var resize = function () {
            var height = $(window).height() - $('#top-area').height() - $('#bottom-area').height();
            $('#middle-area').height(height);
            if($(window).width() > 1350){
                var newWidth = $('.draw-pic-canvas').width();
                var newHeight = $('.draw-pic-canvas').height();
                $('.draw-pic-canvas').css({
                    width : newWidth,
                    height: newHeight,
                    top : ($('.draw-pic-canvas').parent().height()-newHeight)/2,
                    left : ($('.draw-pic-canvas').parent().width()-newWidth)/2
                })
            }

        };
        $(window).on('resize', resize);
        resize();
    });
    /*$('#canvas-container').css({
        height: $(window).height()- $('#top-area').height() - $('#bottom-area').height()
    })*/
});