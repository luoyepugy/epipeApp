
define(['./module'], function(directives) {
	directives.directive('offerDetail', ['httpService', '$ionicLoading', 'messageService',
		function(httpService, $ionicLoading ,messageService) {
		return {
			restrict: 'A',
			template: '',
			replace: false,
			scope: false,
			link: function(scope, element, attrs) {
				element.on('click', function() {
					console.log('dfs');
					var id = this.$parent.item.id;
					var status = this.$parent.item.status;
					if(status > 0) {
						// 预加载
					    $ionicLoading.show({
					        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
					        duration: 3000
					    });
						httpService.getData('./json/login.json', {'id': id})
					    .then(function(data) {
					    	$ionicLoading.hide();
					    	$state.go('purchase.offer');
					    });
					}　else {
						messageService.show('暂时没有商家报价');
					}
				});
			}
		};
	}]);
});