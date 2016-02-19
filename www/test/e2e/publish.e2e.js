'use strict';

xdescribe('发布页面', function() {
    var name = element(by.model('product.name'));
    var num = element(by.model('product.num'));
    var unit = element(by.model('product.unit'));
    var submitBtn = element(by.name('submitBtn'));
    var errorTip = element(by.css('.error_tip')); 

    function publish(pname, pnum, punit) {
        name.sendKeys(pname);
        num.sendKeys(pnum);
        unit.sendKeys(punit);
        submitBtn.click();
    }; 
    function clear() {
        name.clear();
        num.clear();
        unit.clear();
    };
    describe('输入错误发布信息验证', function() {

        it('输入空的商品名称，点击提交按钮，无跳转，错误信息提示', function() {
            browser.get('/#/purchase/publish');
            clear();
            publish('　', '3', '吨');
            expect(errorTip.getText()).toEqual('请输入商品名称');
            expect(browser.getLocationAbsUrl()).toMatch("/purchase/publish"); 
        });

        it('所有输入框为空，点击提交按钮，无跳转，错误信息提示', function() {
            clear();
            publish('', '', '');
            expect(errorTip.getText()).toEqual('请输入商品名称');
            expect(browser.getLocationAbsUrl()).toMatch("/purchase/publish"); 
        });

        it('输入空的商品数量，点击提交按钮，无跳转，错误信息提示', function() {
            clear();
            publish('lkj', '', '吨');
            expect(errorTip.getText()).toEqual('请输入商品数量');
            expect(browser.getLocationAbsUrl()).toMatch("/purchase/publish"); 
        });

        it('输入空的商品单位，点击提交按钮，无跳转，错误信息提示', function() {
            clear();
            publish('lkj', '2', '');
            expect(errorTip.getText()).toEqual('请输入商品单位');
            expect(browser.getLocationAbsUrl()).toMatch("/purchase/publish"); 
        });

        it('输入非数字的商品数量，点击提交按钮，无跳转，错误信息提示', function() {
            clear();
            publish('lkj', 'a', '吨');
            expect(errorTip.getText()).toEqual('请输入正确的商品数量格式');
            expect(browser.getLocationAbsUrl()).toMatch("/purchase/publish"); 
        });
    });

    describe('输入正确发布信息验证', function() {
        beforeEach(function() {
            browser.get('/#/purchase/publish');
            browser.executeScript(
                "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
            );
        });

        it('输入正确发布信息，点击提交按钮，跳转到列表页面', function() {
            publish('a', '3', '吨');
            expect(browser.getLocationAbsUrl()).toMatch("/purchase/list");
        });
    });
});


