'use strict';

describe('首页运行正常', function() {
	var homeBtn = element(by.name('homeBtn'));

	beforeEach(function() {
	    browser.get('/#/home');
	});		

	it('点击welcome按钮，若localStorage为空，跳转到登录页面', function() {
		homeBtn.click();
		expect(browser.getLocationAbsUrl()).toMatch("/login");
	});

	xit('点击welcome按钮，若localStorage不为空，跳转到发布页面', function() {
		homeBtn.click();
		expect(browser.getLocationAbsUrl()).toMatch("/purchase-publish");
	});

});
