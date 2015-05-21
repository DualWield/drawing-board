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
    };

    function AddShapeAction(mc, shape, previousShapeId) {
        this.mc = mc;
        this.shape = shape;
        this.previousShapeId = previousShapeId;
    }

    AddShapeAction.prototype = {
        do: function () {
            mc.shapes.push(this.shape);
            mc.repaintlayer();
            mc.repaintBufferLayer();
        },
        undo: function () {
            mc.shapes.pop();
            mc.repaintlayer();
        }

    };

    return {
        ClearAction: ClearAction,
        AddShapeAction: AddShapeAction
    }
});