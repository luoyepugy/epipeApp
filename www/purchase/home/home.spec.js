
'use strict';

define(['./home', 'angularMocks'], function() {
    describe('myApp.purchase.homeCtrl', function() {
        var scope, state, http, homeCtrl, config;

        beforeEach(module('myApp.purchase'));
        beforeEach(module(function($provide) {
            $provide.value('host', 'http://192.168.1.154:8083');
        }));
        beforeEach(inject(function($rootScope, $controller){          
            scope = $rootScope.$new();
            homeCtrl =  $controller('homeCtrl', 
            {$scope: scope, $state: state, $http: http, config: config}); 
        }));

        it('homeCtrl控制器应该被定义', function(){
            expect(homeCtrl).toBeDefined();
        });

        it('welcome函数应该被定义', function(){
            expect(scope.welcome).toBeDefined();
        });

        it('config.host应该为http://192.168.1.154:8083', inject(function(host) {
            expect(host).toEqual('http://192.168.1.154:8083');
        }));

    });
});