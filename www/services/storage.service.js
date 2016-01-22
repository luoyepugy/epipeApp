(function() {
    'use strict';

define(['./services.module'], function(services) {
    services.factory('storageService', storageService);

    /* @ngInject */
    function storageService($window) {
        
        var storage = {
            'set': set,
            'get': get,
            'getItem': getItem,
            'removeItem': removeItem,
            'clear': clear
        },
        localStorage = $window.localStorage;
        return storage;


        function set(obj) {
            for(var i in obj) {
                localStorage[i] = obj[i]; 
            }
        };
        function get() {
            return localStorage;
        };
        function getItem(item) {
            return localStorage.getItem(item);
        };
        function removeItem(item) {
            localStorage.removeItem(item);
        };
        function clear() {
            localStorage.clear();
        };
        
    };
});

})();