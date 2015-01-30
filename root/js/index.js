requirejs.config({
   baseUrl: 'js',
   paths: {
      'react' : 'lib/react'
   },
   jsx:{
      fileExtension: '.jsx'
   }

});

define(function (require) {
   var MyCanvas = require('core/MyCanvas');
   var component = require('component/init');

   var mc = new MyCanvas();

   component.init(mc);

});