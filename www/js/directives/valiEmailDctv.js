define(["./module"],function(e){e.directive("validateEmail",["messageService",function(e){return{restrict:"AE",scope:{},link:function(i,n,t){n.bind("blur",function(){var n=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;n.test(t.value)?i.$parent.valid=!0:(e.show("请输入正确的邮箱格式"),i.$parent.valid=!1)})}}}])});