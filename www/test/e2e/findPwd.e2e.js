'use strict';

xdescribe('找回密码页面', function() {
    var phone = element(by.model('vm.user.phone'));
    var code = element(by.model('vm.user.code'));
    var submitBtn = element.all(by.css('.button')).last();
    var errorTip = element(by.css('.error_tip'));
    var sendCodeBtn = element.all(by.css('.button-energized')).get(0);

    function findPwd(name, psd) {
        phone.sendKeys(name);
        code.sendKeys(psd);
        submitBtn.click();
    };
    function sendCode(name, psd) {
        phone.sendKeys(name);
        code.sendKeys(psd);
        sendCodeBtn.click();
    }; 
    function clear() {
        phone.clear();
        code.clear();
    };
  

    describe('点击发送验证码', function() {
        it('手机号码为空', function() {
            browser.get('/#/findPwd');
            clear();
            sendCode('', 'a');
            expect(browser.getLocationAbsUrl()).toMatch('/findPwd');
            expect(errorTip.getText()).toEqual('请输入手机号码');
        });

        it('手机号码格式不正确', function() {
            clear();
            sendCode('1300888578', '');
            expect(browser.getLocationAbsUrl()).toMatch('/findPwd');
            expect(errorTip.getText()).toEqual('请输入正确的手机号码格式');
        });

        xit('输入正确的手机号码，按钮禁用', function() {
            clear();
            sendCode('13008885781', '');
            expect(browser.getLocationAbsUrl()).toMatch('/findPwd');
            expect(errorTip.getText()).toEqual('');
            // expect(sendCodeBtn.getAttribute('disabled')).toEqual('disabled');
            // expect(sendCodeBtn.getText()).toContain('秒后重试'); 
        });
    });


    describe('输入框验证', function() {
        it('输入空的手机号码，无跳转，错误信息提示', function() {
            browser.get('/#/findPwd');
            findPwd('', '');
            expect(browser.getLocationAbsUrl()).toMatch('/findPwd');
            expect(errorTip.getText()).toEqual('请输入手机号码');
        });

        it('输入错误手机号码格式，无跳转，错误信息提示', function() {
            clear();
            findPwd('1300888578', 'a');
            expect(browser.getLocationAbsUrl()).toMatch('/findPwd');
            expect(errorTip.getText()).toEqual('请输入正确的手机号码格式');
        });

        it('输入空的验证码，无跳转，错误信息提示', function() {
            clear();
            findPwd('13008885781', '');
            expect(browser.getLocationAbsUrl()).toMatch('/findPwd');
            expect(errorTip.getText()).toEqual('请输入验证码');
        });

        it('输入错误的验证码，无跳转，错误信息提示', function() {
            clear();
            findPwd('13008885781', 'a');
            expect(browser.getLocationAbsUrl()).toMatch('/findPwd');
            expect(errorTip.getText()).toEqual('请填写正确的验证码');
        });
    }); 

    

});
