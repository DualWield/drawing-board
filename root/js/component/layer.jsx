define(function (require) {
    var React = require('react');

    var LayerList = React.createClass({
        render : function () {
            var LayerListNode  =this.props.data.canvasArr.map(function (canvas) {
                return (
                    <Layer data={canvas}>
                    </Layer>
                );
            });
            return (
                <div className="LayerList">
                     {LayerListNode}
                </div>
            );
        }
    });
    var LayerControl = React.createClass({
        componentDidMount: function () {
            $('.LayerOpacityControlTrack').slider({
                value : 100,
                orientation : 'horizontal',
                range: "min",
                animate : true,
                slide : this.slideOpacity,
                change : this.changeOpacity
            });
        },
        render : function () {
            return (
                <div className="LayerControl">
                    <div className="LayerOpacityControl">
                        <div className="LayerOpacityControlName">Opacity</div>
                        <div className="LayerOpacityControlTrack"></div>
                        <div className="LayerOpacityControlValue">100%</div>
                    </div>
                    <div className="LayerNumControl">
                        <div className="LayerAdd LayerButton"></div>
                        <div className="LayerDel LayerButton"></div>
                        <div className="LayerMergeVisible LayerButton"></div>
                    </div>
                </div>
            )
        }
    });
    var Layer = React.createClass({
        getInitialState: function () {
            return {
                name : this.props.data.name,
                visibility : this.props.data.visibility,
                opacity : this.props.data.opacity,
                isCur : this.props.data.isCur
            }
        },
        handleEdit: function () {
            if(this.state.isCur){
                //只有当前layer的时候，点击才会修改名字
                this.refs.nameSpan.getDOMNode().style.display = 'none';
                $(this.refs.nameInput.getDOMNode()).show().focus().val(this.props.data.name);
            }

        },
        handleBlur: function () {
           this.editName();
        },
        handleEnter: function (e) {
            if(e.which === 13){
                this.editName();
            }
        },
        editName: function () {
            var name = this.refs.nameInput.getDOMNode().value.trim();
            this.setState({name:name});
            this.props.data.name = name;
            this.refs.nameSpan.getDOMNode().style.display = 'block';
            this.refs.nameInput.getDOMNode().style.display = 'none';
        },
        render: function () {
            return (
                <li className="Layer">
                    <input onKeyDown={this.handleEnter} onBlur={this.handleBlur} type="text" className="nameInput" ref="nameInput" />
                    <span onClick={this.handleEdit} className="LayerName" ref="nameSpan">{this.props.data.name}</span>
                    <div className="opacityDisplay">{(this.props.data.opacity*100).toFixed(0)}</div>
                    <div className="eyeButton"><i className="font-icon eye-icon"></i></div>
                </li>
            );
        }
    });

    var LayersBox = React.createClass({
        render: function() {
            return (
                <div>
                    <LayerList data={this.props.mc.dc} />
                    <LayerControl data={this.props.mc.dc}/>
                </div>
            );

        }
    });
    function init(mc){
        React.render(
            <LayersBox mc={mc} />, document.getElementById('drawPlzLayers')
        );
    }
    return {
        init : init
    }
});