'use strict';

define(['./logistics-delivered.filter', 'angularMocks'], function() {

	xdescribe('物流追踪页面已发货需要显示的过滤器', function() {
		var deliveredFilter;

		beforeEach(module('myApp.purchase'));
        beforeEach(inject(function($filter){ 
            deliveredFilter = $filter('deliveredFilter');
        }));

		it('报价参数应该返回false', function() {
			expect(deliveredFilter('报价')).toEqual(false);
		});

		it('待支付参数应该返回false', function() {
			expect(deliveredFilter('待支付')).toEqual(false);
		});

		it('已支付参数应该返回false', function() {
			expect(deliveredFilter('已支付')).toEqual(false);
		});

		it('已发货应该返回true', function() {
			expect(deliveredFilter('已发货')).toEqual(true);
		});

		it('已完成参数应该返回false', function() {
			expect(deliveredFilter('已完成')).toEqual(false);
		});
	});
});