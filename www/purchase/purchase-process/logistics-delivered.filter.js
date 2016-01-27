(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.filter('deliveredFilter', deliveredFilter);

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