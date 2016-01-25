(function() {
    'use strict';

define(['./directives.module'], function(directives) {
	directives.directive('submitButton', submitButton);

	/* @ngInject */
	function submitButton(httpService, messageService,validateService, $state, $window) {
		return {
			restrict: 'E',
			template: '<button class="button button-full button-energized button-round">{{text}}</button>',
			replace: true,
			scope: {},
			link: function(scope, element, attrs) {
				scope.text = attrs.text;
				var state = attrs.state || '',
				 	user = attrs.user || '',
				 	login = attrs.login || '',
				 	phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/,
				 	resultsIsEmpty,
					resultsDatas;

				element.bind('click', function() {
					// 验证是否为空
					resultsIsEmpty = validateService.isEmpty(attrs.form);
					if(!resultsIsEmpty) {
						return;
					}
					// 提交表单数据
					resultsDatas = validateService.submitData(attrs.form);
					if(resultsDatas) {
						var method = attrs.method || 'POST',
							actionpath = attrs.actionpath || '/user';
						
						httpService.getDatas(method, actionpath + attrs.action, resultsDatas)
						// httpService.get(method, action, resultsDatas);
					    .then(function(data) {
					    	$state.go(state);
					    	if(login === 'true') {
					    		$window.localStorage.token = data.token;
					    	}
					    });
					}
				});
			}
		};
	};
});

})();