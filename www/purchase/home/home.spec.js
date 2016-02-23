
'use strict';

define(['./home', 'angularMocks'], function() {

    xdescribe('myApp.purchase.homeCtrl', function() {

        var $scope, $state, $httpBackend, homeCtrl;
        var hostValue = {'host': 'http://192.168.1.154:8083'};

        beforeEach(module('myApp.purchase'));
        beforeEach(module('ui.router'));
        beforeEach(function() {
            module('myApp.purchase', function($provide) {
                $provide.constant('config', hostValue);
            });
        });
        beforeEach(inject(function($rootScope, $controller, _$state_, _$httpBackend_){         
            $scope = $rootScope.$new();
            $state = _$state_;
            $httpBackend = _$httpBackend_;
            spyOn($state, 'go');

            homeCtrl = $controller('homeCtrl', {$scope: $scope, $state: $state, _$httpBackend_: $httpBackend}); 
        }));

        xdescribe('定义', function() {
            it('homeCtrl控制器应该被定义', function(){
                expect(homeCtrl).toBeDefined();
            });

            it('welcome函数应该被定义', function(){
                expect(homeCtrl.welcome).toBeDefined();
            });

            it('homeCtrl应该没有属性vm', function() {
                expect(homeCtrl.vm).toBeUndefined();
            });
        });

        xdescribe('hasToken()跳转', function() {
            it('localStorage.token为空，跳转登录页面', function() {
                window.localStorage.token = '';
                homeCtrl.welcome();
                expect($state.go).toHaveBeenCalledWith('login');
            });

            it('localStorage.token不为空，跳转发布页面', function() {
                window.localStorage.token = 'a';
                homeCtrl.welcome();
                expect($state.go).toHaveBeenCalledWith('purchase.publish');
            });
        });

        describe('host主机名', function() {
            it('host应该为http://192.168.1.154:8083', function() {
                expect(homeCtrl.test).toEqual('http://192.168.1.154:8083');
            });

            it('请求服务器，修改主机名', function() {
                homeCtrl.welcome();
                $httpBackend.expectGET('http://www.epipe.cn/download/appConfig.js').respond({"api_host": "http://www.epipe.cn"});
                // $httpBackend
                //     .when('GET', 'http://www.epipe.cn/download/appConfig.js')
                //     .respond(200, {"api_host": "http://www.epipe.cn"});
               
                $httpBackend.flush();
                expect(homeCtrl.test).toEqual('http://www.epipe.cn');
            });
        });     

    });
});