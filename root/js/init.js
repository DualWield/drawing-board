require(["jquery",'component/main-canvas', 'component/mainToolBarModule'], function(
    $,
    canvasModule,
    mainToolBarModule) {
    $(function () {

        canvasModule.init();
        mainToolBarModule.init();
    });

});