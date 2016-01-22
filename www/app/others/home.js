
define(['./others.module'], function(others) {
	others.controller('homeCtrl', homeCtrl);
	
	/* @ngInject */
	function homeCtrl($scope, $state, $http, config){


		$scope.welcome = function() {
			// $http.get('http://www.epipe.cn/download/appConfig.js')
			// .success(function(data) {
			// 	config.host = data['api_host'];
			// 	host();
			// }).error(function(data) {
				host();
			// });
		};

		function host() {
			if(window.localStorage.getItem('token') != null && window.localStorage.getItem('token') !== '') {
				$state.go('purchase.publish');	
			} else {
				$state.go('purchase-login');
			}
		}

	};
});