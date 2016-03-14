
define(['./app', 'cordova'], function(app) {
	return app.config(
		['$ionicConfigProvider', '$compileProvider', 
		function($ionicConfigProvider, $compileProvider) {
	  		$ionicConfigProvider.tabs.position("bottom");
	  	}])
	  	.run(['$ionicPlatform',
	  	function($ionicPlatform) {

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