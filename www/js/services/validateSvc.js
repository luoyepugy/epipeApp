
define(['./module', 'zepto'], function(services, $) {
	services.service('validateService', ['messageService', function(messageService) {
		this.isEmpty = function(form) {
			var inputs = {},
                num = 0,
                total = $(form).find('.j-input').length,
                results = '';
            $(form).find('.j-input').each(function() {
                var key = $(this).attr('name');
                var val = $.trim($(this).val());
                if(val === '' || val === undefined || val === null) {
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
        this.submitData = function(form) {
            var datas = {};
            var phone_regexp = /^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;
            $(form).find('input[name],textarea[name],select[name]').each(function() {
                var key =  $(this).attr('name');
                var val = $.trim($(this).val());
                datas[key] = val;
            });
            // 个人简介数据使用对象值
            if(datas.company != null && datas.company != '') {
                datas.userProfile = {'company': datas.company };
            }
            // 判断表单填入数据格式
            if (datas.phone !== null && datas.phone !== undefined && phone_regexp.test(datas.phone) === false) {
                messageService.show('请输入正确的手机号码格式');
                return false;
            } else if (datas.confirmPwd !== null && datas.confirmPwd !== undefined &&　datas.confirmPwd !== datas.password) {
                messageService.show('两次密码输入不一致');
                return false;
            } else if (datas.productAmount !== null && datas.productAmount !== undefined && isNaN(datas.productAmount) === true ||　Number(datas.productAmount) <= 0) {
                messageService.show('请输入正确的商品数量格式');
                return false;
            } else {
                return datas;
            }

        };
	}]);
});