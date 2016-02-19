'use strict';

describe('注册页面', function() {

    describe('输入框验证', function() {
        
        var phone = element(by.model('vm.user.phone'));
        var code = element(by.model('vm.user.code'));
        var company = element(by.model('vm.user.company'));
        var password = element(by.model('vm.user.password'));
        var confirmPwd = element(by.name('confirmPwd'));
        var submitBtn = element(by.name('submitBtn'));
        var errorTip = element(by.css('.error_tip'));

        function register(name, ucode, ucompany, psd, cpsd) {
            phone.sendKeys(name);
            code.sendKeys(ucode);
            company.sendKeys(ucompany);
            password.sendKeys(psd);
            confirmPwd.sendKeys(cpsd);
            submitBtn.click();
        }; 
        function clear() {
            phone.clear();
            code.clear();
            company.clear();
            password.clear();
            confirmPwd.clear();
        };     

        it('输入已存在的用户名，点击提交按钮，无跳转，错误消息提示', function() {
            browser.get('/#/register');
            clear();
            register('13008885781');
            expect(browser.getLocationAbsUrl()).toMatch("/register");
            expect(errorTip.getText()).toEqual('手机号码已存在');

        });

        it('输入空的验证码，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            register('13008885780', '', '深圳鼎盛', '1234', '1234');
            expect(browser.getLocationAbsUrl()).toMatch("/register");
            expect(errorTip.getText()).toEqual('请输入验证码');
        });

        it('输入空的公司名称，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            register('13008885780', '878', '', '1234', '1234');
            expect(browser.getLocationAbsUrl()).toMatch("/register");
            expect(errorTip.getText()).toEqual('请输入公司名称');
        });

        it('输入空的密码，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            register('13008885780', '878', '深圳鼎盛', '', '');
            expect(browser.getLocationAbsUrl()).toMatch("/register");
            expect(errorTip.getText()).toEqual('请输入密码');
        });

        it('第二次输入密码错误，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            register('13008885780', '878', '深圳鼎盛', '1234', '123');
            expect(errorTip.getText()).toEqual('两次密码输入不一致');
            expect(browser.getLocationAbsUrl()).toMatch("/register");       
        });  

        xit('输入正确的用户名与密码，点击提交按钮，跳转到发布页面', function() {  
            clear(); 
            register('13008885780', '878', '深圳鼎盛', '1234', '1234');
            expect(browser.getLocationAbsUrl()).toMatch("/login");
        }); 

    });

});

