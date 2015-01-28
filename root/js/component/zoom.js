/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {
    var init = function (mc) {
        mc.zc = $('#zoom-canvas')[0];
        mc.zcCtx = mc.zc.getContext('2d');

    };

    var ZoomCanvas = function () {

    };
    ZoomCanvas.prototype = {

    };
    return {
        init : init
    };
});