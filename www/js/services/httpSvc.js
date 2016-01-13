
define(['./module'], function(services) {
	services.service('httpService', ['$q', '$http',　'$ionicLoading', 'messageService', function($q, $http, $ionicLoading, messageService) {
		this.get = function(url, datas) {
			// 预加载
		    $ionicLoading.show({
		        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
		    });
			var deferred = $q.defer();
	        $http.get(url, {params: datas})	
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
	            .error(function(data){
	            	$ionicLoading.hide();
	            	messageService.show('服务器请求失败');
	            	// deferred.reject('服务器请求失败');
	            });
	        return deferred.promise;
		};
		this.post = function(url, datas) {
			// 预加载
		    $ionicLoading.show({
		        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
		    });
			var deferred = $q.defer();
	        $http.post(url, datas)	
	        	.success(function(response) {
	        		$ionicLoading.hide();
	                if(response.status === true) {
	                	deferred.resolve(response);
					} else {
						// deferred.reject(response.message);
						messageService.show(response.errMsg);
					}
	            })
	            .error(function(data){
	            	$ionicLoading.hide();
	            	messageService.show('服务器请求失败');
	            	// deferred.reject('服务器请求失败');
	            });
	        return deferred.promise;
		}
	}]);
});