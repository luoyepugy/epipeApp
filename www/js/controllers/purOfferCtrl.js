define(["./module"],function(e){e.controller("purOfferCtrl",["$scope","$ionicLoading","httpService","messageService","$state",function(e,n,o,t,c){var r="./json/purchase-offer.json",f=o.getData(r);f.then(function(n){var o=n.data;e.product=o.product,e.list=o.offer}),e.order=function(){for(var e,n=document.getElementsByName("choiceOffer"),r=0;r<n.length;r++)n[r].checked&&(e=n[r].value);null!==e&&void 0!==e&&o.getData("./json/login.json",{choiceId:e}).then(function(e){c.go("purchase.order")},function(e){t.show(e)})},e.changeOffer=function(){o.getData("./json/purchase-offerChange.json").then(function(n){var o=n.data;e.list=o.offer},function(e){t.show(e)})}}])});