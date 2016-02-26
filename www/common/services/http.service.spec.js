
'use strict';

define(['./http.service', 'angularMocks'], function() {

    describe('common.httpService', function() {

        var $q, $rootScope, $httpBackend, $ionicLoading, httpService, messageService, $state, $cordovaInAppBrowser, $ionicPopup, config;

        beforeEach(module('myApp.common'));
        beforeEach(module('ui.router'));
        beforeEach(module('ionic'));
        
        beforeEach(function() {
            var mockMessageService = {};
            var mockConfig = {};
            var mockCordova = {};

            module('myApp.common', function($provide) {
                $provide.value('messageService', mockMessageService);
                $provide.value('config', mockConfig);
                $provide.value('$cordovaInAppBrowser', mockCordova);
            });
            inject(function($q) {
                mockMessageService.show = function (tips) {
                    $rootScope.message = tips;
                }
                mockConfig.host = 'http://192.168.1.154:8083';
                mockCordova.open = function() {
                    var defer = $q.defer();
                    defer.resolve();
                    return defer.promise;
                }
            });
        });

        beforeEach(inject(function(_$rootScope_, _$state_, _$httpBackend_,　_httpService_, _messageService_, _config_, _$ionicPopup_, _$ionicLoading_, _$cordovaInAppBrowser_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            messageService = _messageService_;
            config = _config_;
            $ionicLoading = _$ionicLoading_;
            $ionicPopup = _$ionicPopup_;
            $cordovaInAppBrowser = _$cordovaInAppBrowser_;
            $httpBackend = _$httpBackend_;
            httpService = _httpService_;

            spyOn($state, 'go');
        }));

        it('httpService被定义', function() {
            expect(httpService).not.toEqual(null);
            expect(httpService).toBeDefined();
        });

        it('httpService.getDatas被定义', function() {
            expect(httpService.getDatas).toBeDefined();
        });

        it('运行，２００，请求失败，错误提示', function() {
            httpService.getDatas('GET', '/url/aa');
            $httpBackend
                .when('GET', 'http://192.168.1.154:8083/url/aa')
                .respond(200, {"status": false, 'errMsg': '错误'});

            $httpBackend.flush();
            expect($rootScope.message).toEqual('错误');
        });

        it('运行，４０１', function() {
            httpService.getDatas('GET', '/url/aa');
            $httpBackend
                .when('GET', 'http://192.168.1.154:8083/url/aa')
                .respond(401, {"status": false, 'errMsg': '错误'});

            $httpBackend.flush();
            expect($state.go).toHaveBeenCalledWith('login');
        });

        it('运行，４０４', function() {
            httpService.getDatas('GET', '/url/aa');
            $httpBackend
                .when('GET', 'http://192.168.1.154:8083/url/aa')
                .respond(404, {"status": false, 'errMsg': '错误'});

            $httpBackend.flush();
            expect($rootScope.message).toEqual('服务器请求失败');
        });

    });
});