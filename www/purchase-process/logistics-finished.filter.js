
define(['./process.module'], function(process) {
    process.filter('finishedFilter', function() {
        return function(item){
            switch(item) {
                case '已完成': return false;
                default: return true;
            }
        }
    });
}); 