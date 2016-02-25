
'use strict';

define(['./changeProfile', 'angularMocks'], function() {

    describe('myApp.user.changeProfileCtrl', function() {
        var changeProfileCtrl, $scope, httpService, $state, $ionicActionSheet, cameraService, uploadService, config, $ionicActionSheet;
        var deferHttp, deferCamera, deferUpload;

        beforeEach(module('myApp.user'));
        beforeEach(module('ui.router'));
        beforeEach(module('ionic'));

        beforeEach(function() {
            var mockHttpService = {};
            var mockCameraService = {};
            var mockUploadService = {};
            var mockConfig = {};
            var mockIonicActionSheet = {};

            module('myApp.user', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('cameraService', mockCameraService);
                $provide.value('uploadService', mockUploadService);
                $provide.value('config', mockConfig);
                $provide.value('$ionicActionSheet', mockIonicActionSheet);
            });
            inject(function($q) {
                mockHttpService.getDatas = function() {
                    deferHttp = $q.defer();
                    return deferHttp.promise;
                }
                mockCameraService.getPicture = function(params) {
                    deferCamera = $q.defer();
                    return deferCamera.promise;
                }
                mockUploadService.uploadPicture = function(uploadUrl, imageURI) {
                    deferUpload = $q.defer();
                    return deferUpload.promise;
                }
                mockConfig.host = 'http://192.168.1.154:8083';
                mockIonicActionSheet.show = function() {
                    return true;
                }
            });
        });

        beforeEach(inject(function(_$rootScope_, $controller, _httpService_, _cameraService_, _uploadService_, _$state_, _config_, _$ionicActionSheet_) {
            $scope = _$rootScope_.$new();
            httpService = _httpService_;
            uploadService = _uploadService_;
            cameraService = _cameraService_;
            $state = _$state_;
            config = _config_;
            $ionicActionSheet = _$ionicActionSheet_;

            spyOn($ionicActionSheet, 'show');

            changeProfileCtrl = $controller('changeProfileCtrl', {
                $scope: $scope,
                httpService: httpService,
                uploadService: uploadService,
                cameraService: cameraService,
                $state: $state,
                config: config,
                $ionicActionSheet: $ionicActionSheet
            });
        }));

        it('changeProfileCtrl控制器被定义', function() {
            expect(changeProfileCtrl).toBeDefined();
        });

        it('editAvatar函数被定义', function() {
            expect(changeProfileCtrl.editAvatar).toBeDefined();
        });

        it('http请求后datas.avatar为空，显示默认头像', function() {
            var data = { status: true, data: {avatar: ''} };
            deferHttp.resolve(data);
            $scope.$digest();
            expect(changeProfileCtrl.user.avatar).toEqual('./images/default_avatar.png');
        });

        it('http请求后datas.avatar不为空，显示用户头像', function() {
            var data = { status: true, data: {avatar: 'a'} };
            deferHttp.resolve(data);
            $scope.$digest();
            expect(changeProfileCtrl.user.avatar).toEqual('http://192.168.1.154:8083/public/avatar/a');
        });

        it('editAvatar()点击后，调用$ionicActionSheet.show', function() {
            expect($ionicActionSheet.show).toBeDefined();
            changeProfileCtrl.editAvatar();
            expect($ionicActionSheet.show).toHaveBeenCalled();
        });
    });

});