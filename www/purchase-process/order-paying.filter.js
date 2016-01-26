(function() {
    'use strict';

define(['./process.module'], function(process) {
    process.filter('payingFilter', payingFilter);

    /* @ngInject */
    function payingFilter() {
        return function(item){
            switch(item) {
                case '待支付': return true; break;
                default: return false; break;
            }
        }
    };
}); 

})();