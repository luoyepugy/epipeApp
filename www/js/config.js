
define(['./app', 'cordova'], function(app) {
	return app.config(
		['$ionicConfigProvider', '$compileProvider',  
		function($ionicConfigProvider, $compileProvider) {
	  		$ionicConfigProvider.tabs.position("bottom");
	  	}])
	  	.run(['$ionicPlatform','$cordovaDevice', '$cordovaNetwork',
	  		function($ionicPlatform, $cordovaDevice, $cordovaNetwork) {

	  		document.addEventListener("deviceready", function () {
	  			// 键盘
	  			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			    // for form inputs)
	  			if(window.cordova &&　window.cordova.plugins　&& window.cordova.plugins.Keyboard) {
			      　　cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  					cordova.plugins.Keyboard.disableScroll(true);
			    }
			    // 设备平台判断
				window.localStorage.device = $cordovaDevice.getPlatform();
				console.log($cordovaDevice.getPlatform());
				var offline = $cordovaNetwork.isOffline();
				console.log(offline);
			}, false);
			
			$ionicPlatform.ready(function() {				    
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