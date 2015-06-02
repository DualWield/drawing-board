define(function (require) {
    var $ = require('jquery');
    var bindEvent = function (mc) {
        $('#canvas-container').on('mousedown', function (e) {
            var x = e.clientX - mc.$bc.offset().left;
            var y = e.clientY - mc.$bc.offset().top;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.begin(x, y);
        });
        $('#canvas-container').on('mousemove', function (e) {
            var x = e.clientX - mc.$bc.offset().left;
            var y = e.clientY - mc.$bc.offset().top;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.continue(x, y);
        });
        $('#canvas-container').on('mouseup', function (e) {
            var x = e.clientX - mc.$bc.offset().left;
            var y = e.clientY - mc.$bc.offset().top;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.end(x, y);
        });
        $('#canvas-container').on('touchstart', function (e) {
            var x = e.originalEvent.changedTouches[0].clientX - mc.$bc.offset().left + document.body.scrollLeft;
            var y = e.originalEvent.changedTouches[0].clientY - mc.$bc.offset().top + document.body.scrollTop;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.begin(x, y);
            return false;
        });
        $('#canvas-container').on('touchmove', function (e) {
            var x = e.originalEvent.changedTouches[0].clientX - mc.$bc.offset().left + document.body.scrollLeft;
            var y = e.originalEvent.changedTouches[0].clientY - mc.$bc.offset().top + document.body.scrollTop;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.continue(x, y);
            return false;
        });
        $('#canvas-container').on('touchend', function (e) {
            var x = e.originalEvent.changedTouches[0].clientX - mc.$bc.offset().left + document.body.scrollLeft;
            var y = e.originalEvent.changedTouches[0].clientY - mc.$bc.offset().top + document.body.scrollTop;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.end(x, y);
            return false;
        });
    };

    return bindEvent;
});