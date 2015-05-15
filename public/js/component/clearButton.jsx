/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {

    var React = require('react');

    var ClearButton = React.createClass({
        handleClear: function () {
            this.props.data.clear();
        },
        render: function () {
            return <div onClick={this.handleClear} className="btn btn-default">清空</div>
        }
    });
    var init = function (mc) {
        React.render(
            <ClearButton data={mc} />,document.getElementById('clearButton')
        )
    };
    return {
        init : init
    };
});