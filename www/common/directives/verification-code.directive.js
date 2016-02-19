(function() {
    'use strict';

define(['../common.module'], function(commoon) {
    commoon.directive('vcode', vcode);

    /* @ngInject */
    function vcode(httpService, messageService, $timeout) {
        var directive = {
            restrict: 'E',
            template: '<button style="width: 125px;" class="mr10 button button-energized" ng-disabled="disabled">{{text}}</button>',
            replace: true,
            scope: {},
            link: link
        };
        return directive;

        function link(scope, elem, attrs) {
            var wait = 60,
                flag = false,
                phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;

            // 初始化文本
            scope.text = '发送验证码';
            // 按钮初始化可用
            scope.disabled = false;

            elem.bind('click', function () {
                if(wait === 60) {
                    sendVcode();
                    if(flag) {
                        countDown();
                    }
                }
            });

            // 倒数60s计时
            function countDown() {
                if(wait === 0) {
                    $timeout(function() { 
                        scope.disabled = false;
                        scope.text = '发送验证码';
                    }, 100);
                    wait = 60;
                    flag = false;
                } else {
                    wait--;
                    $timeout(function() {
                        scope.disabled = true; 
                        scope.text = wait + '秒后重试';
                        countDown();
                    }, 1000);
                }
            };
            // 点击发送验证码按钮
            function sendVcode() {
                if(scope.$parent.vm.user.phone === '' || scope.$parent.vm.user.phone == null) {
                    messageService.show('请输入手机号码');
                } else if(!phone_regexp.test(scope.$parent.vm.user.phone)) {
                    messageService.show('请输入正确的手机号码格式');
                } else {
                    flag = true;
                    httpService.getDatas('POST', '/user/sendPhoneToken', {'phone': scope.$parent.vm.user.phone})
                    // httpService.get('GET', './json/login.json', {'phone': scope.$parent.user.phone})
                    .then(function(data) {
                        return true;
                    });
                }
            };
                                  
        };   
    };

});

})();