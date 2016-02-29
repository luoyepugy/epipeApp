
'use strict';

define(['./validate.service', 'angularMocks'], function() {

	describe('common.validateService', function() {

		var messageService, validateService, $rootScope;

		beforeEach(module('myApp.common'));
		beforeEach(function() {
			var mockMessageService = {};

			module('myApp.common', function($provide) {
				$provide.value('messageService', mockMessageService);
			});
			inject(function() {
				mockMessageService.show = function(tips) {
					$rootScope.message = tips;
				}
			});
		});

		beforeEach(inject(function(_messageService_, _validateService_) {			
			validateService = _validateService_;
			messageService = _messageService_;
		}));

		it('validateService被定义', function() {
			expect(validateService).not.toBe(null);
			expect(validateService).toBeDefined();
		});

		it('submitData和isEmpty函数定义', function() {
			expect(validateService.submitData).toBeDefined();
			expect(validateService.isEmpty).toBeDefined();
		});

		xit('submitData', function() {
			
		});
	});
});