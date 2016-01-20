
define(['./module'], function(directives) {
	directives.directive('vcode', ['httpService', 'messageService', '$timeout', function(httpService, messageService, $timeout) {
		return {
			restrict: 'AE',
			replace: true,
			template: '<button class="mr10 button button-energized" ng-disabled="codeBtn">{{codeBtnVal}}</button>',
            scope: {},
            link: function (scope, elem, attrs) {
                var wait = 60;
                var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
                scope.codeBtnVal = '发送验证码';
                scope.codeBtn = false;
                elem.bind('click', function () {
                    if(wait === 60) {
                        sendVcode();
                        if(scope.$parent.user.phone !== '' && scope.$parent.user.phone != null && phone_regexp.test(scope.$parent.user.phone) === true) {
                            countDown();
                        }
                    }
                });
                function countDown() {
                    if(wait === 0) {
                        scope.$apply(function() { 
                            scope.codeBtn = false;
                            scope.codeBtnVal = '发送验证码';
                        });
                        wait = 60;
                    } else {
                        wait--;
                        // setTimeout(function() {
                        $timeout(function() {
                            scope.$apply(function() { 
                                scope.codeBtn = true; 
                                scope.codeBtnVal = wait + '秒后重试';
                            });
                            countDown();
                        }, 1000);
                    }
                }
                function sendVcode() {
                    if(scope.$parent.user.phone === '' || scope.$parent.user.phone == null) {
                        messageService.show('请输入手机号码');
                    } else if(!phone_regexp.test(scope.$parent.user.phone)) {
                        messageService.show('请输入正确的手机号码格式');
                    } else {
                        // httpService.getDatas('POST', '/user/sendPhoneToken', {'phone': scope.$parent.user.phone})
                        httpService.get('GET', './json/login.json', {'phone': scope.$parent.user.phone})
                        .then(function(data) {
                            return true;
                        });
                    }
                }
                                      
            }    
		};
	}]);
});