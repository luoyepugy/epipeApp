'use strict';

xdescribe('列表页面运行正常', function() {
	var list = element.all(by.repeater('item in vm.list'));

	beforeEach(function() {

        browser.get('/#/purchase/list');
        // 设置localstorage.token
        browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
        );

    });		

	it('列表页面第一个的名称为a', function() {
		list.first().then(function(ele) {
			expect(ele.findElement.all(by.tagName('span')).get(0)).toEqual('a');
		});
		// expect(list.get(0).getText()).toEqual('a');	
	});

});
