
define(['./module'], function(services) {
	services.service('httpService', 
		['$q', '$http',　'$ionicLoading', 'messageService', '$state',
		function($q, $http, $ionicLoading, messageService, $state) {
		var token = '';
		if(window.localStorage.getItem('token') != null && window.localStorage.getItem('token') !== '') {
			token = window.localStorage.getItem('token');	
		}
		this.get = function(url, datas) {
			// 预加载
		    $ionicLoading.show({
		        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
		    });
		    var deferred = $q.defer();
		    $http({
		    	method: 'GET', 
			  　　url: url,
			    data: datas, 
			  　　headers: {'x-access-token': token}
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
            	} else {
            		messageService.show('服务器请求失败');
            	}
            });
	        return deferred.promise;
		};
		this.post = function(url, datas) {
			// 预加载
		    $ionicLoading.show({
		        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>'
		    });
			var deferred = $q.defer();
	        $http({
		    	method: 'POST', 
			  　　url: url,
			    data: datas, 
			  　　headers: {'x-access-token': token}
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
            	} else {
            		messageService.show('服务器请求失败');
            	}
            });
	        return deferred.promise;
		}
	}]);
});