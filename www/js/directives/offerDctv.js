
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
					var status = scope.$parent.item.state;
			    	var id = scope.$parent.item.name;
			    	if(status === '报价') {
						var offerNum = scope.$parent.item.quotationCount;
						if(offerNum > 0) {
	                        $state.go('purchase.offer', {'id': id});
						}　else {
							messageService.show('暂时没有商家报价');
						}
			    	}　else if(status === '已完成'){
                        $state.go('purchase.logistics', {'id': id});
			    	}　else if(status === '已发货'){
                        $state.go('purchase.logistics', {'id': id});
			    	}　else if(status === '待支付'){
                        $state.go('purchase.order', {'id': id});
			    	}else if(status === '已支付'){
                        $state.go('purchase.order', {'id': id});
			    	}
				});
			}
		};
	}]);
});