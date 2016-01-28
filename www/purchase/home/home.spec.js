
'use strict';

define(['./home', 'angularMocks'], function() {
    describe('myApp.purchase.homeCtrl', function() {
        var scope, state, http, homeCtrl, config, $httpBackend;

        beforeEach(module('myApp.purchase'));
        beforeEach(inject(function($rootScope, $controller, _$httpBackend_){ 
            $httpBackend = _$httpBackend_;          
            scope = $rootScope.$new();
            homeCtrl =  $controller('homeCtrl', 
            {$scope: scope, $state: state, $http: http, config: config}); 
        }));

        it('homeCtrl controller 被定义', function(){
            expect(homeCtrl).toBeDefined();
        });

        it('welcome() function 被定义', function(){
            expect(scope.welcome).toBeDefined();
        });

    });
});