'use strict';

define(['./list-route.directive', 'angularMocks'], function() {

	xdescribe('列表页面路由指令', function() {

		var $scope, $compile, $state, $rootScope, directiveElem, element, messageService;

		function getCompiledElement(){
            element = angular.element('<ion-item list-route></ion-item>');
            var compiledElement = $compile(element)($scope);
            $scope.$digest();
            return compiledElement;
        }

		beforeEach(module('myApp.purchase'));
		beforeEach(module('ui.router'));

		beforeEach(function() {
            var mockMessageService = {};
            module('myApp.purchase', function($provide) {
                $provide.value('messageService', mockMessageService);
            });
            inject(function($q) {
                mockMessageService.show = function(tips) {
                    $rootScope.message = tips;
                };
            });           
        });

		beforeEach(inject(function(_$state_, _$compile_, _$rootScope_, _messageService_) {
			$compile = _$compile_;
			$state = _$state_;
			$rootScope = _$rootScope_;
			$scope = $rootScope.$new();
			messageService = _messageService_;
			
			spyOn($state, 'go');
			directiveElem = getCompiledElement();
		}));

		it('制造元素<list-route />', function() {
			// var isolatedScope = directiveElem.isolateScope();
            // var compiledElement = $compile(element)($scope.$parent);
            // $scope.$digest();

			// directiveElem.triggerHandler('click');
			element[0].click();
			expect($state.go).toHaveBeenCalledWith('purchase.offer');
		});

	});
});