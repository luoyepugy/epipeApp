
define(['./module'], function(services) {
    services.factory('userService', function() {
        var users = {};
        users.user = {
            company: '深圳市市政工程总公司',
            id: '77878556999',
            password: '1234',
            phone: '13008885784',
            email: 'burce-ko@163.com'
        };
        return users;
    });
});