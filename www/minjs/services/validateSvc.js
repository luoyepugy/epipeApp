!function(){"use strict";define(["./module","zepto"],function(n,t){function o(n){function o(o){var i=0,e=t(o).find(".j-input").length,r="";return t(o).find(".j-input").each(function(){var o=(t(this).attr("name"),t.trim(t(this).val()));return""===o||void 0===o||null===o?(r=t(this).data("empty"),n.show(r),!1):void i++}),i===e?!0:void 0}function i(o){var i={},e=/^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;return t(o).find("input[name],textarea[name],select[name]").each(function(){var n=t(this).attr("name"),o=t.trim(t(this).val());i[n]=o}),null!=i.company&&""!=i.company&&(i.userProfile={company:i.company}),null!==i.phone&&void 0!==i.phone&&e.test(i.phone)===!1?(n.show("请输入正确的手机号码格式"),!1):null!==i.confirmPwd&&void 0!==i.confirmPwd&&i.confirmPwd!==i.password?(n.show("两次密码输入不一致"),!1):null!==i.productAmount&&void 0!==i.productAmount&&isNaN(i.productAmount)===!0||Number(i.productAmount)<=0?(n.show("请输入正确的商品数量格式"),!1):i}var e={isEmpty:o,submitData:i};return e}o.$inject=["messageService"],n.factory("validateService",o)})}();