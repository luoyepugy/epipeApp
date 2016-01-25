(function() {
    'use strict';

define(['./services.module'], function(services) {
    services.factory('uploadService', uploadService);

    /* @ngInject */
    function uploadService($q, $cordovaFileTransfer, $ionicLoading, $timeout) {

    	var upload = {
			'uploadPicture': uploadPicture
		};
		return upload;

    	function uploadPicture(uploadUrl, imageURI) {
			var deferred = $q.defer(),
				token = '',
				options = {
				    fileKey: "file",
				    fileName: imageURI.substr(imageURI.lastIndexOf('/') + 1),
				    chunkedMode: false,
				    mimeType: "image/jpg",
				 	params : {'directory':'upload', 'fileName':imageURI.substr(imageURI.lastIndexOf('/') + 1), 'gallery': 'avatar'},
				 	headers: {'x-app-version': '0.0.1', 'x-access-token': token}
				};

			if(window.localStorage.getItem('token') != null && window.localStorage.getItem('token') !== '') {
				token = window.localStorage.getItem('token');	
			}

			$cordovaFileTransfer.upload(uploadUrl, imageURI, options)
			    .then(function(response) {
			    	var result = JSON.parse(response.response);
			    	if(result.status) {
			    		deferred.resolve(result.data);
			    	}
			    }, function(error) {
				    deferred.reject(error);
			    }, function (progress) {
					var downloadProgress = (progress.loaded / progress.total) * 100;  
		            $ionicLoading.show({  
		                template: "已经上传：" + Math.floor(downloadProgress) + "%"  
		            });  
		            if (downloadProgress > 98) {  
		                $ionicLoading.hide();  
		            } else {
		            	$timeout(function() {
		            		$ionicLoading.hide(); 
		            	}, 15000);
		            }
			    });

			return deferred.promise;
		};
    };
	

});

})();