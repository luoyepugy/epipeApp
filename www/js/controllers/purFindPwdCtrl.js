
define(['./module'], function(controllers) {
	controllers.controller('purFindPwdCtrl',
		['$scope', 'httpService', 'validateService', '$state',
		function($scope, httpService, validateService, $state){

		var baseUrl = '/user/checkPhoneToken/';
	    $scope.user = {};
	    
	   	$scope.submit = function() {
	   		var resultsIsEmpty = validateService.isEmpty('.j-forgetPwd');
			if(!resultsIsEmpty) {
				return;
			}
			var resultsDatas = validateService.submitData('.j-forgetPwd');
			if(resultsDatas) {
				httpService.getDatas('GET',baseUrl + $scope.user.phone + '/' + $scope.user.code)
			    .then(function(data) {
			    	$state.go('purchase-resetPwd', {'phone': $scope.user.phone, 'code': $scope.user.code});
			    });
			}
	   	}  

	}]);
});