'use strict';

define(['./list-offerShow.filter', 'angularMocks'], function() {

	describe('列表页面报价字段需要显示的过滤器', function() {
		var offerShow;

		beforeEach(module('myApp.purchase'));
        beforeEach(inject(function($filter){ 
            offerShow = $filter('offerShow');
        }));

		it('报价参数应该返回true', function() {
			expect(offerShow('报价')).toEqual(true);
		});
		it('非报价参数应该返回false', function() {
			expect(offerShow('已完成')).toEqual(false);
		});
	});
});