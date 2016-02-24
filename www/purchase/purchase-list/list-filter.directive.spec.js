
'use strict';

define(['./list-filter.directive', 'angularMocks'], function() {

    describe('列表页面过滤菜单指令', function() {

        var $compile, $state, $scope, $rootScope, $ionicModal, directiveElem, defer, mockModal;

        function getCompiledElement(){
            var element = angular.element('<list-filter></list-filter>');
            var compiledElement = $compile(element)($scope);
            $scope.$digest();
            return compiledElement;
        }

        beforeEach(module('myApp.purchase'));
        beforeEach(module('ionic'));
        beforeEach(module('ui.router'));

        function fakeTemplate() {
            return { 
                then: function(modal){
                    $scope.modalTest = modal;
                }
            }
        }

        beforeEach(inject(function(_$state_, _$compile_, _$rootScope_, _$ionicModal_) {
            $compile = _$compile_;
            $state = _$state_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $ionicModal = _$ionicModal_;

            $ionicModal = 
            {
                fromTemplateUrl: jasmine.createSpy('$ionicModal.fromTemplateUrl').and.callFake(fakeTemplate)
            }; 

            spyOn($state, 'go');
    
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

        it('调用$ionicModal', function() {
            directiveElem.triggerHandler('click');
            // expect($ionicModal.fromTemplateUrl).toHaveBeenCalled();
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