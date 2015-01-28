define(function (require) {
    var Eraser = function () {
        this.name = 'eraser';
        this.path = [];
    };
    Eraser.prototype = {
        begin: function (x, y, mc) {
            this.path.push({x: x, y: y});
        },
        continue: function (x, y, mc) {
            this.path.push({x: x, y: y});
            this.redraw(mc);
        },
        end: function (x, y, mc) {

            this.path = [];

        },
        redraw : function (mc) {
            mc.bcCtx.lineCap = mc.bcCtx.lineJoin = 'round';
            mc.bcCtx.beginPath();
            mc.bcCtx.strokeStyle = '#fff';
            mc.bcCtx.lineWidth = '20';
            /* mc.bcCtx.moveTo(0, 0);
             mc.bcCtx.lineTo(20,20);*/
            mc.bcCtx.moveTo(this.path[0].x, this.path[0].y);

            for(var i = 1,len = this.path.length; i<len ; i++){
                mc.bcCtx.lineTo(this.path[i].x, this.path[i].y);
            }
            mc.bcCtx.stroke();
        }
    };

    return Eraser;

});