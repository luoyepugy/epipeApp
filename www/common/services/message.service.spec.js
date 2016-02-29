
'use strict';

define(['./message.service', 'angularMocks'], function() {

    describe('common.messageService', function() {

        var $rootScope, $timeout, messageService;

        beforeEach(module('myApp.common'));
        beforeEach(inject(function(_$rootScope_, _$timeout_, _messageService_) {
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
            messageService = _messageService_;
        }));

        it('messageService被定义', function() {
            expect(messageService).not.toBe(null);
            expect(messageService).toBeDefined();
        });

        it('messageService.show被定义', function() {
            expect(messageService.show).toBeDefined();
        });

        it('运行', function() {
            messageService.show('hello');
            expect($rootScope.messages).toBe('hello');
        });
    });
});