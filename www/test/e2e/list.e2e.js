'use strict';

describe('列表页面', function() {

    var errorTip = element(by.css('.messages'));
    var item = element.all(by.repeater('item in vm.list'));
    var filterLi = element.all(by.css('.listFilterWrap li'));

    beforeEach(function() {
        browser.get('/#/purchase/publish');
        browser.executeScript(
            "window.localStorage.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NjljNTliODEyMDg4YTkwZjY4NjRlMjUiLCJleHAiOjE0NTYyOTY5MjUyNjJ9.pkHyv4s8F-h79FNDBvssHl6McMDsf-SPT8zRKEvXC_o';"
        );
        element.all(by.css('.tab-nav a')).get(1).click();
    });


    xdescribe('点击底部菜单栏采购单按钮跳转', function() {

        it('当前页面为list页面', function() {
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/list');
        });

        it('列表页面item数量为10,第一个item的文本包含a，a为商品名称', function() {
            expect(item.count()).toBe(10);
            expect(item.get(0).getText()).toContain('a');
        });
    });


    xdescribe('右上角过滤菜单点击', function() {

        var rightBtn = element(by.css('.right-buttons'));
        
        var offerUrl = '/purchase/list/%E6%8A%A5%E4%BB%B7',
            payingUrl = '/purchase/list/%E5%BE%85%E6%94%AF%E4%BB%98',
            payedUrl = '/purchase/list/%E5%B7%B2%E6%94%AF%E4%BB%98',
            finishingUrl = '/purchase/list/%E5%B7%B2%E5%8F%91%E8%B4%A7',
            finishedUrl = '/purchase/list/%E5%B7%B2%E5%AE%8C%E6%88%90';

        beforeEach(function() {
            rightBtn.click();
        });

        it('点击顶部右侧过滤菜单按钮，打开过滤列表模态框', function() {      
            expect(element(by.css('.modal')).getAttribute('class')).toContain('ng-enter');
        });

        it('点击过滤列表的全部按钮，跳转到/purchase/list/全部', function() {
            filterLi.get(0).click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/list');
            expect(item.count()).toBe(10);
        });

        it('点击过滤列表的报价按钮，跳转到/purchase/list/报价', function() {
            filterLi.get(1).click();
            expect(browser.getLocationAbsUrl()).toMatch(offerUrl);
            expect(item.get(0).getText()).toContain('报价');
            // 点击第一个item，无跳转，提示无商家报价信息
            item.get(0).click();
            expect(errorTip.getText()).toEqual('暂时没有商家报价');
        });

        it('点击过滤列表的待支付按钮，跳转到/purchase/list/待支付', function() {
            filterLi.get(2).click();
            expect(browser.getLocationAbsUrl()).toMatch(payingUrl);
            expect(item.get(0).getText()).toContain('待支付');
            // 点击第一个item，跳转到订单页面
            item.get(0).click();
            expect(browser.getLocationAbsUrl()).toContain('/purchase/order');
        });

        it('点击过滤列表的已支付按钮，跳转到/purchase/list/已支付', function() {
            filterLi.get(3).click();
            expect(browser.getLocationAbsUrl()).toMatch(payedUrl);
            expect(errorTip.getText()).toEqual('没有已支付订单');
            // expect(item.get(0).getText()).toContain('已支付');
            // 点击第一个item，跳转到订单页面
            // item.get(0).click();
            // expect(browser.getLocationAbsUrl()).toContain('/purchase/order');
        });

        it('点击过滤列表的已发货按钮，跳转到/purchase/list/已发货', function() {
            filterLi.get(4).click();
            expect(browser.getLocationAbsUrl()).toMatch(finishingUrl);
            expect(errorTip.getText()).toEqual('没有已发货订单');
            // expect(item.get(0).getText()).toContain('已发货');
            // 点击第一个item，跳转到物流页面
            // item.get(0).click();
            // expect(browser.getLocationAbsUrl()).toContain('/purchase/logistics');
        });

        it('点击过滤列表的已完成按钮，跳转到/purchase/list/已完成', function() {
            filterLi.get(5).click();
            expect(browser.getLocationAbsUrl()).toMatch(finishedUrl);
            expect(item.get(0).getText()).toContain('已完成');
            // 点击第一个item，跳转到物流页面
            item.get(0).click();
            expect(browser.getLocationAbsUrl()).toContain('/purchase/logistics');
        });
    });


    describe('item路由跳转', function() {

        xit('点击第０个item，无跳转，无报价信息提示', function() {
            item.get(0).click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/list');
            expect(errorTip.getText()).toEqual('暂时没有商家报价');
        });

        xit('点击第１个item，跳转到报价页面', function() {
            item.get(1).click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/offer');
        });

        xit('点击第２个item，跳转到报价页面', function() {
            item.get(2).click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/order');
        });

        xit('点击第３个item，跳转到报价页面', function() {
            item.get(3).click();
            expect(browser.getLocationAbsUrl()).toMatch('/purchase/logistics');
        });
    });
});
