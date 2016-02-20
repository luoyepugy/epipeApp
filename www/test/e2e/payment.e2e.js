
'use strict';

xdescribe('支付页面', function() {

	beforeEach(function() {
		browser.get('/#/purchase/payment');
	});

	it('点击线上支付按钮，跳转支付帮助页面', function() {
		element(by.linkText('在线支付')).click();
		expect(browser.getLocationAbsUrl()).toMatch('/purchase/payHelp');
	});

	it('点击线下支付按钮，跳转支付帮助页面', function() {
		element(by.linkText('线下支付')).click();
		expect(browser.getLocationAbsUrl()).toMatch('/purchase/payHelp');
	});
});