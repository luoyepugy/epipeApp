'use strict';

define(['./order-paying.filter', 'angularMocks'], function() {

	xdescribe('物流追踪页面已完成字段需要显示的过滤器', function() {
		var payingFilter;

		beforeEach(module('myApp.purchase'));
        beforeEach(inject(function($filter){ 
            payingFilter = $filter('payingFilter');
        }));

		it('报价参数应该返回false', function() {
			expect(payingFilter('报价')).toEqual(false);
		});

		it('待支付参数应该返回true', function() {
			expect(payingFilter('待支付')).toEqual(true);
		});

		it('已支付参数应该返回false', function() {
			expect(payingFilter('已支付')).toEqual(false);
		});

		it('已发货应该返回false', function() {
			expect(payingFilter('已发货')).toEqual(false);
		});

		it('已完成参数应该返回false', function() {
			expect(payingFilter('已完成')).toEqual(false);
		});
	});
});