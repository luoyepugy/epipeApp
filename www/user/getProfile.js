
define(['./user.module'], function(user) {
	user.controller('getProfileCtrl', getProfileCtrl);

	/* @ngInject */
	function getProfileCtrl($scope, httpService, $state, config){
			$scope.user = {};
			// 头像保存地址
			var avatarUrl = config.host + '/public/avatar/';

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

			// 退出当前账号
			$scope.exit =function() {
				window.localStorage.clear();
            	$state.go('login');
			}

	};
});