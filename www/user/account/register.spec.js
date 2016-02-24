
'use strict';

define(['./register', 'angularMocks'], function() {

	describe('myApp.user.registerCtrl', function() {

		var $scope, $rootScope, defer, httpService, registerCtrl, messageService;

		beforeEach(module('myApp.user'));
        beforeEach(function() {
            var mockHttpService = {};
            var mockMessageService = {};

            module('myApp.purchase', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('messageService', mockMessageService);
            });
            inject(function($q) {
                mockHttpService.getDatas = function() {
                    defer = $q.defer();
                    // defer.resolve(data);
                    return defer.promise;
                };
                mockMessageService.show = function(tips) {
                    $rootScope.message = tips;
                };
            });
        });

        beforeEach(inject(function(_$rootScope_, $controller, _httpService_, _messageService_){  
            $rootScope = _$rootScope_;       
            $scope = $rootScope.$new();
            httpService = _httpService_;
            messageService = _messageService_;

            registerCtrl = $controller('registerCtrl', {
            	$scope: $scope,
            	httpService: httpService,
            	messageService: messageService 
            }); 
        }));

        it('registerCtrl控制器应该被定义', function(){
            expect(registerCtrl).toBeDefined();
        });

        it('scope.hasPhone函数定义', function() {
        	expect(registerCtrl.hasPhone).toBeDefined();
        });

        it('触发hasPhone函数', function() {
            registerCtrl.user.phone = '13008885781';
        	registerCtrl.hasPhone();
        	defer.resolve();
        	$scope.$digest();
            expect($rootScope.message).toEqual('手机号码已存在');
        });

	});

});