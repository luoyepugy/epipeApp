define(["./module"],function(e){e.controller("purOrderCtrl",["$scope","$ionicLoading","httpService","messageService",function(e,r,o,c){var n="./json/purchase-order.json",t=o.getData(n);t.then(function(r){var o=r.data;e.product=o.product,e.offer=o.offer,e.purchase=o.purchase})}])});