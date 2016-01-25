(function() {
	'use strict';

define(['./services.module'], function(services) {
	services.factory('messageService', messageService);

	/* @ngInject */
	function messageService($rootScope, $timeout) {

		return {
			'show': show
		};
		
		function show(tips) {
			// if(tips != null && tips !== '') {
			// 	$rootScope.messageShow = true;
			// 	$rootScope.tips = tips;
			// 	$timeout(function() {
			// 		$rootScope.messageShow = false;
			// 	}, 2500);
			// }
			if($('.error_tip').length < 1) {
                $('body').append('<p class="error_tip">' + tips +'</p>');
                $timeout(function(){
                    $('.error_tip').remove();
                }, 2500);
            }
		};
	}
		
});

})();