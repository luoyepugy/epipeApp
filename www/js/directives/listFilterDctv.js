
define(['./module'], function(directives) {
	directives.directive('listFilter', 
		['$ionicModal', 'httpService',
		function($ionicModal, httpService) {
		return {
			restrict: 'AE',
			template: '<button class="button button-icon icon ion-android-menu"></button>',
			replace: true,
			scope: {},
            link: function (scope, elem, attrs) {
                var menuModal = null,
                    hasModal = false;
                elem.bind('click', function () {
                    if(hasModal) {
                        if(menuModal) { menuModal.show(); }
                        return;
                    }
                    hasModal = true;
                    $ionicModal.fromTemplateUrl('./js/templates/listFilterTemp.html', {
					    scope: scope,
					    animation: 'fade-in'
					}).then(function(modal) {
					    menuModal = modal;
					    if(menuModal) { menuModal.show(); }
					});
                });
                // 关闭弹窗菜单
                scope.closeModal = function() {
                	if(menuModal) { menuModal.hide(); }
                };
                scope.$on('$destroy', function() {
                    if(menuModal) { menuModal.remove(); }
                });
                

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