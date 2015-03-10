define(function (require) {
    /*
     * 每一次操作都会变成一个action
     *
     * */
    function ClearAction(mc, oldShapes, newShapes) {
        this.mc = mc;
        this.oldShapes = oldShapes;
        this.newShapes = newShapes;
    }

    ClearAction.prototype = {
        do: function () {
            this.mc.shapes = this.newShapes;
            this.mc.repaintlayer();
        },
        undo: function () {
            this.mc.shapes = this.oldShapes;
            this.mc.repaintlayer();

        }
    }

    function AddShapeAction(mc, shape, previousShapeId) {
        this.mc = mc;
        this.shape = shape;
        this.previousShapeId = previousShapeId;
    }

    AddShapeAction.prototype = {
        do: function () {
            if (!mc.shapes.length ||
                mc.shapes[mc.shapes.length - 1].id == this.previousShapeId) {
                mc.shapes.push(this.shape);
            } else {
                var newShapes = [];
                var found = false;
                for (var i = 0, len = mc.shapes; i < len; i++) {
                    newShapes.push(mc.shapes[i]);
                    if(mc.shapes[i].id = this.previousShapeId){
                        newShapes.push(this.shape);
                        found = true;
                    }
                }
                if(!found){
                    newShapes.push(this.shape);
                }
                mc.shapes = newShapes;
            }
            mc.repaintlayer();
        },
        undo: function () {
            if(mc.shapes[mc.shapes.length-1].id == this.shape.id) {
                mc.shapes.pop();
            }else{
                var newShapes = [];
                for (var i = 0, len = mc.shapes; i < len; i++) {
                    if(mc.shapes[i].id != this.shape.id){
                        newShapes.push(mc.shapes[i]);
                    }
                }
                mc.shapes = newShapes;
            }
            mc.repaintlayer();
        }

    };

    return {
        ClearAction: ClearAction,
        AddShapeAction: AddShapeAction
    }
});