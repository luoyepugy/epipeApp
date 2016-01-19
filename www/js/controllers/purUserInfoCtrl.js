
define(['./module'], function(controllers) {
	controllers.controller('purUserInfoCtrl',
		['$scope', 'httpService','$state',　'$ionicActionSheet', 'cameraService',
		function($scope, httpService, $state, $ionicActionSheet, cameraService){
			$scope.user = {};
			$scope.userIcon = true;
			$scope.userImg = false;
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
		    	cameraService.getPicture(0, '拍摄照片失败').then(function(imageURI) {
		    		uploadPhoto(imageURI);
		    	});
		    }
	        function uploadPhoto(imageURI) {
				var imageURI = 'http://pic.pptbz.com/pptpic/201204/2012041411433867_S.jpg';
	        	cameraService.uploadPicture(imageURI).then(function(data) {
		    		// $scope.user.avatar = './images/avatar.jpg';
		    		$scope.userIcon = false;
					$scope.userImg = true;
		    		$scope.user.avatar = 'http://pic.pptbz.com/pptpic/201204/2012041411433867_S.jpg';
		    	});
	        }
	        // 打开图库
	        function getPhotoLibrary() {
	        	cameraService.getPicture(1, '获取照片失败').then(function(imageURI) {
		    		uploadPicture(imageURI);
		    	});
		    }
			function uploadPicture(imageURI) {
				cameraService.uploadPicture(imageURI).then(function(data) {
					$scope.userIcon = false;
					$scope.userImg = true;
		    		$scope.user.avatar = imageURI;
		    	});
		    }
	}]);
});