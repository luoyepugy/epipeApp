
define(['./module'], function(services) {
    services.factory('storageService', function() {
        var storage = {};
        var storage = window.localStorage;
        storage.set = function(obj) {
            for(var i in obj) {
                storage[i] = obj[i]; 
            }
        };
        storage.get = function() {
            return storage;
        };
        storage.getItem = function(item) {
            return storage.getItem(item);
        };
        storage.removeItem = function(item) {
            storage.removeItem(item);
        };
        storage.clear =function() {
            storage.clear();
        };
        return storage;
    });
});