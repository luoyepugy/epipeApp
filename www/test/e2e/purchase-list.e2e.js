'use strict';

describe('列表页面运行正常', function() {
	// var list = element.all(by.css('.list .item'));

	beforeEach(function() {

        browser.get('/#/purchase/list');
        // 设置localstorage.token
        browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
        );

    });		

	it('列表页面第一个的名称为a', function() {
		// browser.pause();
		// expect(list.first().getText()).toContain('a');	
	});

});
