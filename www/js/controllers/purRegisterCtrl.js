
define(['./module'], function(controllers) {
	controllers.controller('purRegisterCtrl',
		['$scope', 'httpService','$state', 'messageService', 'validateService',
		function($scope, httpService, $state, messageService, validateService){
			$scope.user = {};
			var flag = false;
            $scope.codeBtn = true;
			$scope.phone = function() {
				// if($scope.user.phone !== '' && $scope.user.phone != null) {
    //                 httpService.getDatas('GET', '/user/checkPhone/' + $scope.user.phone)
    //                 .then(function(data) {
    //                     return true;
    //                 }); 
    //             }
			}
			$scope.vcode = function() {
				if(flag) {
                    setTimeout(function(){
                        flag = false;
                    }, 60000);
                    return false;
                }
                flag = true;
                sendVcode();
			}
			function sendVcode() {
                if($scope.user.phone !== '' && $scope.user.phone != null) {
                    $scope.codeBtn = false;
                   // 　httpService.getDatas('POST', '/user/sendPhoneToken', {'phone': $scope.user.phone})
                   　httpService.get('GET', './json/login.json', {'phone': $scope.user.phone})
                    .then(function(data) {
                        setTimeout(function(){
                            $scope.codeBtn = true;
                            console.log('aaa');
                        }, 5000);
                    }); 
                } else {
                    messageService.show('请输入手机号码');
                }
            }
	}]);
});