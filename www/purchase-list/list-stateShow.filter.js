(function() {
    'use strict';

define(['./list.module'], function(list) {
    list.filter('stateShow', stateShow);

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