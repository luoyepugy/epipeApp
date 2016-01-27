(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.filter('logisticsShow', logisticsShow);

    /* @ngInject */
    function logisticsShow() {
        return function(item){
            switch(item) {
                case '报价': return false;
                case '待支付': return false;
                case '已支付': return false;
                default: return true;
            }
        }
    };
}); 

})();