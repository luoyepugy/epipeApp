
define(['./user.module'], function(user) {
	user.controller('changeProfileCtrl', changeProfileCtrl);

	/* @ngInject */
	function changeProfileCtrl($scope, httpService, $state, $ionicActionSheet, cameraService, config){
			$scope.user = {};
			// 头像保存地址
			var avatarUrl = config.host + '/public/avatar/';
			// 上传头像地址
			var uploadImage = config.host + '/upload/image';

			// 首次加载
			httpService.getDatas('GET','/user/getProfile')
			.then(function(data) {
				var datas = data.data;
				$scope.user = datas;
				// 无头像时使用默认头像
				if(datas.avatar === '' || datas.avatar == null) {
					$scope.user.avatar = './images/default_avatar.png';
				} else {
					$scope.user.avatar = avatarUrl + datas.avatar;
				}
			});

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
				cameraService.uploadPicture(uploadImage, imageURI).then(function(data) {
					// 上传成功后修改userProfile，增加字段avatar
		   //  		httpService.getDatas('POST','/user/changeProfile', {'avatar': data.fileName})
					// .then(function(result) {
						$scope.user.avatar = avatarUrl + data.fileName;
						$scope.user.avatarFileName = data.fileName;
					// });
					// messageService.show('上传成功');
		    	}, function(data) {
		    		messageService.show('上传失败');
		    		$scope.user.avatar = './images/default_avatar.png';
		    	});
		    }
	};
});