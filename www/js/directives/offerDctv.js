define(["./module"],function(e){e.directive("listDetail",["httpService","$ionicLoading","messageService","$state",function(e,t,i,n){return{restrict:"AE",template:"",replace:!1,scope:!1,link:function(t,o,a){o.on("click",function(){var o=t.$parent.item.status,a=t.$parent.item.id;if(null===o){var c=t.$parent.item.offerNum;c>0?e.getData("./json/login.json",{id:a}).then(function(e){n.go("purchase.offer")}):i.show("暂时没有商家报价")}else e.getData("./json/login.json",{id:a}).then(function(e){n.go("purchase.logistics")})})}}}])});