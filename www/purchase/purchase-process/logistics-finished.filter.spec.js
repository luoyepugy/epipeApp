'use strict';

define(['./logistics-finished.filter', 'angularMocks'], function() {

	describe('物流追踪页面已完成字段需要显示的过滤器', function() {
		var finishedFilter;

		beforeEach(module('myApp.purchase'));
        beforeEach(inject(function($filter){ 
            finishedFilter = $filter('finishedFilter');
        }));

		it('报价参数应该返回true', function() {
			expect(finishedFilter('报价')).toEqual(true);
		});

		it('待支付参数应该返回true', function() {
			expect(finishedFilter('待支付')).toEqual(true);
		});

		it('已支付参数应该返回true', function() {
			expect(finishedFilter('已支付')).toEqual(true);
		});

		it('已发货应该返回true', function() {
			expect(finishedFilter('已发货')).toEqual(true);
		});

		it('已完成参数应该返回false', function() {
			expect(finishedFilter('已完成')).toEqual(false);
		});
	});
});