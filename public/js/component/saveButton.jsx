/**
 * author: xuli@shnow.cn
 * date: 2015.04.02
 *
 * */

define(function (require) {
    var React = require('react');

    var SaveButton = React.createClass({
        handleSave: function () {
            this.props.data.saveImage();
        },
        render: function () {
            return <div onClick={this.handleSave}>保存</div>
        }
    });


    var init = function (mc) {
        React.render(
            <SaveButton data={mc} />,document.getElementById('saveButton')
        )
    };
    return {
        init : init
    };
});