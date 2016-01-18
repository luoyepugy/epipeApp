
define(['./module'], function(directives) {
	directives.directive('submitButton', 
		['httpService', 'messageService', 'validateService', '$state',
		function(httpService, messageService,validateService, $state) {
		return {
			restrict: 'E',
			template: '<button class="button button-full button-energized button-round">{{text}}</button>',
			replace: true,
			scope: {},
			link: function(scope, element, attrs) {
				scope.text = attrs.text;
				var state = attrs.state || '';
				var user = attrs.user || '';
				var login = attrs.login || '';
				var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
				var resultsIsEmpty,
					resultsDatas;
				element.bind('click', function() {
					resultsIsEmpty = validateService.isEmpty(attrs.form);
					if(resultsIsEmpty !== 1) {
						messageService.show(resultsIsEmpty);
						return false;
					}
					resultsDatas = validateService.submitData(attrs.form);
					if(resultsDatas.company != null && resultsDatas.company != '') {
						resultsDatas.userProfile = {'company': resultsDatas.company };
					}
					if (resultsDatas.phone !== null && resultsDatas.phone !== undefined && phone_regexp.test(resultsDatas.phone) === false) {
						messageService.show('请输入正确的手机号码格式');
					} else if (resultsDatas.confirmPwd !== null && resultsDatas.confirmPwd !== undefined &&　resultsDatas.confirmPwd !== resultsDatas.password) {
						messageService.show('两次密码输入不一致');
					} else if (resultsDatas.productAmount !== null && resultsDatas.productAmount !== undefined && isNaN(resultsDatas.productAmount) === true ||　Number(resultsDatas.productAmount) <= 0) {
						messageService.show('请输入正确的商品数量格式');
					} else {
						var promise = httpService.getDatas('POST', attrs.action, resultsDatas);
					    promise.then(function(data) {
					    	// messageService.show(data.message);
					    	$state.go(state);
					    	if(login === 'true') {
					    		window.localStorage.token = data.token;
					    	}
					    });
					}
				});
			}
		};
	}]);
});