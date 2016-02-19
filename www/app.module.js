(function() {
    'use strict';

    define(['angular', 'angularMocks',
        './purchase/purchase.index',
        './common/common.index',
        './user/user.index'
        ], function(angular, purchase, common, user) {
        return angular.module('myApp', ['ionic','ngCordova',                  
            'myApp.purchase',
            'myApp.common',
            'myApp.user'
        ]);
    });
    
})();
