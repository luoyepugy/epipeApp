(function() {
	'use strict';

define(['./publish.module'], function(publish) {
	publish.directive('ionicCity', ionicCity);

	/* @ngInject */
	function ionicCity($ionicModal, $timeout, $ionicScrollDelegate, cityService) {
		var directive = {
			restrict: 'E',
			scope: {},
			replace: true,
			template: '<input type="text" name="shipAddress" placeholder="{{placeholder}}" ng-model="$parent.shipAddress" value="{{$parent.shipAddress}}" readonly />',
			link: link
		};
        return directive;

		function link(scope, element, attrs) {
			var vm = scope;
				vm.user = {};
				vm.provinceHandle = "provinceHandle";
        		vm.cityHandle = "cityHandle";
        		vm.countryHandle = "countryHandle";
				vm.placeholder = attrs.placeholder || '地点';
				vm.okText = attrs.oktext || '完成';
				vm.barCssClass = attrs.barcssclass || "bar-dark";
				vm.cityData = cityService.cityList;
				vm.tag = attrs.tag || "-";

				vm.returnOk = returnOk;
				vm.getData = getData;

			var cityModel = null;

			// 点击确认按钮
			function returnOk(){
	            if(cityModel) { cityModel.hide(); }
	        };

	        // 获取数据
		    function getData(name) {
	        	var length, Handle,HandleChild;
	        	$timeout.cancel(vm.scrolling);	//取消之前的scrollTo.让位置一次性过渡到最新
		        $timeout.cancel(vm.dataing);	//取消之前的数据绑定.让数据一次性过渡到最新
		        switch(name)
		        {
		            case 'province':
		              	if (!vm.cityData) { return false; }
		             	var province = true; length=vm.cityData.length; Handle=vm.provinceHandle; HandleChild=vm.cityHandle;
		            	break;
		            case 'city':
		              	if (!vm.province.sub) { return false; }
		              	var city = true; length=vm.province.sub.length; Handle=vm.cityHandle; HandleChild=vm.countryHandle;
		            	break;
		            case 'country':
		              	if (!vm.city.sub) { return false; }
		              	var country = true; length=vm.city.sub.length; Handle=vm.countryHandle;
		            	break;
		        }
          		var top = $ionicScrollDelegate.$getByHandle(Handle).getScrollPosition().top;//当前滚动位置
	            var index = Math.round(top / 36);
	            //iOS bouncing超出头
	            if (index < 0 ) {
	            	index = 0;
	            } 	
	            //iOS 超出尾			
	            if (index > length-1 ) {
	            	index = length-1;
	            } 
	            if (top===index*36) {
	            	vm.dataing = $timeout(function() {
	            		if(province){
	            			vm.province = vm.cityData[index];
	            			vm.city = vm.province.sub[0];
	            			vm.country = {};
	            			if(vm.city && vm.city.sub) {
	            				vm.country = vm.city.sub[0];
	            			}
	            		}
	            		if(city) {
	            			vm.city = vm.province.sub[index];
	            			vm.country = {};
	            			if(vm.city && vm.city.sub) {
	            				vm.country = vm.city.sub[0];
	            			}
	            		} 
	            		if(country) {
	            			vm.country = vm.city.sub[index];
	            		}
	            		//数据同步
			        	if(vm.city.sub && vm.city.sub.length>0) {
			        		vm.$parent.shipAddress = vm.province.name + vm.tag + vm.city.name + vm.tag + vm.country.name;
			        	} else {
			        		vm.$parent.shipAddress = vm.province.name + vm.tag + vm.city.name;
			        	}
			        }, 150);
			    } else {
			    	vm.scrolling = $timeout(function() {
				    	$ionicScrollDelegate.$getByHandle(Handle).scrollTo(0, index*36, true);
				    }, 150);
			    }
	        };

	        // 元素点击事件
	        element.on("click", function() {
	            //零时处理 点击过之后直接显示不再创建
	            if (!attrs.checked) {
	              if(cityModel) { cityModel.remove(); }
	            } else {
	              if(cityModel) { cityModel.show(); }  
	              return;
	            }
	            attrs.checked = true;
	            // 显示模型
	            $ionicModal.fromTemplateUrl('./purchase-publish/publish-city.directive.html', {
	              scope: scope,
	              animation: 'slide-in-up',
	              backdropClickToClose: true
	            }).then(function(modal) {
	              cityModel = modal;
	              //初始化 先获取数据后展示
	              $timeout(function () {
	                vm.getData('province');
	                if(cityModel) { cityModel.show(); }
	              },100);
	            });
	        });

	        //销毁模型
	        scope.$on('$destroy', function() {
	          if(cityModel) { cityModel.remove(); }
	        });
	    };
	};
});

})();