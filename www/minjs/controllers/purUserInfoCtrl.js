define(["./module"],function(e){e.controller("purUserInfoCtrl",["$scope","httpService","$state","$ionicActionSheet","cameraService","config",function(e,t,a,n,r,i){function c(){r.getPicture(0).then(function(e){u(e)},function(e){messageService.show("拍摄照片失败")})}function o(){r.getPicture(1).then(function(e){u(e)},function(e){messageService.show("获取照片失败")})}function u(a){var n=i.upload+"/image";r.uploadPicture(n,a).then(function(a){t.getDatas("POST","/user/changeProfile",{avatar:a.fileName}).then(function(t){e.user.avatar=i.avatar+a.fileName})},function(t){messageService.show("上传失败"),e.user.avatar="./images/default_avatar.png"})}e.user={},t.getDatas("GET","/user/getProfile").then(function(t){var a=t.data;e.user=a,""===a.avatar||null==a.avatar?e.user.avatar="./images/default_avatar.png":e.user.avatar=i.avatar+t.data.avatar}),e.exit=function(){window.localStorage.clear(),a.go("purchase-login")},e.editAvatar=function(){n.show({titleText:"",buttons:[{text:"拍照"},{text:"从相册选择"}],cancelText:"取消",cancel:function(){return!0},buttonClicked:function(e){return 0===e?document.addEventListener("deviceready",c,!1):1===e&&document.addEventListener("deviceready",o,!1),!0}})}}])});