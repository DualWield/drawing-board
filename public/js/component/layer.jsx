define(function (require) {
    var React = require('react');

    var LayersBox = React.createClass({
        getInitialState: function () {
            return {
                data: this.props.data.dc
            }
        },
        componentDidMount: function () {

        },
        addLayer: function () {

        },
        refresh: function (func) {
            this.setState({
                data: this.props.data.dc
            },func && func());
        },
        render: function () {
            return (
                <div>
                    <LayerList refresh={this.refresh} data={this.state.data} />
                    <LayerControl refresh={this.refresh} data={this.state.data}/>
                </div>
            );

        }
    });
    var LayerList = React.createClass({
        componentDidMount: function () {
            $(".LayerList").sortable({
                containment: 'parent',
                cursor: 'move',
                distance: 5,
                deactivate: $.proxy(this.onChangeLayer, this)
            });
        },
        onChangeLayer: function () {
            var layerArr = $(".LayerList").sortable('toArray', {attribute: 'data-id'});
            this.props.data.resetCanvasArr(layerArr);
            $( ".LayerList" ).sortable( "cancel" );
            this.props.refresh();

        },
        setAllUnCur: function () {
            this.props.data.canvasArr.forEach(function (canvas) {
                canvas.isCur = false;
            });
            this.props.refresh();
        },
        getOrderedArr: function (arr) {
            var orderArr = [];
            _.each(arr, function (canvas) {
                orderArr[canvas.order] = canvas;
            });
            orderArr = _.compact(orderArr).reverse();

            return orderArr;
        },
        render: function () {
            var orderArr = this.getOrderedArr(this.props.data.canvasArr);
            var LayerListNode = orderArr.map(function (canvas) {
                return (
                    <Layer onSetCur={this.setAllUnCur} data={canvas}>
                    </Layer>
                );
            },this);

            return (
                <div className="LayerList">
                     {LayerListNode}
                </div>
            );
        }
    });

    var Layer = React.createClass({
        componentDidMount: function () {
            this.props.data.canvas.on('onchangeOpacity', function (event, data) {
                this.setState({
                    opacity: data
                })
            }.bind(this));
        },
        getInitialState: function () {
            return {
                name: this.props.data.name,
                visibility: this.props.data.visibility,
                opacity: this.props.data.opacity,
                isCur: this.props.data.isCur
            }
        },
        handleEdit: function () {
            if (this.props.data.isCur) {
                //只有当前layer的时候，点击才会修改名字
                this.refs.nameSpan.getDOMNode().style.display = 'none';
                $(this.refs.nameInput.getDOMNode()).show().focus().val(this.props.data.name);
            }

        },
        handleBlur: function () {
            this.editName();
        },
        handleEnter: function (e) {
            if (e.which === 13) {
                this.editName();
            }
        },
        handleVisible: function () {
            $(this.refs.visibleButton.getDOMNode()).toggleClass('disabled');
            this.props.data.visibility = !this.props.data.visibility;
            this.props.data.visibility
                ? this.props.data.canvas.show()
                : this.props.data.canvas.hide();
            window.mc.mediator.publish('onChangeLayer');
        },
        editName: function () {
            var name = this.refs.nameInput.getDOMNode().value.trim();
            this.setState({name: name});
            this.props.data.name = name;
            this.refs.nameSpan.getDOMNode().style.display = 'block';
            this.refs.nameInput.getDOMNode().style.display = 'none';
        },
        setCur: function () {
            this.props.onSetCur();
            this.props.data.isCur = true;
            this.setState({
                isCur: true
            });

        },
        render: function () {
            var classes = React.addons.classSet({
                'active': this.props.data.isCur,
                'Layer': true
            });
            var eleClasses = React.addons.classSet({
                'disabled': !this.props.data.visibility,
                'eyeButton': true
            });
            return (
                <li data-id={this.props.data.id} onClick={this.setCur} className={classes}>
                    <input onKeyDown={this.handleEnter} onBlur={this.handleBlur} type="text" className="nameInput" ref="nameInput" />
                    <span onClick={this.handleEdit} className="LayerName" ref="nameSpan">{this.props.data.name}</span>
                    <div className="opacityDisplay">{(this.props.data.opacity * 100).toFixed(0)}</div>
                    <div onClick={this.handleVisible} className={eleClasses} ref="visibleButton">
                        <i className="font-icon eye-icon"></i>
                    </div>
                </li>
            );
        }
    });

    var LayerControl = React.createClass({
        getInitialState: function () {
            return {
                opacity: 100
            }
        },
        componentDidMount: function () {
            $('.LayerOpacityControlTrack').slider({
                value: (this.props.data.getCanvas().opacity * 100).toFixed(0),
                orientation: 'horizontal',
                range: "min",
                animate: true,
                slide: this.slideOpacity/*,
                 change : this.changeOpacity*/
            });

        },
        slideOpacity: function (event, data) {
            this.setState({
                opacity: this.props.data.getCanvas().opacity
            });
            this.props.data.getCanvas().setOpacity(data.value / 100);
            this.props.refresh();
            mc.mediator.publish('drawOnchange');
        },
        addLayer: function () {
            this.props.data.addCanvas();
            this.props.refresh();
        },
        delLayer: function () {
            this.props.data.delCurCanvas();
            this.props.refresh();
        },
        concatLayer: function () {
            this.props.data.concatLayer();
            this.props.refresh();
        },
        render: function () {
            $('.LayerOpacityControlTrack').slider('value', (this.props.data.getCanvas().opacity * 100).toFixed(0));
            $('#buffer-canvas').css({opacity: this.props.data.getCanvas().opacity});
            return (
                <div className="LayerControl">
                    <div className="LayerOpacityControl">
                        <div className="LayerOpacityControlName">Opacity</div>
                        <div className="LayerOpacityControlTrack"></div>
                        <div className="LayerOpacityControlValue">{(this.props.data.getCanvas().opacity * 100).toFixed(0)}%</div>
                    </div>
                    <div className="LayerNumControl clearfix">
                        <div onClick={this.addLayer} className="LayerAdd LayerButton">
                            <i className="font-icon"></i>
                        </div>
                        <div onClick={this.delLayer} className="LayerDel LayerButton">
                            <i className="font-icon"></i>
                        </div>
                        <div onClick={this.concatLayer} className="LayerMergeVisible LayerButton">
                            <i className="font-icon"></i>
                        Visible</div>
                    </div>
                </div>
            )
        }
    });

    function init(mc) {
        React.render(
            <LayersBox data={mc} />, document.getElementById('drawPlzLayers')
        );
    }

    return {
        init: init
    }
});