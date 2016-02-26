
'use strict';

xdescribe('报价页面', function() {

    var offerItem = element.all(by.repeater('item in vm.list'));
    var productInfo = element.all(by.css('.offer .item')).get(0);
    var errorTip = element(by.css('.messages'));
    var chooseOfferBtn = element.all(by.css('.button-full')).get(1);
    var changeOfferBtn = element(by.css('.button-stable'));

    beforeEach(function() {
        browser.get('/#/purchase/publish');
        browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTY4MTI4NzYzMzN9.fKQe5QwAS6rA9mbzBqPFI8Tpuy9Im9OsFWn0O5cbDeY';"
        );
        element.all(by.css('.tab-nav a')).get(1).click();
        element.all(by.repeater('item in vm.list')).get(0).click();
    });

    xit('list页面第一个item点击，跳转到报价页面', function() {
        expect(browser.getLocationAbsUrl()).toMatch('/purchase/offer');
        expect(productInfo.getText()).toContain('a');
        expect(offerItem.count()).toEqual(1);
    });

    xit('点击选择商家按钮，没有勾选，错误信息提示', function() {
        expect(chooseOfferBtn.getText()).toEqual('选择商家');
        chooseOfferBtn.click();
        expect(errorTip.getText()).toEqual('请选择一个商家');
    });

    it('点击不满意按钮，再刷一波商家，提示没有更多商家信息', function() {
        expect(changeOfferBtn.getText()).toEqual('不满意，我要再刷一波商家');
        changeOfferBtn.click();
        expect(errorTip.getText()).toEqual('没有更多商家可供选择了');
    });

    xit('点击选择商家按钮，勾选一个商家，跳转到order页面', function() {
        offerItem.get(0).click();
        chooseOfferBtn.click();
        expect(browser.getLocationAbsUrl()).toMatch('/purchase/order');
        expect(element(by.binding('vm.purchase.userProfile.phone')).getText()).toContain('13008885781');
    });   
});