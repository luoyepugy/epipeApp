
define(['./account.module'], function(account) {
	account.controller('findPwdCtrl', findPwdCtrl);
		
	/* @ngInject */
	function findPwdCtrl($scope, httpService, validateService, $state){

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
			    	$state.go('resetPwd', {'phone': $scope.user.phone, 'code': $scope.user.code});
			    });
			}
	   	}  

	};
});