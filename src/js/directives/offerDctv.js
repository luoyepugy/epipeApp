
define(['./module'], function(directives) {
	directives.directive('listDetail', ['httpService', '$ionicLoading', 'messageService', '$state',
		function(httpService, $ionicLoading ,messageService, $state) {
		return {
			restrict: 'AE',
			template: '',
			replace: false,
			scope: false,
			link: function(scope, element, attrs) {
				element.on('click', function() {
					var status = scope.$parent.item.status;
			    	var id = scope.$parent.item.id;
			    	if(status === null) {
						var offerNum = scope.$parent.item.offerNum;
						if(offerNum > 0) {
							httpService.getData('./json/login.json', {'id': id})
						    .then(function(data) {
						    	$state.go('purchase.offer');
						    });
						}　else {
							messageService.show('暂时没有商家报价');
						}
			    	}　else {
						httpService.getData('./json/login.json', {'id': id})
					    .then(function(data) {
					    	$state.go('purchase.logistics');
					    });
			    	}
				});
			}
		};
	}]);
});