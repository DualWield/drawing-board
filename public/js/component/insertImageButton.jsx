/**
 * Created by xuli07 on 2015/1/28.
 */
define(function (require) {

    var React = require('react');
    require('plugin/jquery.form');

    var InsertImageButton = React.createClass({
            handleChange: function () {
                $('#uploadForm').ajaxSubmit({

                    error: function(xhr) {
                    },

                    success: this.uploadSuccess.bind(this)
                });
            },
            uploadSuccess: function (res) {
                this.imageSrc = res;
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
                var okButton = $('<button class="ok">Ok</button>')
                    .appendTo(image_wrap)
                    .on('click', this.drawImageToCanvas.bind(this));
                var cancelButton = $('<button class="cancel">cancel</button>')
                    .appendTo(image_wrap)
                    .on('click', this.cancelInsertImage.bind(this))

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

/*
                canvas.ctx.scale(radioX, radioY);
                canvas.ctx.drawImage(this.image[0], x, y);
                canvas.ctx.scale(1/radioX, 1/radioY);
*/
                /*  增加shape */

                this.image_wrap.remove();

            },
            render: function () {
                return (
                    <form id="uploadForm"
                enctype="multipart/form-data"
                action="/api/photos"
                method="post">
                <input type="file" id="uploadImage" name="uploadImage" onChange={this.handleChange}/>
            </form>
    );
}
});
var init = function (mc) {
    React.render(
    <InsertImageButton data={mc} />,document.getElementById('insertImage')
    )
};
return {
    init : init
};
});