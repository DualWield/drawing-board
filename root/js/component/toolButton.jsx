/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {

    var React = require('react');
    var Tools = require('tools/tools');
    var brushSetting = require('jsx!component/brushSetting');

    var Tool = React.createClass({
        getInitialState: function () {
            return {
                data: this.props.data
            };
        },
        refresh: function () {
            this.setState({
                data: this.props.data
            });
        },
        selectTool: function (e) {
            var type = e.target.getAttribute('data-action');
            this.props.data.tool = Tools[type];
            this.refresh();
            brushSetting.init(mc);
        },
        selectSubTool: function (e) {
            var type = e.target.getAttribute('data-action');
            this.props.data.tool.setType(type);
            this.refresh();
            brushSetting.init(mc);

        },
        render: function () {
            var mainToolNodes = _.map(Tools, function (value, key) {
                var classSet = React.addons.classSet({
                    'active': value.name === this.props.data.tool.name,
                    'toolButton': true
                });
                return (
                    <div onClick={this.selectTool} data-action={key} className={classSet}>
                    {value.name}
                    </div>
                )
            }.bind(this));
            var subToolNodes = _.map(this.state.data.tool.subTool, function (value, key) {
                var classSet = React.addons.classSet({
                    'active': value.name === this.props.data.tool.type.name,
                    'subButton': true
                });
                return (
                    <div onClick={this.selectSubTool} data-action={key} className={classSet}>
                    {value.name}
                    </div>
                )
            }.bind(this));
            return (
                <div>
                    <div className="mainTool">
                        {mainToolNodes}
                    </div>
                    <div className="subTool">
                    {subToolNodes}
                    </div>
                </div>
            )
        }
    });
    var init = function (mc) {
        React.render(
            <Tool data={mc} />,document.getElementById('buttons-controls')
        )
    };
    return {
        init : init
    };
});