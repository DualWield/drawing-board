/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {
    var init = function (mc) {
        $('.buttons-controls').on('click', '[data-action]', function () {
            $('.buttons-controls').children().removeClass('active');
            $(this).addClass('active');
            var toolName = $(this).data('action');
            mc.setTool(toolName);
        });
    };
    return {
        init : init
    };
});