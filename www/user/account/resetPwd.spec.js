
'use strict';

define(['./resetPwd', 'angularMocks'], function() {

	describe('myApp.user.resetPwdCtrl', function() {

		var $scope, stateParams, httpService, resetPwdCtrl, $state, defer, validateService;

		beforeEach(module('myApp.user'));
        beforeEach(module('ui.router'));
        beforeEach(function() {
            var mockHttpService = {};
            var mockValidateService = {};

            module('myApp.purchase', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('validateService', mockValidateService);
                $provide.value('$stateParams', stateParams = {phone: '13008885781', code: '1234'});
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

            resetPwdCtrl = $controller('resetPwdCtrl', {
            	$scope: $scope, 
            	$state: $state, 
                $stateParams: stateParams,
            	httpService: httpService,
            	validateService: validateService 
            }); 
        }));

        it('resetPwdCtrl控制器应该被定义', function(){
            expect(resetPwdCtrl).toBeDefined();
        });

        it('scope.submit函数定义', function() {
        	expect(resetPwdCtrl.submit).toBeDefined();
        });

        it('触发submit函数', function() {
        	resetPwdCtrl.submit();
        	defer.resolve();
        	$scope.$digest();
        	expect($state.go).toHaveBeenCalledWith('login');
        });

	});

});