define(["./module"],function(e){e.controller("purRegisterCtrl",["$scope","validateService","httpService","messageService","$state",function(e,t,n,r,i){e.submit=function(){var e,s;if(e=t.isEmpty(".j-form .j-input"),1!==e)return r.show(e),!1;if(s=t.submitData(".j-form"),s.password!==s.confirmPwd)r.show("两次密码输入不一致");else{var u=n.getData("./json/login.json",s);u.then(function(e){r.show("注册成功"),i.go("purchase-login")},function(e){r.show(e)})}}}])});