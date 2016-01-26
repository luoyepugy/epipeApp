(function() {
    'use strict';

define(['./services.module','cordova'], function(services) {
    services.factory('httpService', httpService);

    /* @ngInject */
    function httpService($q, $http, $ionicLoading, messageService, $state, $location, $window,
        $cordovaInAppBrowser, $ionicPopup, config, $cordovaNetwork, $rootScope) {

        return {
            'getDatas': getDatas
        };
    
        function getDatas(method, url, datas) {
            var deferred = $q.defer(),
                // 主机名称，从配置中获取值
                host = config.host,
                // cordovaInAppBrowser的选项变量
                options = {
                  location: 'yes',
                  clearcache: 'yes',
                  toolbar: 'yes'
                },
                // header上的token
                token = '';

            // 从localStorage中取出token
            if($window.localStorage.getItem('token') != null && $window.localStorage.getItem('token') !== '') {
                token = $window.localStorage.getItem('token');
            }

            // 预加载
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
                duration: 3000
            });
            // http请求
            $http({
                method: method, 
              　　url: host + url,
                data: datas, 
              　　headers: {'x-app-version': '0.0.1', 'x-access-token': token}
            })
            .success(function(response) {
                $ionicLoading.hide();
                if(response.status) {
                    deferred.resolve(response);
                } else {
                    if(response.errMsg != null && response.errMsg !== '') {
                        messageService.show(response.errMsg);
                    }
                }
            })
            .error(function(data, status){
                $ionicLoading.hide();
                if(status === 401) {
                    $state.go('purchase-login');
                } else if (status === 403) {
                    // ios／android平台判断
                    if(ionic.Platform.isIOS()) {
                        updatePopup(data.app_ios_path);
                    } else if(ionic.Platform.isAndroid()) {
                        updatePopup(data.app_andriod_path);
                    }
                } else {
                    messageService.show('服务器请求失败');
                }
            });
            return deferred.promise;

            // 403错误时弹窗更新提示
            function updatePopup(path) {
                var updateAlert = $ionicPopup.alert({
                     title: '<strong>更新<strong>',
                     template: '下载可用的更新',
                     okText: '立即更新',
                     okType: 'button-energized'
                });
                updateAlert.then(function(res) {
                    $cordovaInAppBrowser.open(path, '_system', options)
                    .then(function(event) {
                        // messageService.show('下载可用的更新');
                    })
                    .catch(function(event) {
                        messageService.show('服务器请求失败');
                    });
                });
            };
        };      

    // this.get = function(method, url, datas) {
    //     var deferred = $q.defer();
    //     // http请求
    //     $http({
    //         method: method, 
    //       　　url: url,
    //         data: datas
    //     })
    //     .success(function(response) {
//               if(response.success === true) {
//                   deferred.resolve(response);
    //         }
//           })
//           .error(function(data, status){
//               messageService.show('服务器请求失败');
//           });
//           return deferred.promise;
    // }

    }
    
});

})();