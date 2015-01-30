define(function (require) {
    var init = function (mc) {
        require('component/colorPicker').init(mc);
        require('component/toolButton').init(mc);
        require('component/zoom').init(mc);
        require('component/layer').init(mc);

    };

    return {
        init : init
    }
});