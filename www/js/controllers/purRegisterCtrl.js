
define(['./module'], function(controllers) {
	controllers.controller('purRegisterCtrl',
		['$scope', 'httpService','$state', 'messageService', 'validateService',
		function($scope, httpService, $state, messageService, validateService){
			$scope.user = {};
			var wait = 60;
            $scope.codeBtnVal = '发送验证码';
            $scope.codeBtn = false;
			$scope.phone = function() {
				if($scope.user.phone !== '' && $scope.user.phone != null) {
                    httpService.getDatas('GET', '/user/checkPhone/' + $scope.user.phone)
                    .then(function(data) {
                        return true;
                    }); 
                }
			}
			$scope.vcode = function() {
                if(wait === 60) {
                    sendVcode();
                }
                if($scope.user.phone !== '' && $scope.user.phone != null) {
                    countDown();
                }
			}
			function countDown() {
                if(wait === 0) {
                    $scope.$apply(function() { 
                        $scope.codeBtn = false;
                        $scope.codeBtnVal = '发送验证码';
                    });
                    wait = 60;
                } else {
                    wait--;
                    setTimeout(function() {
                        $scope.$apply(function() { 
                            $scope.codeBtn = true; 
                            $scope.codeBtnVal = wait + '秒后重试';
                        });
                        countDown();
                    }, 1000);
                }
            }
            function sendVcode() {
                if($scope.user.phone !== '' && $scope.user.phone != null) {
                   　httpService.getDatas('POST', '/user/sendPhoneToken', {'phone': $scope.user.phone})
                    .then(function(data) {
                        return true;
                    }); 
                } else {
                    messageService.show('请输入手机号码');
                }
            }
	}]);
});