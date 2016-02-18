(function() {
    'use strict';

define(['./services.module'], function(services) {
    services.factory('updateAppService', updateAppService);

    /* @ngInject */
    function updateAppService($ionicPopup, $ionicDeploy, $timeout, $ionicLoading) {

        return {
            'checkUpdate': checkUpdate
        }
        /**
         * 检查更新
         */
        function checkUpdate() {
            $ionicDeploy.check().then(function(result) {
                if (result.available == 'true') {
                    showUpdateConfirm(result);
                }
            }, function(err) {
                $ionicLoading.show({
                    template: '更新失败,请检查您的网络配置!' + err,
                    animation: 'fade-in',
                    showBackdrop: true,
                    duration: 2000,
                    showDelay: 0
                });
            });
        }

        function showUpdateConfirm(checkResult) {
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.confirm({
                title: '版本升级',
                template: "有新的版本了,是否要升级?",
                okType: 'button-energized',
                cancelText: '取消',
                okText: '升级'
            });
            confirmPopup.then(function(res) {
                //兼容更新
                if (checkResult.available == 'true' && checkResult.compatible == 'true') {
                    $ionicLoading.show({
                        template: '正在更新...',
                        animation: 'fade-in',
                        showBackdrop: true,
                        //duration: 2000,
                        showDelay: 0
                    });

                    if (res) {
                        $ionicDeploy.update().then(function(res) {
                            $ionicLoading.hide();
                            $ionicLoading.show({
                                template: '更新成功!',
                                animation: 'fade-in',
                                showBackdrop: true,
                                duration: 2000,
                                showDelay: 0
                            });
                        }, function(err) {
                            $ionicLoading.hide();
                            $ionicLoading.show({
                                template: '更新失败!' + err,
                                animation: 'fade-in',
                                showBackdrop: true,
                                duration: 2000,
                                showDelay: 0
                            });
                        }, function(prog) {
                            $ionicLoading.show({
                                template: "已经下载：" + prog + "%"
                            });
                            if (downloadProgress > 98) {
                                $ionicLoading.hide();
                            }
                        });
                    } else {
                        $ionicLoading.hide();
                    }
                }
                //非兼容更新
                else if (checkResult.available == 'true' && checkResult.compatible != 'true') {
                    $ionicLoading.show({
                        template: '请前往' + checkResult.update.url + '更新您的app',
                        animation: 'fade-in',
                        showBackdrop: true,
                        duration: 10000,
                        showDelay: 0
                    });
                }


            });
        };

    }
        
});

})();