
define(['./module'], function(directives) {
	directives.directive('submitButton', 
		['httpService', 'messageService', 'validateService', '$state',
		function(httpService, messageService,validateService, $state) {
		return {
			restrict: 'E',
			template: '<button class="button button-full button-energized button-round">{{text}}</button>',
			replace: true,
			scope: {
				action: '@',
				state: '@',
				text: '@'
			},
			link: function(scope, element, attrs) {
				scope.text = attrs.text;
				var email_regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
				var resultsIsEmpty,
					resultsDatas;
				element.bind('click', function() {
					var form = this.closest('form');
					
					resultsIsEmpty = validateService.isEmpty('.j-form .j-input');
					if(resultsIsEmpty !== 1) {
						messageService.show(resultsIsEmpty);
						return false;
					}

					resultsDatas = validateService.submitData('.j-form');
                    if (resultsDatas.email !== null && resultsDatas.email !== undefined && email_regexp.test(resultsDatas.email) === false) {
                    	messageService.show('请输入正确的邮箱格式');
					} else if (resultsDatas.phone !== null && resultsDatas.phone !== undefined && phone_regexp.test(resultsDatas.phone) === false) {
						messageService.show('请输入正确的手机号码格式');
					} else if (resultsDatas.confirmPwd !== null && resultsDatas.confirmPwd !== undefined &&　resultsDatas.confirmPwd !== resultsDatas.password) {
						messageService.show('两次密码输入不一致');
					} else {
						var promise = httpService.getData(attrs.action, resultsDatas);
					    promise.then(function(data) {
					    	messageService.show(data.message);
					    	$state.go(attrs.state);
					    }, function(data) {
					    	messageService.show(data);
					    });
					}
				});
			}
		};
	}]);
});