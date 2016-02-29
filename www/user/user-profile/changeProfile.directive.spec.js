
'use strict';

define(['./changeProfile.directive', 'angularMocks'], function() {

	describe('changeProfile.directive', function() {

		var $rootScope, $scope,　messageService, directiveElem, element, $compile;

		function getCompiledElement(){
            element = angular.element('<span noedit><span/>');
            var compiledElement = $compile(element)($scope);
            $scope.$digest();
            return compiledElement;
        }

		beforeEach(module('myApp.user'));
		beforeEach(function() {
			var mockMessageService = {};

			module('myApp.user', function($provide) {
				$provide.value('messageService', mockMessageService);
			});
			inject(function(_$rootScope_, _messageService_, _$compile_) {
				$rootScope = _$rootScope_;
				$scope = $rootScope.$new();
				messageService = _messageService_;
				$compile = _$compile_;

				mockMessageService.show = function(tips) {
					$rootScope.message = tips;
				}

				directiveElem = getCompiledElement();
			});
		});

		it('手机号码无法修改', function() {
			element[0].click();
			expect($rootScope.message).toEqual('手机号码无法修改');
		});
	});

});