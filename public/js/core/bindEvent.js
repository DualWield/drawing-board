define(function (require) {
    var bindEvent = function (mc) {
        mc.$bc.on('mousedown', function (e) {
            var x = e.clientX - mc.$bc.offset().left;
            var y = e.clientY - mc.$bc.offset().top;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.begin(x, y);
        });
        mc.$bc.on('mousemove', function (e) {
            var x = e.clientX - mc.$bc.offset().left;
            var y = e.clientY - mc.$bc.offset().top;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.continue(x, y);
        });
        mc.$bc.on('mouseup', function (e) {
            var x = e.clientX - mc.$bc.offset().left;
            var y = e.clientY - mc.$bc.offset().top;
            x = x/mc.zoom;
            y= y/mc.zoom;
            mc.end(x, y);
        });

    };
    return bindEvent;
});