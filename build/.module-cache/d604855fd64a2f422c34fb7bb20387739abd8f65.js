define(function (require) {
    var React = require('lib/react.js');

    var HelloMessage = React.createClass({displayName: "HelloMessage",
        render: function() {
            return (React.createElement("div", null, "Hello ", this.props.name));
        }
    });
    function init(){
        React.render(React.createElement(HelloMessage, {name: "John"}), document.getElementById('#drawPlzLayers'));
    }
    return {
        init : init
    }
});