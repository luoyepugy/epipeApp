'use strict';

describe('登录页面运行正常', function() {
	var phone = element(by.model('phone'));
	var password = element(by.model('password'));
	var submitBtn = element(by.name('submitBtn'));
	// var error_tip = element(by.class('error_tip'));

	beforeEach(function() {
	    browser.get('/#/login');
	});		

	it('输入正确的用户名与密码，点击提交按钮，跳转到发布页面', function() {
		phone.sendkeys('13008885781');
		password.sendkeys('1234');
		submitBtn.click();
		expect(browser.getLocationAbsUrl()).toMatch("/purchase-publish");
	});

	it('输入错误的密码，点击提交按钮，无跳转，错误消息提示', function() {
		phone.sendkeys('13008885781');
		password.sendkeys('123');
		submitBtn.click();
		expect(browser.getLocationAbsUrl()).toMatch("/login");
		// expect(error_tip.getText()).toMatch('用户名或密码错误');
	});

	it('输入不存在的用户名，点击提交按钮，无跳转，错误消息提示', function() {
		phone.sendkeys('13008885780');
		password.sendkeys('1234');
		submitBtn.click();
		expect(browser.getLocationAbsUrl()).toMatch("/login");
		// expect(error_tip.getText()).toMatch('用户名或密码错误');
	});

	it('输入错误的用户名格式，点击提交按钮，无跳转，错误消息提示', function() {
		phone.sendkeys('1300888578');
		password.sendkeys('1234');
		submitBtn.click();
		expect(browser.getLocationAbsUrl()).toMatch("/login");
		// expect(error_tip.getText()).toMatch('请输入正确的手机号码格式');
	});

	it('输入空的或只有空格的密码，点击提交按钮，无跳转，错误消息提示', function() {
		phone.sendkeys('13008885781');
		password.sendkeys(' ');
		submitBtn.click();
		expect(browser.getLocationAbsUrl()).toMatch("/login");
		// expect(error_tip.getText()).toMatch('请输入密码');
	});

	it('输入空的或只有空格的用户名，点击提交按钮，无跳转，错误消息提示', function() {
		phone.sendkeys(' ');
		password.sendkeys('1234');
		submitBtn.click();
		expect(browser.getLocationAbsUrl()).toMatch("/login");
		// expect(error_tip.getText()).toMatch('请输入手机号码');
	});

});
