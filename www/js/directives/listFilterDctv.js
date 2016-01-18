
define(['./module'], function(directives) {
	directives.directive('listFilter', 
		['$ionicModal', 'httpService',
		function($ionicModal, httpService) {
		return {
			restrict: 'AE',
			template: '<button class="button button-icon icon ion-plus-round"></button>',
			replace: true,
			scope: {},
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                     $ionicModal.fromTemplateUrl('./js/templates/listFilterTemp.html', {
					    scope: scope,
					    animation: 'fade-in'
					  }).then(function(modal) {
					    scope.modal = modal;
					    scope.modal.show();
					  });
					  
                });
                // 关闭弹窗菜单
                scope.closeModal = function() {
                	scope.modal.hide();
                };

                var count = 10;
				var baseUrl = '/order/getMyOldOrders/';
				
				var oldMaxCount = 0;
                // 待支付
                scope.paying = function() {

                }
                // 已支付
                scope.payed = function() {

                }
                // 已发货
                scope.receiving = function() {

                }
                // 已完成
                scope.received = function() {

                }
            }    
		};
	}]);
});