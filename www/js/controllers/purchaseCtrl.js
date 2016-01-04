
define(['./module'], function(controllers) {
    controllers.controller('purchaseCtrl',
        ['$scope', 'userService', '$state',
        function($scope, userService, $state){
        $scope.exit = function() {
            userService.clear();
            $state.go('purchase-login');
        };
    }]);
});