
define(['./module'], function(controllers) {
	controllers.controller('homeCtrl',
		['$scope', 'httpService', '$state', 
		function($scope, httpService, $state){
		$scope.welcome = function() {
			if(window.localStorage.getItem('token') != null && window.localStorage.getItem('token') !== '') {
				$state.go('purchase.publish');	
			} else {
				$state.go('purchase-login');
			}
		};
	}]);
});