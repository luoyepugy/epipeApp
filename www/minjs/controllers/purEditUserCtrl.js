define(["./module"],function(e){e.controller("purEditUserCtrl",["$scope","httpService","$state","$ionicActionSheet","cameraService","config",function(e,t,a,n,r,i){function u(){r.getPicture(0).then(function(e){o(e)},function(e){messageService.show("拍摄照片失败")})}function c(){r.getPicture(1).then(function(e){o(e)},function(e){messageService.show("获取照片失败")})}function o(t){r.uploadPicture(v,t).then(function(t){e.user.avatar=s+t.fileName,e.user.avatarFileName=t.fileName},function(t){messageService.show("上传失败"),e.user.avatar="./images/default_avatar.png"})}e.user={};var s=i.host+"/public/avatar/",v=i.host+"/upload/image";t.getDatas("GET","/user/getProfile").then(function(t){var a=t.data;e.user=a,""===a.avatar||null==a.avatar?e.user.avatar="./images/default_avatar.png":e.user.avatar=s+a.avatar}),e.editAvatar=function(){n.show({titleText:"",buttons:[{text:"拍照"},{text:"从相册选择"}],cancelText:"取消",cancel:function(){return!0},buttonClicked:function(e){return 0===e?document.addEventListener("deviceready",u,!1):1===e&&document.addEventListener("deviceready",c,!1),!0}})}}])});