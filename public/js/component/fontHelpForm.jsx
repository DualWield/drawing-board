/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {

    var React = require('react');

    var FontHelpForm = React.createClass({
        render: function () {
            return (
                <div>
                    <input type="text"/>
                    <div>
                    </div>
                </div>
            );
        }
    });
    var init = function (mc) {
        React.render(
            <FontHelpForm data={mc} />,document.getElementById('clearButton')
        )
    };
    return {
        init : init
    };
});