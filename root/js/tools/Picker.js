define(function (require) {

    var shapes = require('core/shapes');
    var Tool = require('tools/tool');
    var colorPicker = require('component/colorPicker');

    var Picker = function () {
        Tool.call(this, arguments);
        this.classes = {
            Basic: new Basic()
        };
        this.name = 'Picker';
        this.subTool = this.classes[this.type];

    };
    Picker.prototype = new Tool();

    var Basic = function () {
        this.name = 'Basic'

    };
    Basic.prototype = {
        begin: function (x, y, mc) {
           //var ctx = mc.dc.getCanvas().ctx;
            /*   用最后合成的canvas 取色比较好 */
            var ctx = $('#zoom-canvas')[0].getContext('2d');

            var img_data = ctx.getImageData(x, y, 1, 1).data;
            var R = img_data[0];
            var G = img_data[1];
            var B = img_data[2];
            if(img_data[3] == 0){
                return false;
            }
             var hex = _.rgbToHex(R, G, B);
            console.log(hex);
            colorPicker.onChangeColor('#' + hex);
        },
        continue: function (x, y, mc) {
            //var ctx = mc.dc.getCanvas().ctx;
            var ctx = $('#zoom-canvas')[0].getContext('2d');
            var img_data = ctx.getImageData(x, y, 1, 1).data;
            var R = img_data[0];
            var G = img_data[1];
            var B = img_data[2];
            if(img_data[3] == 0){
                return false;
            }
            var hex = _.rgbToHex(R, G, B);
            console.log(hex);
            colorPicker.onChangeColor('#' + hex);
        },
        end: function (x, y, mc) {
        }
    };


    return Picker;

});