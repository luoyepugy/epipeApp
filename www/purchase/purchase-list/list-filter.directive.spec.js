'use strict';

define(['./list-filter.directive', 'angularMocks'], function() {

	xdescribe('列表页面过滤菜单指令', function() {
		var $compile, $state, $rootScope, $ionicModal;

		function fakeTemplate() {
			return { then: function() {} }
		}

		beforeEach(module('myApp.purchase'));
		beforeEach(module('ui.router'));
		beforeEach(inject(function(_$state_, _$compile_, _$rootScope_) {
			$compile = _$compile_;
			$state = _$state_;
			$rootScope = _$rootScope_;

			$ionicModal = {
				fromTemplateUrl: jasmine.createSpy('$ionicModal.fromTemplateUrl').and.callFake(fakeTemplate)
			};
			
			spyOn($state, 'go');
		}));

		it('制造元素<list-filter />', function() {
			var element = $compile('<list-filter></list-filter>')($rootScope);
			$rootScope.$digest();
			expect(element.html()).toContain('<button class="button button-icon icon ion-android-menu"></button>');
		});

		it('调用$ionicModal', function() {
			var element = $compile('<list-filter></list-filter>')($rootScope);
			$rootScope.$digest();
			element.click();
			expect($ionicModal.fromTemplateUrl).toHaveBeenCalled();
		});

	});
});