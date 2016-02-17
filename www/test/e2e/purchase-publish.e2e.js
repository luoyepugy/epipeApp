'use strict';

xdescribe('采购发布页面输入框验证', function() {

    var name = element(by.model('product.name'));
    var num = element(by.model('product.num'));
    var unit = element(by.model('product.unit'));

    var submitBtn = element(by.name('submitBtn'));

    beforeEach(function() {
        browser.get('/#/purchase/publish');
        // 设置localstorage.token
        browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
        );
    }); 

    it('输入正确采购信息，点击提交按钮，跳转到列表页面', function() {
        name.sendKeys('a');
        num.sendKeys('3');
        unit.sendKeys('吨');

        submitBtn.click();

        expect(browser.getLocationAbsUrl()).toMatch("/purchase/list");
    });
});