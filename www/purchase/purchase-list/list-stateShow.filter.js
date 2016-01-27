(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.filter('stateShow', stateShow);

    /* @ngInject */ 
    function stateShow() {
        return function(item){
            switch(item) {
                case '报价': return false;
                default: return true;
            }
        }
    };
}); 

})();