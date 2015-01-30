define(function (require) {
    require('jqueryUi');

    var mainCanvas = require('component/main-canvas');

    var mainModule = {
        init : function () {
            this._bindEvent();
        },
        _bindEvent : function () {
            $('.clear-button').on('click', function () {
                mainCanvas.getPaintCanvas().clear();
            });
        }

    };

    return mainModule;

});