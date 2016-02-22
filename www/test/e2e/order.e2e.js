
'use strict';

xdescribe('订单页面', function() {

	beforeEach(function() {
		browser.get('/#/purchase/order/20160219134628466');
		browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
        );
	});

	it('订单信息中包含我方联系方式，以及支付按钮显示', function() {
		expect(element(by.linkText('支付')).isPresent()).toBe(true);
		expect(element(by.linkText('我还要考虑一下，取消')).isPresent()).toBe(true);
		expect(element(by.binding('vm.purchase.userProfile.phone')).getText()).toContain('13008885781');
	});

	it('点击支付按钮，跳转支付方式页面', function() {
		element(by.linkText('支付')).click();
		expect(browser.getLocationAbsUrl()).toMatch('/purchase/payment');
	});

	it('点击再考虑一下按钮，跳转list页面', function() {
		element(by.linkText('我还要考虑一下，取消')).click();
		expect(browser.getLocationAbsUrl()).toMatch('/purchase/list');
	});

});