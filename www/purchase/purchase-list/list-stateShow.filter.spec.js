'use strict';

define(['./list-stateShow.filter', 'angularMocks'], function() {

	describe('列表页面物流字段需要显示的过滤器', function() {
		var stateShow;

		beforeEach(module('myApp.purchase'));
        beforeEach(inject(function($filter){ 
            stateShow = $filter('stateShow');
        }));

		it('报价参数应该返回false', function() {
			expect(stateShow('报价')).toEqual(false);
		});

		it('待支付参数应该返回true', function() {
			expect(stateShow('待支付')).toEqual(true);
		});

		it('已支付参数应该返回true', function() {
			expect(stateShow('已支付')).toEqual(true);
		});

		it('已发货应该返回true', function() {
			expect(stateShow('已发货')).toEqual(true);
		});

		it('已完成参数应该返回true', function() {
			expect(stateShow('已完成')).toEqual(true);
		});
	});
});