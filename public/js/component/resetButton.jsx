/**
 * author: xuli@shnow.cn
 * date: 2015.04.02
 *
 * */

define(function (require) {
    var React = require('react');

    var ResetButton = React.createClass({
        handleClick: function () {
            this.props.data.reset();
        },
        render: function () {
            return <div onClick={this.handleClick} className="btn btn-default">重置</div>

        }
    });


    var init = function (mc) {
        React.render(
            <ResetButton data={mc} />,document.getElementById('resetButton')
        )
    };
    return {
        init : init
    };
});