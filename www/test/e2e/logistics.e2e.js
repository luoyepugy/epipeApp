
'use strict';

xdescribe('物流页面', function() {

	var item = element.all(by.css('.purchase .item'));
	var filterLi = element.all(by.css('.listFilterWrap li'));
	var rightBtn = element(by.css('.right-buttons'));

	beforeEach(function() {
		browser.get('#/purchase/publish');
		browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
        );
        element.all(by.css('.tab-nav a')).get(1).click();
		rightBtn.click();
	});

	it('已完成物流页面没有确认收货和没收到货按钮', function() {
		filterLi.get(5).click();
		expect(element(by.css('.border0 button')).isPresent()).toBe(false);
		expect(element(by.linkText('没收到货，联系商家')).isPresent()).toBe(false);
	});
});