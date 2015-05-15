/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {

    var React = require('react');
    require('plugin/jquery.form');

    var InsertImageButton = React.createClass({
        handleChange: function () {
            $('#uploadForm').ajaxSubmit({
                error: function (xhr) {
                },
                success: this.uploadSuccess.bind(this)
            });
        },
        handleUploadClick: function () {
            $('#uploadImage').click();
        },
        uploadSuccess: function (res) {
            this.imageSrc = res;
            this.refs.ok.getDOMNode().style.display = 'block';
            this.refs.cancel.getDOMNode().style.display = 'block';
            this.insertImage();

        },
        insertImage: function () {
            var image = $('<img>')
                .css({
                    /*  zIndex: 100,
                     position: 'absolute',*/
                    top: 0,
                    left: 0,
                    cursor: 'crosshair'
                })
                .attr('src', this.imageSrc)
                .on('load', function () {
                    $(this).resizable()
                        .data('width', this.width)
                        .data('height', this.height);

                });
            var image_wrap = $('<div class="uploadImageWrap">')
                .append(image)
                .draggable()
                .appendTo('.draw-pic-canvas');

            this.image_wrap = image_wrap;
            this.image = image;

        },
        cancelInsertImage: function () {
            this.image_wrap.remove();
        },
        drawImageToCanvas: function () {
            var canvas = this.props.data.dc.addCanvas();
            require('jsx!component/layer').init(this.props.data);
            var radioX = this.image.width() / this.image.data('width');
            var radioY = this.image.height() / this.image.data('height');
            var x = this.image.offset().left - $('.draw-pic-canvas').offset().left;
            var y = this.image.offset().top - $('.draw-pic-canvas').offset().top;
            var shape = require('core/shapes').ImageShape.create({
                x: x,
                y: y,
                radioX: radioX,
                radioY: radioY,
                url: this.image.attr('src')
            });
            shape.canvas = mc.dc.getCanvas();

            mc.saveShape(shape);

            this.image_wrap.remove();

            this.refs.ok.getDOMNode().style.display = 'none';
            this.refs.cancel.getDOMNode().style.display = 'none';

        },
        render: function () {
            return (
                <div>
                    <div onClick={this.handleUploadClick} className="btn btn-default">插入图片</div>

                    <form id="uploadForm"
                        enctype="multipart/form-data"
                        action="/api/photos"
                        method="post"
                        className="uploadForm">
                        <a className="uploadButtonWrap" onClick={this.handleUploadClick}></a>
                        <input type="file" id="uploadImage" name="uploadImage" onChange={this.handleChange}/>
                        <button ref="ok" className="ok" type="button" onClick={this.drawImageToCanvas}>Ok</button>
                        <button ref="cancel" className="cancel" type="button" onClick={this.cancelInsertImage}>Cancel</button>
                    </form>
                </div>

            );
        }
    });
    var init = function (mc) {
        React.render(
            <InsertImageButton data={mc} />, document.getElementById('insertImageButton')
        )
    };
    return {
        init: init
    };
});