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
				var state = attrs.state || '';
				var user = attrs.user || '';
				var login = attrs.login || '';
				var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
				var resultsIsEmpty,
					resultsDatas;

				element.bind('click', function() {

					resultsIsEmpty = validateService.isEmpty(attrs.form);
					if(!resultsIsEmpty) {
						return;
					}

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