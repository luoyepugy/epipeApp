define(["./module"],function(i){i.controller("purLogisticsCtrl",["$scope","$ionicLoading","httpService",function(i,o,n){var t="./json/purchase-logistics.json";i.hasMore=!0,o.show({template:"<ion-spinner></ion-spinner><h3>加载中...</h3>",duration:3e3});var e=n.getData(t);e.then(function(n){var t=n.data;o.hide(),i.product=t.product,i.list=t.logistics})}])});