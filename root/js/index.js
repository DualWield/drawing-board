requirejs.config({
   baseUrl: 'js',
   paths: {

   }
});

define(function (require) {
   var MyCanvas = require('core/MyCanvas');
   var component = require('component/init');

   var mc = new MyCanvas();

   component.init(mc);

});