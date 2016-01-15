
define(['./module','cordova'], function(services) {
	services.service('httpService', 
		['$q', '$http',　'$ionicLoading', 'messageService', '$state', '$location', '$cordovaDevice', '$cordovaInAppBrowser', '$ionicPopup', 'config',
		function($q, $http, $ionicLoading, messageService, $state, $location, $cordovaDevice, $cordovaInAppBrowser, $ionicPopup, config) {
		// header上的token
		var token = '';
		if(window.localStorage.getItem('token') != null && window.localStorage.getItem('token') !== '') {
			token = window.localStorage.getItem('token');	
		}
		var device = '';
		document.addEventListener("deviceready", function () {
			window.localStorage.device = $cordovaDevice.getPlatform();
		}, false);

		device = window.localStorage.getItem('device');
		this.getDatas = function(method, url, datas) {
			var host = config.host;
			// 预加载
		    $ionicLoading.show({
		        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
		    });
		    var deferred = $q.defer();
		    var options = {
		      location: 'yes',
		      clearcache: 'yes',
		      toolbar: 'no'
		    };

		    $http({
		    	method: method, 
			  　　url: host + url,
			    data: datas, 
			  　　headers: {'x-app-version': '0.0.1', 'x-access-token': token}
		    })
		    .success(function(response) {
        		$ionicLoading.hide();
                if(response.status === true) {
                	deferred.resolve(response);
				} else {
					// deferred.reject(response.message);
					if(response.errMsg != null && response.errMsg !== '') {
						messageService.show(response.errMsg);
					}
				}
            })
            .error(function(data, status){
            	$ionicLoading.hide();
            	if(status === 401) {
            		$state.go('purchase-login');
            	} else if (status === 403 && device === 'iOS') {
            		$ionicPopup.alert({
					     title: '更新',
					     template: '下载可用的更新',
					     okType: 'button-energized'
					    })
            			.then(function(res) {
					    	$cordovaInAppBrowser.open(data.app_ios_path, '_system', options)
						    .then(function(event) {
						        messageService.show('下载可用的更新');
						    })
						    .catch(function(event) {
						        messageService.show('服务器请求失败');
						    });
						});
            	} else if (status === 403 && device === 'Android') {
            		$ionicPopup.alert({
					     title: '更新',
					     template: '下载可用的更新',
					     okType: 'button-energized'
					    })
            			.then(function(res) {
            				$cordovaInAppBrowser.open(data.app_andriod_path, '_system', options)
						    .then(function(event) {
						        messageService.show('下载可用的更新');
						    })
						    .catch(function(event) {
						        messageService.show('服务器请求失败');
						    });
            			});
            	} else {
            		messageService.show('服务器请求失败');
            	}
            });
	        return deferred.promise;
		};
	}]);
});