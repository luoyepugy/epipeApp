
define(['app', 'cordova'], function(app) {
	return app.config(
		['$ionicConfigProvider', 
		function($ionicConfigProvider) {
	  		$ionicConfigProvider.tabs.position("bottom");
	  	}])
	  	.run(['$ionicPlatform', '$ionicPopup', '$location', '$ionicHistory',
	  		function($ionicPlatform, $ionicPopup, $location, $ionicHistory) {
	  		//主页面显示退出提示框  
	        $ionicPlatform.registerBackButtonAction(function (e) {  
	  			
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
	                        // Don't close  
	                    }  
	                });  
	            }  
	  
	            // Is there a page to go back to?  
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
			    //启动极光推送服务 
				// window.plugins.jPushPlugin.init(); 
				//调试模式 
				// window.plugins.jPushPlugin.setDebugMode(true);
			
				window.onerror = function(msg, url, line) {  
				   	var idx = url.lastIndexOf("/");  
				   	if(idx > -1) {  
				    	url = url.substring(idx+1);  
				   	}  
				   	console.log("ERROR in " + url + " (line #" + line + "): " + msg);  
				   	return false;  
				};
			});
		}]);
});