define(["./module"],function(e){e.controller("purLoginCtrl",["$scope","validateService","httpService","messageService","$state",function(e,t,i,o,n){e.submit=function(){e.user={};var s,r,u=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;if(s=t.isEmpty(".j-form .j-input"),1!==s)return o.show(s),!1;if(u.test(e.user.email)){r=t.submitData(".j-form");var a=i.getData("./json/login.json",r);a.then(function(e){o.show("登录成功"),n.go("purchase.publish")},function(e){o.show(e)})}else o.show("请输入正确的邮箱格式")}}])});