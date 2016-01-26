(function() {
    'use strict';

define(['./list.module'], function(list) {
    list.filter('offerShow', offerShow);

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