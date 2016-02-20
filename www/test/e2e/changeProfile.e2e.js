
'use strict';

xdescribe('编辑资料页面', function() {   
    
    var changeProfileBtn = element.all(by.css('.tr a')).get(0);  
    var avatar = element(by.css('.icon100'));  
    var errorTip = element(by.css('.messages'));
    var backBtn = element.all(by.css('.back-button')).get(1);
    var submitBtn = element.all(by.name('submitBtn')).get(1);
    var company = element(by.model('vm.user.company'));
    var phone = element(by.model('vm.user.phone'));

    beforeEach(function() {
        browser.get('/#/purchase/publish');
        browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
        );
        element.all(by.css('.tab-nav a')).get(2).click();
        changeProfileBtn.click();
    });

    describe('获取个人信息', function() {
        it('当前页面为changeProfile页面，　且信息正确', function() {
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/changeProfile');
            expect(company.getAttribute('value')).toEqual('什么鬼啊');
            expect(phone.getAttribute('value')).toEqual('13008885781');
            expect(avatar.getAttribute('src')).toEqual('http://localhost:8100/images/default_avatar.png');
        });    
    });

    describe('修改验证', function() {        
        it('修改公司名称，点击返回按钮，跳转到getProfile页面，用户信息修改失败', function() {
            company.clear();
            company.sendKeys('什么鬼1');
            backBtn.click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/user');
            expect(element(by.binding('vm.user.company')).getText()).toContain('什么鬼啊');
        });

        it('修改公司名称，点击保存按钮，跳转到getProfile页面，用户信息修改成功', function() {
            company.clear();
            company.sendKeys('什么鬼１');
            expect(submitBtn.getText()).toEqual('提交保存');
            submitBtn.click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/user');
            expect(element(by.binding('vm.user.company')).getText()).toContain('什么鬼１');
        });

        xit('点击手机号码输入框，提示无法修改信息', function() {
            phone.click();
            expect(errorTip.getText()).toEqual('手机号码无法修改');
        });

        xit('点击修改头像按钮，弹出actionSheet', function() {
            avatar.click();
            expect(element(by.css('.action-sheet')).isPresent()).toBe(true);
        });
    });

});