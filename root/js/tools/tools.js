define(function (require) {
    var Pencil = require('tools/Pencil');
    var Eraser = require('tools/Eraser');
    var Line = require('tools/Line');
    var Rect = require('tools/Rect');

    var Tools = {
        pencil : new Pencil(),
        eraser : new Eraser(),
        line : new Line(),
        Rect: new Rect()
    };


    return Tools;


});