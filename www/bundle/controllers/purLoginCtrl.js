define(["./module"],function(e){e.controller("purLoginCtrl",["$scope","validateService","httpService","messageService","$state","userService",function(e,t,n,r,i,s){e.submit=function(){var e,u;if(e=t.isEmpty(".j-form .j-input"),1!==e)return r.show(e),!1;u=t.submitData(".j-form");var a=n.getData("./json/login.json",u);a.then(function(e){r.show("登录成功"),console.log(e),s.user=e.user,i.go("purchase.publish")},function(e){r.show(e)})}}])});