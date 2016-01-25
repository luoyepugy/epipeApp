
define(['./list.module'], function(list) {
    list.filter('stateShow', function() {
        return function(item){
            switch(item) {
                case '报价': return false;
                default: return true;
            }
        }
    });
}); 