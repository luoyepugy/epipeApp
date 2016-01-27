(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.filter('offerShow', offerShow);

    /* @ngInject */
    function offerShow() {
        return function(item){
            switch(item) {
                case '报价': return true;
                default: return false;
            }
        }
    };
}); 

})();