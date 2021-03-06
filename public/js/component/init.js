define(function (require) {
    var init = function (mc) {
        if(mc.isZoomEnable){
            require('component/zoom').init(mc);
        }
        if(mc.isLayerEnable){
            require('jsx!component/layer').init(mc);

        }
        require('component/colorPicker').init(mc);
        require('jsx!component/toolButton').init(mc);

        require('jsx!component/brushSetting').init(mc);
        require('jsx!component/clearButton').init(mc);
        require('jsx!component/undoRedoButtons').init(mc);
        require('jsx!component/saveButton').init(mc);
        require('jsx!component/resetButton').init(mc);
        require('component/insertFontButton').init(mc);
        require('component/insertImageButton').init(mc);
    };
    return {
        init : init
    }
});