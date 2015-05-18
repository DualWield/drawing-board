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
            var $parent = $('.draw-pic-canvas');
            if($(window).width() > 1350){
                var newWidth = $parent.width();
                var newHeight = $parent.height();
                $parent.css({
                    top : ($parent.parent().height()-newHeight)/2,
                    left : ($parent.parent().width()-newWidth)/2
                })
            }

        };
        $(window).on('resize', resize);
        resize();
    });
});