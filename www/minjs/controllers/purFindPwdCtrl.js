define(["./module"],function(e){e.controller("purFindPwdCtrl",["$scope","httpService","validateService","$state",function(e,t,o,r){var n="/user/checkPhoneToken/";e.user={},e.submit=function(){var u=o.isEmpty(".j-forgetPwd");if(u){var c=o.submitData(".j-forgetPwd");c&&t.getDatas("GET",n+e.user.phone+"/"+e.user.code).then(function(t){r.go("purchase-resetPwd",{phone:e.user.phone,code:e.user.code})})}}}])});