
define(['./module'], function(controllers) {
	controllers.controller('homeCtrl',
		['$scope', 'httpService', '$state','messageService', 
		function($scope, httpService, $state, messageService){
		var baseUrl = './json/login.json';
		$scope.login = function() {
			var promise = httpService.getData(baseUrl);
		    promise.then(function(data) {
		    	if(data.login) {
		    		$state.go('purchase.publish');
		    	}　else  {
		    		$state.go('purchase-login');
		    	}
		    	// userService.user = data.user;
		    });
		};
	}]);
});