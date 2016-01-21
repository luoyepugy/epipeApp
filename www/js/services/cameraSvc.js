
define(['./module', 'cordova'], function(services) {
	services.factory('cameraService', 
	['$q', '$ionicPopup', '$cordovaFileTransfer', '$cordovaCamera', '$ionicLoading', '$timeout',
	function($q, $ionicPopup, $cordovaFileTransfer, $cordovaCamera, $ionicLoading, $timeout) {
		var camera = {};

		camera.getPicture = function(options) {
			var deferred = $q.defer();
			if(options === 0) {
				options = {
					destinationType: Camera.DestinationType.FILE_URI,
      				sourceType: Camera.PictureSourceType.CAMERA
				};
			} else if (options === 1) {
				options = {
					destinationType: Camera.DestinationType.FILE_URI,
      				sourceType: Camera.PictureSourceType.PHOTOLIBRARY
				};
			}
			$cordovaCamera.getPicture(options).then(function(imageURI) {
		      	deferred.resolve(imageURI);
		    }, function(error) {
				deferred.reject(error);
		    });
            return deferred.promise;
		};

		camera.uploadPicture = function(uploadUrl, imageURI) {
			if(window.localStorage.getItem('token') != null && window.localStorage.getItem('token') !== '') {
				var token = window.localStorage.getItem('token') || '';	
			}
			var options = {
			    fileKey: "file",
			    fileName: imageURI.substr(imageURI.lastIndexOf('/') + 1),
			    chunkedMode: false,
			    mimeType: "image/jpg",
			 	params : {'directory':'upload', 'fileName':imageURI.substr(imageURI.lastIndexOf('/') + 1), 'gallery': 'avatar'},
			 	headers: {'x-app-version': '0.0.1', 'x-access-token': token}
			};

			var deferred = $q.defer();
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
		return camera;
	}]);
});