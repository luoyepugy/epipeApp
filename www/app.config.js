(function() {
    'use strict';

define(['app', 'cordova'], function(app) {
    return app.config(config).run(runApp);

    /* @ngInject */
    function config($ionicConfigProvider, $ionicAppProvider) {
        $ionicConfigProvider.tabs.position("bottom");

        // Identify app
        $ionicAppProvider.identify({
            // Your App ID
            app_id: '24e596f',
            // The public API key services will use for this app
            api_key: '',
            domain: 'http://192.168.1.154:8100',
            channel_tag: 'production'
        });
      };

      /* @ngInject */
    function runApp($ionicPlatform, $ionicPopup, $location, $ionicHistory, updateAppService, $cordovaAppVersion) {

        document.addEventListener("deviceready", function () {
            // 检查版本更新
            updateAppService.checkUpdate();
        }, false);

        //主页面显示退出提示框  
        $ionicPlatform.registerBackButtonAction(function (e) {  
             // 是否退出应用提示弹窗
            function showConfirm() {  
                var confirmPopup = $ionicPopup.confirm({  
                    title: '<strong>退出应用?</strong>',  
                    template: '你确定要退出应用吗?',  
                    okText: '退出',
                    okType: 'button-energized',  
                    cancelText: '取消'  
                });  
                confirmPopup.then(function (res) {  
                    if (res) {  
                        ionic.Platform.exitApp();  
                    } else {  
                        // 不退出应用  
                    }  
                });  
            }; 
  
            // android返回按键判断处理
            if ($location.path() == '/purchase/publish'　|| $location.path() == '/purchase/userInfo' || $location.path() == '/purchase/list') {  
                showConfirm();  
            } else if($ionicHistory.backView()) {  
                $ionicHistory.goBack(); 
            } else {
                showConfirm();
            }  
            e.preventDefault();
            return false; 

        }, 101);  

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            // 错误提示        
            window.onerror = function(msg, url, line) {  
                   var idx = url.lastIndexOf("/");  
                   if(idx > -1) {  
                    url = url.substring(idx+1);  
                   }  
                   console.log("ERROR in " + url + " (line #" + line + "): " + msg);  
                   return false;  
            };
        });
    };
});

})();