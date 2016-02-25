
'use strict';

define(['./list-filter.directive', 'angularMocks'], function() {

    describe('列表页面过滤菜单指令', function() {

        var $compile, $state, $scope, $rootScope, $ionicModal, directiveElem, defer, element;

        function getCompiledElement(){
            element = angular.element('<list-filter></list-filter>');
            var compiledElement = $compile(element)($scope);
            $scope.$digest();
            return compiledElement;
        }

        beforeEach(module('myApp.purchase'));
        beforeEach(module('ionic'));
        beforeEach(module('ui.router'));
        beforeEach(function() {
            var mockIonicModal = {};
            module('myApp.purchase', function($provide) {
                $provide.value('$ionicModal', mockIonicModal);
            });
            inject(function($q) {
                mockIonicModal.fromTemplateUrl = function () {
                    var modal = null;
                    defer = $q.defer();
                    defer.resolve(modal);
                    return defer.promise;
                }
            });
        });

        beforeEach(inject(function(_$state_, _$compile_, _$rootScope_, _$ionicModal_) {
            $compile = _$compile_;
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $ionicModal = _$ionicModal_;

            spyOn($state, 'go');
            spyOn($ionicModal, 'fromTemplateUrl');

            $scope.closeModal = jasmine.createSpy('closeModal');
            $scope.stateRoute = jasmine.createSpy('stateRoute', function(state) {
                $state.go('purchase.list', {'state': state});
            });

            directiveElem = getCompiledElement();            
        }));

        xit('指令<list-filter />是否转换为字符串', function() {
            expect(directiveElem.attr('class')).toContain('ion-android-menu');
            expect(directiveElem.find('button')).toBeDefined();
        });

        xit('调用$ionicModal', function() {
            directiveElem.triggerHandler('click');
            // element[0].click();
            // $scope.$digest();
            expect($ionicModal.fromTemplateUrl).toHaveBeenCalled();
        });

        it('触发closeModal事件', function() {
            $scope.closeModal();
            expect($scope.closeModal).toHaveBeenCalled();
        });

        it('触发stateRoute事件', function() {
            $scope.stateRoute('报价');
            expect($scope.stateRoute).toHaveBeenCalled();
            // expect($state.go).toHaveBeenCalledWith('purchase.list', {'state': '报价'});
        });

    });
});