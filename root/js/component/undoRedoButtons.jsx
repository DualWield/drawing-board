/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {

    var React = require('react');

    var UndoRedoButtons = React.createClass({
        handleUndo: function () {
            if(this.props.data.canUndo()){
                this.props.data.undo();
            }
        },
        handleRedo: function () {
            if(this.props.data.canRedo()){
                this.props.data.redo();
            }
        },
        render: function () {
            var classset = React.classSet({
                //TODO
            })
            return (
                <div>
                    <div onClick={this.handleUndo} className="header-button back">后退</div>
                    <div onClick={this.handleRedo} className="header-button forward">前进</div>
                </div>);
        }
    });
    var init = function (mc) {
        React.render(
            <UndoRedoButtons data={mc} />,document.getElementById('undoRedoButtons')
        )
    };
    return {
        init : init
    };
});