define(["./module"],function(t){t.controller("purListCtrl",["$scope","$ionicLoading","httpService","messageService","$state",function(t,e,i,n,o){var s=0,a="./json/purchase-list.json";t.hasMore=!0,e.show({template:"<ion-spinner></ion-spinner><h3>加载中...</h3>",duration:3e3});var r=i.getData(a);r.then(function(i){var n=i.data.items;e.hide(),t.list=n}),t.doRefresh=function(){var n=i.getData(a,{status:"refresh"});n.then(function(i){var n=i.data.items;e.hide(),t.list=n,t.$broadcast("scroll.refreshComplete")})},t.loadMore=function(){var e=i.getData(a,{status:"loadmore",id:s});e.then(function(e){for(var i=e.data.items,n=0;n<i.length;n++)t.list.push(i[n]);0===e.length&&(t.hasMore=!1),t.$broadcast("scroll.infiniteScrollComplete")})},t.listDetail=function(){var t=this.item.status,s=this.item.id;if(null===t){var a=this.item.offerNum;a>0?(e.show({template:"<ion-spinner></ion-spinner><h3>加载中...</h3>",duration:3e3}),i.getData("./json/login.json",{id:s}).then(function(t){e.hide(),o.go("purchase.offer")})):n.show("暂时没有商家报价")}else e.show({template:"<ion-spinner></ion-spinner><h3>加载中...</h3>",duration:3e3}),i.getData("./json/login.json",{id:s}).then(function(t){e.hide(),o.go("purchase.logistics")})}}])});