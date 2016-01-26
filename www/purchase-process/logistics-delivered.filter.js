(function() {
    'use strict';

define(['./process.module'], function(process) {
    process.filter('deliveredFilter', deliveredFilter);

    /* @ngInject */
    function deliveredFilter() {
        return function(item){
            switch(item) {
                case '已发货': return true;
                default: return false;
            }
        }
    };
}); 

})();