
define(['angular',
    './directives/directives.index',
    './services/services.index',
    './purchase-process/process.index'
    ], function(angular, directives, services, process){
    return angular.module('myApp',['ionic',
    		'ionic.service.core',
    		'ionic.service.deploy',
    		'ngCordova',
            'myApp.directives',
            'myApp.services',
            'myApp.purchaseProcess'
        ]);
});
