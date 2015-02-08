define(function (require) {
    var init = function (mc) {
        require('component/colorPicker').init(mc);
        require('jsx!component/toolButton').init(mc);
        require('component/zoom').init(mc);
        require('jsx!component/layer').init(mc);
        require('jsx!component/brushSetting').init(mc);

    };

    return {
        init : init
    }
});