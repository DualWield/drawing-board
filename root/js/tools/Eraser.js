define(function (require) {
    var Eraser = function () {
        this.name = 'eraser';
        this.path = [];
    };
    Eraser.prototype = {
        setting:{
            Size: 20
        },
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
            var length = this.path.length;
            var nowPoint = this.path.slice(length-1,length)[0];
            var lastPoint = this.path.slice(length-2,length-1)[0];
            var w = this.setting.Size,
                color = mc.getColor(),
                r = +('0x'+color[1]+color[2]),
                g =  (+('0x'+color[3]+color[4])),
                b = (+('0x'+color[5]+color[6])),
                dist = _.distanceBetween(nowPoint, lastPoint);
            for(var j = 0; j < dist; j+=6) {
                var s = j / dist;
                mc.dc.getCanvas().ctx.clearRect(lastPoint.x * s + nowPoint.x * (1 - s),
                    lastPoint.y * s + nowPoint.y * (1 - s), w, w);
                //同时清理预览图的canvas ，待优化，耦合太高 todo
                mc.zcCtx.clearRect(lastPoint.x * s + nowPoint.x * (1 - s),
                    lastPoint.y * s + nowPoint.y * (1 - s), w, w);

               /* this.draw(lastPoint.x * s + nowPoint.x * (1 - s),
                    lastPoint.y * s + nowPoint.y * (1 - s), w, r, g, b, 0.5);*/
            }
            /*for(var i = 0,len = this.path.length; i<len ; i++){
                mc.dc.getCanvas().ctx.clearRect(this.path[i].x, this.path[i].y,10,10);
            }
            mc.bcCtx.stroke();*/
        }
    };

    return Eraser;

});