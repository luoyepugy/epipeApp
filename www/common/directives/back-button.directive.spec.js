
'use strict';

define(['./back-button.directive', 'angularMocks'], function() {

    xdescribe('返回按钮指令', function() {

        var element, directiveElem, $scope, $compile;

        function getCompiledElement(){
            element = angular.element('<back-button></back-button>');
            var compiledElement = $compile(element)($scope);
            $scope.$digest();
            return compiledElement;
        }

        beforeEach(module('myApp.common'));
        beforeEach(inject(function(_$rootScope_,_$compile_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            directiveElem = getCompiledElement();
        }));

        xit('点击事件', function() {
            element[0].click();
            expect($scope.test).toEqual('a');
        });

    });
});