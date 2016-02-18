'use strict';

xdescribe('登录页面输入框验证', function() {

    var phone = element(by.model('user.phone'));
    var password = element(by.model('user.password'));
    var submitBtn = element(by.name('submitBtn'));
    var errorTip = element(by.model('tips'));

    beforeEach(function() {
        browser.get('/#/login');
    }); 

    function login(name, psd) {
        phone.sendKeys(name);
        password.sendKeys(psd);
        // browser.pause();
        submitBtn.click();
    };  

    xit('输入正确的用户名与密码，点击提交按钮，跳转到发布页面', function() {
        browser.get('/#/login');
        login('13008885781', 'aaaa');
        expect(browser.getLocationAbsUrl()).toMatch("/purchase/publish");
    });

    xit('输入错误的用户名，点击提交按钮，无跳转，错误消息提示', function() {
        login('13008885781', '123');
        expect(browser.getLocationAbsUrl()).toMatch("/login");
        expect(errorTip.getText()).toMatch('用户名或密码错误');

    });

    xit('输入错误的密码，点击提交按钮，无跳转，错误消息提示', function() {
        login('13008885780', '1234');
        expect(browser.getLocationAbsUrl()).toMatch("/login");
        expect(errorTip.getText()).toMatch('用户名或密码错误');
    });

    xit('输入错误的用户名格式，点击提交按钮，无跳转，错误消息提示', function() {
        login('1300888578', '1234');
        expect(browser.getLocationAbsUrl()).toMatch("/login");
        expect(errorTip.getText()).toMatch('请输入正确的手机号码格式');
    });

    xit('输入空的用户名或密码，点击提交按钮，无跳转，错误消息提示', function() {
        login('13008885781', '');
        expect(browser.getLocationAbsUrl()).toMatch("/login");
        expect(errorTip.getText()).toMatch('请输入密码');
    });

    it('输入空的用户名或密码，点击提交按钮，无跳转，错误消息提示', function() {
        login('', '1234');
        // expect(errorTip.getText()).toMatch('请输入手机号码');
        expect(element(by.model('tips')).getText()).toMatch('请输入手机号码');
        expect(element(by.id('test')).getText()).toEqual('12345');
        expect(browser.getLocationAbsUrl()).toMatch("/login");       
    });   

});

xdescribe('登录页面跳转正常', function() {

    beforeEach(function() {
        browser.get('/#/login');
    });

    it('点击注册按钮，跳转注册页面', function() {      
        element(by.linkText('还没有账号，赶紧来注册吧')).click();
        expect(browser.getLocationAbsUrl()).toMatch("/register");
    });

    it('点击找回密码按钮，跳转找回密码页面', function() {
        element(by.linkText('忘记密码？')).click();
        expect(browser.getLocationAbsUrl()).toMatch("/findPwd");
    });
});
