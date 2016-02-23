'use strict';

define(['./list-route.directive', 'angularMocks'], function() {

	describe('列表页面路由指令', function() {
		var $compile, $state, $rootScope, element;

		beforeEach(module('myApp.purchase'));
		beforeEach(module('ui.router'));

		beforeEach(function() {
            var mockMessageService = {};
            module('myApp.purchase', function($provide) {
                $provide.value('messageService', mockMessageService);
            });
            inject(function($q) {
                mockMessageService.show = function(tips) {
                    rootScope.message = tips;
                };
            });
        });

		beforeEach(inject(function(_$state_, _$compile_, _$rootScope_) {
			$compile = _$compile_;
			$state = _$state_;
			$rootScope = _$rootScope_;
			
			spyOn($state, 'go');

			element = angular.element('<list-route></list-route>');
		}));

		it('制造元素<list-route />', function() {
			var element = $compile(element)($rootScope);
			$rootScope.$digest();

			var status = '报价';
			var offerNum = 1;
			element.click();

			expect($state.go).toHaveBeenCalledWith('purchase.offer');
		});

	});
});