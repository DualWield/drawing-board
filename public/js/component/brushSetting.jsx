define(function (require) {
    var React = require('react');
    require('jquery.ui');
    require('lib/jquery.ui.touch-punch.min');
    var BrushBox = React.createClass({
        getInitialState: function () {
            return {
                mc: this.props.data
            }
        },
        componentDidMount: function () {
            _.each(this.props.data.tool.subTool.setting, function (value, key) {
                $(this.refs[key].getDOMNode()).find('.track').slider({
                    value: value.value,
                    orientation: 'horizontal',
                    range: "min",
                    min: value.min,
                    max: value.max,
                    animate: true,
                    slide: function (event, data) {
                        this.props.data.tool.subTool.setting[key].value = data.value;
                        this.refresh();
                    }.bind(this)
                });
            }.bind(this));
        },
        componentDidUpdate: function () {
            _.each(this.props.data.tool.subTool.setting, function (value, key) {
                $(this.refs[key].getDOMNode()).find('.track').slider({
                    value: value.value,
                    orientation: 'horizontal',
                    range: "min",
                    min: value.min,
                    max: value.max,
                    animate: true,
                    slide: function (event, data) {
                        this.props.data.tool.subTool.setting[key].value = data.value;
                        this.refresh();
                    }.bind(this)
                });
            }.bind(this));

        },
        refresh: function () {
            this.setState({
                mc: window.mc
            });
        },
        render: function () {
            var nodes = _.map(this.props.data.tool.subTool.setting, function (value, key) {
                return (
                    <div className="row-slider" key={key} ref={key}>
                        <div className="label">{key}</div>
                        <div className="track"></div>
                        <div className="value">{value.value}</div>
                    </div>
                );
            });
            return (
                <div>
                    {nodes}
                </div>);
        }
    });

    function init(mc) {
        React.render(
            <BrushBox data={mc} />, document.getElementById('brush-slider')
        );
    }

    return {
        init: init
    }
});