(function() {
    'use strict';

define(['../purchase.module'], function(purchase) {
    purchase.filter('finishedFilter', finishedFilter);

    /* @ngInject */ 
    function finishedFilter() {
        return function(item){
            switch(item) {
                case '已完成': return false;
                default: return true;
            }
        }
    };
}); 

})();