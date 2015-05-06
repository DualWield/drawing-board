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

    $('#canvas-container').css({
        height: $(window).height()- $('#top-area').height() - $('#bottom-area').height()
    })
});