(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.filter('payingFilter', payingFilter);

    /* @ngInject */
    function payingFilter() {
        return function(item){
            switch(item) {
                case '待支付': return true;
                default: return false;
            }
        }
    };
}); 

})();