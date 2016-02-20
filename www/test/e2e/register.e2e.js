'use strict';

xdescribe('注册页面', function() {

    var phone = element(by.name('phone'));
    var code = element(by.name('code'));
    var company = element(by.name('company'));
    var password = element(by.name('password'));
    var confirmPwd = element(by.name('confirmPwd'));
    var submitBtn = element(by.name('submitBtn'));
    var errorTip = element(by.css('.messages'));

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


    xdescribe('输入框验证', function() {             

        it('输入空的用户名，点击提交按钮，无跳转，错误消息提示', function() {
            browser.get('/#/register');
            clear();
            register('　', '', '', '', '');
            expect(browser.getLocationAbsUrl()).toMatch("/register");
            expect(errorTip.getText()).toEqual('请输入手机号码');

        });

        it('输入已存在的用户名，点击提交按钮，无跳转，错误消息提示', function() {
            browser.get('/#/register');
            clear();
            register('13008885781', '878', '深圳鼎盛', '1234', '1234');
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

        it('输入空的确认密码，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            register('13008885780', '878', '深圳鼎盛', '1234', '');
            expect(browser.getLocationAbsUrl()).toMatch("/register");
            expect(errorTip.getText()).toEqual('请再次输入密码');
        });

        it('第二次输入密码错误，点击提交按钮，无跳转，错误消息提示', function() {
            clear();
            register('13008885780', '878', '深圳鼎盛', '1234', '123');
            expect(errorTip.getText()).toEqual('两次密码输入不一致');
            expect(browser.getLocationAbsUrl()).toMatch("/register");       
        });  

        xit('输入正确的用户名与密码，点击提交按钮，跳转到登录页面', function() {  
            clear(); 
            register('13008885780', '878', '深圳鼎盛', '1234', '1234');
            expect(browser.getLocationAbsUrl()).toMatch("/login");
        }); 

    });


    describe('左上角返回按钮', function() {
        
        var backBtn = element.all(by.css('.left-buttons')).get(1);

        beforeEach(function() {
            browser.get('/#/login');
            element(by.linkText('还没有账号，赶紧来注册吧')).click();
        });

        it('点击返回按钮，跳转到登录页面', function() {
            expect(browser.getLocationAbsUrl()).toMatch("/register");
            backBtn.click();
            expect(browser.getLocationAbsUrl()).toMatch("/login");
        });   
    });

});

