
'use strict';

define(['./home', 'angularMocks'], function() {

    describe('myApp.purchase.homeCtrl', function() {

        var $scope, $state, $httpBackend, homeCtrl, config;

        beforeEach(module('myApp.purchase'));
        beforeEach(module('ui.router'));

        beforeEach(function() {
            var mockConfig = {};
            module('myApp.purchase', function($provide) {
                $provide.value('config', mockConfig);
            });
            inject(function() {
                mockConfig.host = 'http://192.168.1.154:8083';
            });
        });

        beforeEach(inject(function($rootScope, $controller, _$state_, _$httpBackend_, _config_){         
            $scope = $rootScope.$new();
            $state = _$state_;
            $httpBackend = _$httpBackend_;
            config = _config_;

            homeCtrl = $controller('homeCtrl', {
                $scope: $scope, 
                $state: $state, 
                _$httpBackend_: $httpBackend,
                config: config
            }); 

            spyOn($state, 'go');
        }));

        describe('定义', function() {
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

        describe('hasToken()跳转', function() {
            it('localStorage.token为空，跳转登录页面', function() {
                window.localStorage.token = '';
                homeCtrl.welcome();
                $httpBackend.expectGET('http://www.epipe.cn/download/appConfig.js').respond({"api_host": "http://www.epipe.cn"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith('login');
            });

            it('localStorage.token不为空，跳转发布页面', function() {
                window.localStorage.token = 'a';
                homeCtrl.welcome();
                $httpBackend.expectGET('http://www.epipe.cn/download/appConfig.js').respond({"api_host": "http://www.epipe.cn"});
                $httpBackend.flush();
                expect($state.go).toHaveBeenCalledWith('purchase.publish');
            });
        });

        describe('host主机名', function() {

            it('host应该为http://192.168.1.154:8083', function() {
                expect(config.host).toEqual('http://192.168.1.154:8083');
            });

            it('请求服务器，修改主机名', function() {
                homeCtrl.welcome();
                $httpBackend.expectGET('http://www.epipe.cn/download/appConfig.js').respond({"api_host": "http://www.epipe.cn"});
                // $httpBackend
                //     .when('GET', 'http://www.epipe.cn/download/appConfig.js')
                //     .respond(200, {"api_host": "http://www.epipe.cn"});
                // config = 'http://www.epipe.cn';
                $httpBackend.flush();
                expect(config.host).toEqual('http://www.epipe.cn');
            });
        });     

    });
});