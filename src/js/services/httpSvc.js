
define(['./module'], function(services) {
	services.service('httpService', ['$q', '$http',　'$ionicLoading', function($q, $http, $ionicLoading) {
		this.getData = function(url, datas) {
			// 预加载
		    $ionicLoading.show({
		        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
		    });
			var deferred = $q.defer();
	        // $http.post(url, datas)
	        $http.get(url, {params: datas})	// 此处应用post请求，get请求测试
	        	.success(function(response) {
	        		$ionicLoading.hide();
	                if(response.success === true) {
	                	deferred.resolve(response);
					} else {
						deferred.reject(response.message);
					}
	            })
	            .error(function(data){
	            	$ionicLoading.hide();
	            	deferred.reject('服务器请求失败');
	            });
	        return deferred.promise;
		};
	}]);
});