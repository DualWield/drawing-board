/*
*   author: xuli@shnow.cn
*   dependence : jquery, underscore
* */

(function (_, $) {
    window.Board = function Board(){

        
    };
    /*
    *
    *  pen ,brush ,eraser, line, font, image, move, takeColor
    *
    * */
    Board.Tool = {
        tool : null,
        getTool : function () {
            return this.tool;

        },
        setTool : function (value) {
            this.tool = value;
        }
    };
    
    Board.History = function History(){
        
    };
    
    Board.Store = function Store() {
        
    };
    
    Board.Canvas = {};

    Board.Canvas.paintCavas = {

    }

















})(_, $);