define(["./module"],function(t){t.controller("purListCtrl",["$scope","httpService","messageService","$state",function(t,e,s,a){var i=0,r=0,o="./json/purchase-list.json";t.hasMore=!0,t.list=[];var n=e.getData(o);n.then(function(e){var s=e.data.items;t.list=s}),t.doRefresh=function(){t.list.length;r=t.list[0].id;var a=e.getData(o,{status:"refresh",id:r});a.then(function(e){var a=e.data.items;a>0?t.list.unshift(a):s.show("没有更多新的数据"),t.$broadcast("scroll.refreshComplete")})},t.loadMore=function(){var s=t.list.length;i=t.list[s-1].id;var a=e.getData(o,{status:"loadmore",id:i});a.then(function(e){for(var s=e.data.items,a=0;a<s.length;a++)t.list.push(s[a]);0===e.length&&(t.hasMore=!1),t.$broadcast("scroll.infiniteScrollComplete")})}}])});