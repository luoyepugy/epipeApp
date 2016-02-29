
'use strict';

define(['./getProfile', 'angularMocks'], function() {

    describe('myApp.user.getProfileCtrl', function() {

        var $scope, $state, httpService, defer, getProfileCtrl, config;
        

        beforeEach(module('myApp.user'));
        beforeEach(module('ui.router'));
        beforeEach(function() {
            var mockHttpService = {};
            var mockConfig = {};

            module('myApp.user', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('config', mockConfig);
            });
            inject(function($q) {
                mockHttpService.getDatas = function() {
                    defer = $q.defer();
                    return defer.promise;
                }
                mockConfig.host = 'http://192.168.1.154:8083';
            });
        });
        beforeEach(inject(function($rootScope, $controller, _$state_, _httpService_, _config_) {
            $scope = $rootScope.$new();
            $state = _$state_;
            httpService = _httpService_;
            config = _config_;

            getProfileCtrl = $controller('getProfileCtrl', {
                $scope: $scope,
                $state: $state,
                httpService: httpService,
                config: config
            });

            spyOn($state, 'go');
        }));

        it('getProfileCtrl控制器被定义', function() {
            expect(getProfileCtrl).toBeDefined();
        });

        it('exitAccount函数被定义', function() {
            expect(getProfileCtrl.exitAccount).toBeDefined();
        });

        it('http请求后datas.avatar为空，显示默认头像', function() {
            var data = { status: true, data: {avatar: ''} };
            defer.resolve(data);
            $scope.$digest();
            expect(getProfileCtrl.user.avatar).toEqual('./images/default_avatar.png');
        });

        it('http请求后datas.avatar不为空，显示用户头像', function() {
            var data = { status: true, data: {avatar: 'a'} };
            defer.resolve(data);
            $scope.$digest();
            expect(getProfileCtrl.user.avatar).toEqual('http://192.168.1.154:8083/public/avatar/a');
        });

        it('点击退出按钮，清空localStorage，跳转到登录页面', function() {
            getProfileCtrl.exitAccount();
            expect(window.localStorage.token).toBe(undefined);
            expect($state.go).toHaveBeenCalledWith('login');
        });

    });

});