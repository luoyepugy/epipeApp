
'use strict';

xdescribe('修改密码页面', function() {

    var changePwdBtn = element.all(by.css('.tr a')).get(1);
    var phone = element(by.name('oldPwd'));
    var password = element(by.name('password'));
    var confirmPwd = element(by.name('confirmPwd'));
    var submitBtn = element(by.name('submitBtn'));
    var errorTip = element(by.css('.messages'));

    function changePwd(name, psd, cpsd) {
        phone.sendKeys(name);
        password.sendKeys(psd);
        confirmPwd.sendKeys(cpsd);
        submitBtn.click();
    }; 
    function clear() {
        phone.clear();
        password.clear();
        confirmPwd.clear();
    };


    xdescribe('输入框验证', function() {
        
        it('输入空的旧密码，点击提交按钮，无跳转，错误信息提示', function() {
            browser.get('/#/purchase/changePwd');
            changePwd('', '', '');
            expect(errorTip.getText()).toEqual('请输入旧密码');
        });

        it('输入空的新密码，点击提交按钮，无跳转，错误信息提示', function() {
            clear();
            changePwd('aaaa', '', '');
            expect(errorTip.getText()).toEqual('请输入新密码');
        });  

        it('输入空的确认新密码，点击提交按钮，无跳转，错误信息提示', function() {
            clear();
            changePwd('aaaa', '1234', '');
            expect(errorTip.getText()).toEqual('请再次输入新密码');
        }); 

        it('输入错误的确认新密码，点击提交按钮，无跳转，错误信息提示', function() {
            clear();
            changePwd('aaaa', '1234', '123');
            expect(errorTip.getText()).toEqual('两次密码输入不一致');
        });  
    });


    describe('修改密码成功', function() {

        beforeEach(function() {
            browser.get('/#/purchase/user');
            browser.executeScript(
                "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
            );
            element.all(by.css('.tab-nav a')).get(2).click();
            changePwdBtn.click();
        });

        it('输入错误的旧密码，点击提交按钮，无跳转，错误信息提示', function() {
            clear();
            changePwd('a', '1234', '1234');
            expect(errorTip.getText()).toEqual('请输入正确的原始密码');
        });

        it('输入正确，点击提交按钮，跳转到getProfile页面', function() {
            clear();
            changePwd('aaaa', '1234', '1234');
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/user');
        }); 
    });

});