
'use strict';

xdescribe('个人中心页面', function() {

    var company = element(by.binding('vm.user.company'));
    var phone = element(by.binding('vm.user.phone'));
    var avatar = element(by.css('.icon100'));

    beforeEach(function() {
        browser.get('/#/purchase/publish');
        browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
        );
        element.all(by.css('.tab-nav a')).get(2).click();
    });


    xdescribe('获取个人信息', function() {

        it('当前页面为getProfile页面，且信息正确', function() {
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/user');
            expect(company.getText()).toContain('什么鬼啊');
            expect(phone.getText()).toContain('13008885781');
            expect(avatar.getAttribute('src')).toEqual('http://192.168.1.154:8083/public/avatar/1455779303496.188058');
        });
    });


    describe('链接跳转正常', function() {

        var exitBtn = element.all(by.css('.button-energized')).get(1);
        var changeProfileBtn = element.all(by.css('.tr a')).get(0);
        var changePwdBtn = element.all(by.css('.tr a')).get(1);

        it('点击编辑资料按钮，跳转到changeProfile页面', function() {
            changeProfileBtn.click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/changeProfile');
        });

        it('点击修改密码按钮，跳转到changePwd页面', function() {
            changePwdBtn.click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/changePwd');
        });

        it('点击退出当前账号按钮，跳转到登录页面，清空localstorage', function() {            
            expect(exitBtn.getText()).toEqual('退出当前账号');
            exitBtn.click();
            expect(browser.getLocationAbsUrl()).toMatch('/login');
            expect(browser.executeScript("window.localStorage.getItem('token')")).toEqual(null);
        });
    });
});