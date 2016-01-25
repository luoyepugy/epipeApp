
define(['./user.module'], function(user) {
	user.directive('noedit', ['messageService', function(messageService) {
		return {
			restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    messageService.show('手机号码无法修改');
                });
            }    
		};
	}]);
});