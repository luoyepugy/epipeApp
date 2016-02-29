
'use strict';

define(['./submit-button.directive', 'angularMocks'], function() {

    describe('提交表单按钮指令', function() {

        var element, directiveElem, $scope, $compile, httpService, messageService, validateService, $state, $window, $rootScope;

        function getCompiledElement(){
            element = angular.element('<submit-button state="login" login=true></submit-button>');
            var compiledElement = $compile(element)($scope);
            $scope.$digest();
            return compiledElement;
        }

        beforeEach(module('myApp.common'));
        beforeEach(module('ui.router'));

        beforeEach(function() {
            var mockHttpService = {};
            var mockMessageService = {};
            var mockValidateService = {};

            module('myApp.common', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('messageService', mockMessageService);
                $provide.value('validateService', mockValidateService);
            });
            inject(function($q) {
                mockHttpService.getDatas = function() {
                    var defer = $q.defer();
                    var data = {'token': 'hello'};
                    defer.resolve(data);
                    return defer.promise;
                }
                mockValidateService.isEmpty = function(form) {
                    return true;
                }
                mockValidateService.submitData = function(form) {
                    return true;
                }
            });
        });
        beforeEach(inject(function(_$rootScope_,_$compile_, _httpService_, _messageService_, _validateService_, _$state_, _$window_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            httpService = _httpService_;
            messageService = _messageService_;
            validateService = _validateService_;
            $state = _$state_;
            $window = _$window_;
            
            directiveElem = getCompiledElement();
            spyOn($state, 'go');
        }));

        it('点击事件', function() {
            element[0].click();
            $scope.$digest();
            expect($state.go).toHaveBeenCalledWith('login');
            expect($window.localStorage.token).toEqual('hello');
        });

    });
});