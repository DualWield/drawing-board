define(function (require) {
    var Pencil = require('tools/Pencil');
    var Eraser = require('tools/Eraser');
    var Line = require('tools/Line');
    var Rect = require('tools/Rect');
    var Picker = require('tools/Picker');
    var Circle = require('tools/Circle');

    var Tools = {
        pencil : Pencil.create(),
        eraser : Eraser.create(),
        line : Line.create(),
        Rect: Rect.create(),
        Picker: Picker.create(),
        Circle: Circle.create()
    };

    return Tools;
});