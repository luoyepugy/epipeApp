define(["./module"],function(e){e.controller("purEditUserCtrl",["$scope","userService",function(e,r){e.user={};var n=r.get();for(var o in n)e.user[o]=n[o]}])});