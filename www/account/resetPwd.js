
define(['./account.module'], function(account) {
	account.controller('resetPwdCtrl',resetPwdCtrl);
		
	/* @ngInject */
	function resetPwdCtrl($scope, httpService, validateService, $stateParams, $state){

		var baseUrl = '/user/resetPassword';
	    $scope.user = {};
	    var phone = $stateParams.phone,
	    	code = $stateParams.code;
	    
	   	$scope.submit = function() {
	   		var resultsIsEmpty = validateService.isEmpty('.j-resetPwd');
			if(!resultsIsEmpty) {
				return;
			}
			var resultsDatas = validateService.submitData('.j-resetPwd');
			if(resultsDatas) {
				httpService.getDatas('POST',baseUrl, {'phone': phone, 'code': code, 'password': $scope.user.password})
			    .then(function(data) {
			    	$state.go('login');
			    });
			}
	   	}  

	};
});