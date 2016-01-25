
define(['./process.module'], function(process) {
	process.controller('orderCtrl',orderCtrl);
	
	/* @ngInject */
	function orderCtrl($scope, httpService, $stateParams){
		var vm = $scope;

		var baseUrl = '/order/getByOrderName/',	// 获取订单信息服务器地址
			id =  $stateParams.id;				// 订单id

	    // 初步加载
	    load();

	    function load() {
		    httpService.getDatas('GET',baseUrl + id)
		    .then(function(data) {
		    	var datas = data.data;
		    	vm.product = datas;
		    	vm.purchase = datas.purchaser;
		    	vm.supplier = datas.supplier;
		    });
		};

	};
});