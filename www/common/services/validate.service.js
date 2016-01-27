(function() {
    'use strict';

define(['../common.module', 'zepto'], function(common, $) {
    common.factory('validateService', validateService);

    /* @ngInject */
    function validateService(messageService) {

        var validate = {
            'isEmpty': isEmpty,
            'submitData': submitData
        };
        return validate;

        // 验证输入框是否为空
        function isEmpty(form) {
            var inputs = {},
                num = 0,
                total = $(form).find('.j-input').length,
                results = '';
            $(form).find('.j-input').each(function() {
                var key = $(this).attr('name');
                var val = $.trim($(this).val());
                if(val == '' || val == null) {
                    results = $(this).data('empty');
                    messageService.show(results);
                    return false;
                } else {
                    num++;
                }
            });
            if(num === total) {
                return true;
            }
        };

        // 验证提交表单验证
        function submitData(form) {
            var datas = {},
                phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
            $(form).find('input[name],textarea[name],select[name]').each(function() {
                var key = $(this).attr('name');
                var val = $.trim($(this).val());
                datas[key] = val;
            });
            // 个人简介数据使用对象值
            if(datas.company != null && datas.company != '') {
                datas.userProfile = {'company': datas.company };
            }
            // 判断表单填入数据格式
            if (datas.phone != null && phone_regexp.test(datas.phone) === false) {
                messageService.show('请输入正确的手机号码格式');
                return false;
            } else if (datas.confirmPwd != null &&　datas.confirmPwd !== datas.password) {
                messageService.show('两次密码输入不一致');
                return false;
            } else if (datas.productAmount != null && isNaN(datas.productAmount) === true ||　Number(datas.productAmount) <= 0) {
                messageService.show('请输入正确的商品数量格式');
                return false;
            } else {
                return datas;
            }
        };

    };
});

})();