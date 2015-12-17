
define(['./module'], function(services) {
    services.factory('userService', function() {
        var users = {};
        var storage = window.localStorage;
        users.set = function(obj) {
            for(var i in obj) {
                storage[i] = obj[i]; 
            }
        };
        users.get = function() {
            return storage;
        };
        users.getItem = function(item) {
            return storage.getItem(item);
        };
        users.removeItem = function(item) {
            storage.removeItem(item);
        };
        users.clear =function() {
            storage.clear();
        };
        users.user = {
            // company: '深圳市市政工程总公司',
            // id: '77878556999',
            // password: '1234',
            // phone: '13008885784',
            // email: 'burce-ko@163.com'
        };
        return users;
    });
});