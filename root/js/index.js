requirejs.config({
   baseUrl: 'js',
   paths: {
      'react' : 'lib/react-with-addons',
      'mediator': 'lib/mediator.min'
   },
   jsx:{
      fileExtension: '.jsx'
   }

});

define(function (require) {
   var MyCanvas = require('core/MyCanvas');
   var component = require('component/init');

   var mc = new MyCanvas();

   window.mc = mc;
   component.init(mc);

});