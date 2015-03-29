define(function (require) {
    var Tool = function () {
        var arguments = Array.prototype.slice(arguments);
        this.type = arguments[0] || 'Basic';

    };
    Tool.prototype = {
        setType: function (type) {
            this.subTool = this.classes[type];
        },
        begin: function (x, y, mc) {
            this.subTool.begin(x, y, mc);
        },
        continue: function (x, y, mc) {
            this.subTool.continue(x, y, mc);

        },
        end: function (x, y, mc) {
            this.subTool.end(x, y, mc);
        }
    };

    return Tool;
});