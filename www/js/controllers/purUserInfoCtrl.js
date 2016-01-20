
define(['./module'], function(controllers) {
	controllers.controller('purUserInfoCtrl',
		['$scope', 'httpService','$state',　'$ionicActionSheet', 'cameraService', 'config',
		function($scope, httpService, $state, $ionicActionSheet, cameraService, config){
			$scope.user = {};
			// 无头像时使用默认头像
			if($scope.user.avatar === '' || $scope.user.avatar == null) {
				$scope.user.avatar = './images/default_avatar.png';
			}
			// 首次加载
			httpService.getDatas('GET','/user/getProfile')
			.then(function(data) {
				$scope.user = data.data;
			});

			$scope.exit =function() {
				window.localStorage.clear();
            	$state.go('purchase-login');
			}

			// 更改头像操作表
			$scope.editAvatar = function() {
		        $ionicActionSheet.show({
		            titleText: '',
		            buttons: [{
		                text: '拍照'
		            }, {
		                text: '从相册选择'
		            }],
		            cancelText: '取消',
		            cancel: function() {
		                return true;
		            },
		            buttonClicked: function(index) {
		            	if(index === 0) {
		            		document.addEventListener("deviceready", getCamera, false);
		            	} else if (index === 1) {
		            		document.addEventListener("deviceready", getPhotoLibrary, false);
		            	}
		                return true;
		            }
		        });
		    };
		    // 打开照相机
		    function getCamera() {
		    	cameraService.getPicture(0).then(function(imageURI) {
		    		uploadPicture(imageURI);
		    	}, function(data) {
		    		messageService.show('拍摄照片失败');
		    	});
		    }
	        // 打开图库
	        function getPhotoLibrary() {
	        	cameraService.getPicture(1).then(function(imageURI) {
		    		uploadPicture(imageURI);
		    	}, function(data) {
		    		messageService.show('获取照片失败');
		    	});
		    }
		    // 上传图片
			function uploadPicture(imageURI) {
				var host = config.host,
					url = host + '/upload/image';
				cameraService.uploadPicture(url, imageURI).then(function(data) {
		    		$scope.user.avatar = host + '/public/avatar/' + data.fileName;
		    		// alert($scope.user.avatar);
		    	}, function(data) {
		    		messageService.show('上传失败');
		    		$scope.user.avatar = './images/default_avatar.png';
		    	});
		    }
	}]);
});