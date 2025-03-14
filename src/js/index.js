'use strict';

(function () {
    const app = {};

    app.name = 'UI Style';
    app.version = '2.0.0';

    app.init = () => {
        console.log(app.name);
        console.log(app.version);
    }
    
    app.init();
})();