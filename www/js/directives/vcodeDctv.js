
define(['./module'], function(directives) {
	directives.directive('vcode', ['httpService', 'messageService', function(httpService, messageService) {
		return {
			restrict: 'AE',
			replace: true,
			template: '<button class="mr10 button button-energized">发送验证码</button>',
            scope: {},
            link: function (scope, elem, attrs) {
                var flag = false;
                elem.bind('click', function () {
                    if(flag) {
                        setTimeout(function(){
                            flag = false;
                        }, 30000);
                        return false;
                    }
                    flag = true;
                    sendVcode();
                    function sendVcode() {
                       if(scope.$parent.user.phone !== '' && scope.$parent.user.phone != null) {
                           　httpService.post('http://192.168.1.154:8083/user/sendPhoneToken', {'phone': scope.$parent.user.phone})
                            .then(function(data) {
                                return true;
                            }); 
                        } else {
                            messageService.show('请输入手机号码');
                        } 
                    }
                                      
                });
            }    
		};
	}]);
});