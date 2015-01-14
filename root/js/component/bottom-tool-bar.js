/*
require(["jquery", 'plugin/farbtastic'], function ($, farbtastic) {
    var main_module = {
        init : function () {
            this.initColorPicker();
        },
        initColorPicker : function () {
            $('#colorpicker').farbtastic('#color');
        }

    };

    return {
        init : main_module.init
    }
});
*/

define(function(require){
    var $ = require('jquery');
    require('plugin/farbtastic');

    var main_module = {
        init : function () {
            this.initColorPicker();
        },
        initColorPicker : function () {
            $('#colorPicker').farbtastic({ callback: '#color', width:100, height:100});
        }

    };
    return main_module;
})