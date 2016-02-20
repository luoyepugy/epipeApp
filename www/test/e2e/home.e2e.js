'use strict';

xdescribe('首页运行正常', function() {
	
	var homeBtn = element(by.name('homeBtn'));
	var token = '';

	beforeEach(function() {
	    browser.get('/#/home');
	});		

	it('点击welcome按钮，判断localStorage.token值，跳转到登录页面/发布页面', function() {		
		homeBtn.click();
		browser.executeScript('token = window.localStorage.getItem("token")');
		if(token != null && token !== '') {
			expect(browser.getLocationAbsUrl()).toMatch("/purchase-publish");
		} else {
			expect(browser.getLocationAbsUrl()).toMatch("/login");
		}
		
	});

});
