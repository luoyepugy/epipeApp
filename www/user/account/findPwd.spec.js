
'use strict';

define(['./findPwd', 'angularMocks'], function() {

	describe('myApp.user.findPwdCtrl', function() {

		var $scope, httpService, findPwdCtrl, $state, defer, validateService;

		beforeEach(module('myApp.user'));
        beforeEach(module('ui.router'));
        beforeEach(function() {
            var mockHttpService = {};
            var mockValidateService = {};

            module('myApp.purchase', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('validateService', mockValidateService);
            });
            inject(function($q) {
                mockHttpService.getDatas = function() {
                    defer = $q.defer();
                    // defer.resolve(data);
                    return defer.promise;
                };
                mockValidateService.isEmpty = function(value) {
                    return true;
                };
                mockValidateService.submitData = function(value) {
                    return true;
                };
            });
        });

        beforeEach(inject(function($rootScope, $controller, _$state_, _httpService_, _validateService_){         
            $scope = $rootScope.$new();
            $state = _$state_;
            httpService = _httpService_;
            validateService = _validateService_;

            spyOn($state, 'go');

            findPwdCtrl = $controller('findPwdCtrl', {
            	$scope: $scope, 
            	$state: $state, 
            	httpService: httpService,
            	validateService: validateService 
            }); 
        }));

        it('findPwdCtrl控制器应该被定义', function(){
            expect(findPwdCtrl).toBeDefined();
        });

        it('scope.submit函数定义', function() {
        	expect(findPwdCtrl.submit).toBeDefined();
        });

        it('触发submit函数', function() {
        	findPwdCtrl.user.phone = '13008885781';
        	findPwdCtrl.user.code = '1234'
        	findPwdCtrl.submit();
        	defer.resolve();
        	$scope.$digest();
        	expect($state.go).toHaveBeenCalledWith('resetPwd', {'phone': '13008885781', 'code': '1234'});
        });

	});

});