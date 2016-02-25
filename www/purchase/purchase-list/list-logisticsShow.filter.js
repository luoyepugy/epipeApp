(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.filter('logisticsShow', logisticsShow);

    /* @ngInject */
    function logisticsShow() {
        return function(item){
            switch(item) {
                case '已发货': return true;
                case '已完成': return true;
                default: return false;
            }
        }
    };
}); 

})();