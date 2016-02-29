'use strict';

define(['./list-logisticsShow.filter', 'angularMocks'], function() {

	describe('列表页面物流字段需要显示的过滤器', function() {
		var logisticsShow;

		beforeEach(module('myApp.purchase'));
        beforeEach(inject(function($filter){ 
            logisticsShow = $filter('logisticsShow');
        }));

		it('报价参数应该返回false', function() {
			expect(logisticsShow('报价')).toEqual(false);
		});

		it('待支付参数应该返回false', function() {
			expect(logisticsShow('待支付')).toEqual(false);
		});

		it('已支付参数应该返回false', function() {
			expect(logisticsShow('已支付')).toEqual(false);
		});

		it('已发货应该返回true', function() {
			expect(logisticsShow('已发货')).toEqual(true);
		});

		it('已完成参数应该返回true', function() {
			expect(logisticsShow('已完成')).toEqual(true);
		});
	});
});