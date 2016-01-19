
define(['./module', 'cordova'], function(services) {
	services.factory('cameraService', 
	['$q', '$ionicPopup', '$cordovaFileTransfer', '$cordovaCamera', '$ionicLoading',
	function($q, $ionicPopup, $cordovaFileTransfer, $cordovaCamera, $ionicLoading) {
		var camera = {};

		camera.getPicture = function(options, errorMessage) {
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
		    }, function(err) {
		    	$ionicPopup.alert({
			       title: '提示',
			       template: errorMessage,
			       okText: '确定',
			       okType: 'button-energized'
			    });
		    });
            return deferred.promise;
		};

		camera.uploadPicture = function(imageURI) {
			var options = {
			    fileKey: "file",
			    fileName: imageURI.substr(imageURI.lastIndexOf('/') + 1),
			    chunkedMode: false,
			    mimeType: "image/jpg",
			 	params : {'directory':'upload', 'fileName':imageURI.substr(imageURI.lastIndexOf('/') + 1)}
			};
			var deferred = $q.defer();
			$cordovaFileTransfer.upload('http://www.baidu.com', imageURI, options)
			    .then(function(response) {
			        deferred.resolve(response);
			    }, function(error) {
			        $ionicPopup.alert({
				       title: '提示',
				       template: JSON.stringify(error),
				       okText: '确定',
				       okType: 'button-energized'
				    });
			    }, function (progress) {
					var downloadProgress = (progress.loaded / progress.total) * 100;  
                    $ionicLoading.show({  
                        template: "已经上传：" + Math.floor(downloadProgress) + "%"  
                    });  
                    if (downloadProgress > 99) {  
                        $ionicLoading.hide();  
                    }
			    });

			return deferred.promise;
		};
		return camera;
	}]);
});