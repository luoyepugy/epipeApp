(function() {
	'use strict';

define(['./app'], function(app) {
    var value = {
        'host': 'http://192.168.1.154:8083'
        // 'host': 'http://www.epipe.cn:3001'
    };
    return app.constant('config', value);
});

})();