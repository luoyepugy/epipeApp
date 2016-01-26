(function() {
    'use strict';

define(['./process.module'], function(process) {
    process.filter('finishedFilter', finishedFilter);

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