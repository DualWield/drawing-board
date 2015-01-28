define(function (require) {
    var Rect = function () {
        this.name = 'rect';
        this.path = [];
    };
    Rect.prototype = {
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});
        },
        continue: function (x, y, mc) {
            mc.clearBc();
            this.path.push({x: x, y: y});
            this.redraw(mc);
            this.path.pop();
        },
        end: function (x, y, mc) {

            this.path = [];

        },
        redraw : function (mc) {
            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            mc.bcCtx.strokeStyle = mc.getColor();
            mc.bcCtx.lineWidth = '20';
            /* mc.bcCtx.moveTo(0, 0);
             mc.bcCtx.lineTo(20,20);*/
            var width = this.path[1].x - this.path[0].x;
            var height = this.path[1].y - this.path[0].y;
            mc.bcCtx.rect(this.path[0].x, this.path[0].y, width, height);
            mc.bcCtx.stroke();

        }
    };

    return Rect;

});