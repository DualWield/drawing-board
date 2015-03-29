define(function (require) {
    var React = require('react');

    var BrushBox = React.createClass({
        getInitialState: function () {
            return {
                mc: this.props.data
            }
        },
        componentDidMount: function () {
            _.each(this.props.data.tool.subTool.setting, function (num, key) {
                $(this.refs[key].getDOMNode()).find('.track').slider({
                    value: num,
                    orientation: 'horizontal',
                    range: "min",
                    min: 1,
                    animate: true,
                    slide: function (event, data) {
                        this.props.data.tool.subTool.setting[key] = data.value;
                        this.refresh();
                    }.bind(this)
                });
            }.bind(this));

        },
        componentDidUpdate: function () {
            _.each(this.props.data.tool.subTool.setting, function (num, key) {
                $(this.refs[key].getDOMNode()).find('.track').slider({
                    value: num,
                    orientation: 'horizontal',
                    range: "min",
                    animate: true,
                    slide: function (event, data) {
                        this.props.data.tool.subTool.setting[key] = data.value;
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
        onChangeSecondSlide: function () {

        },
        onChangeThirdSlide: function () {

        },
        render: function () {

            var nodes = _.map(this.props.data.tool.subTool.setting, function (num, key) {
                return (
                    <div className="row-slider" key={key} ref={key}>
                        <div className="label">{key}</div>
                        <div className="track"></div>
                        <div className="value">{num}%</div>
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