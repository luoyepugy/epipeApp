
'use strict';

define(['./list', 'angularMocks'], function() {
    xdescribe('myApp.purchase.listCtrl', function() {
        var scope, state, http, listCtrl, config, $httpBackend, httpService, messageService, $state, $stateParams;

        beforeEach(module('myApp.purchase'));
        beforeEach(inject(function($rootScope, $controller, _$httpBackend_,
          httpService, messageService, $state, $stateParams){ 
            $httpBackend = _$httpBackend_; 
            location = $location;          
            scope = $rootScope.$new();
            httpService = httpService;
            messageService = messageService;
            $stateParams = $stateParams;
            listCtrl =  $controller('listCtrl', {
                $scope: scope, 
                httpService: httpService,
                messageService: messageService,
                $state: $state,
                $stateParams: $stateParams
            }); 
            // $httpBackend.expectGET('http://www.epipe.cn/download/appConfig.js').respond({"api_host":"http://www.epipe.cn:3002"});
        }));

        it('listCtrl controller 被定义', function(){
            expect(listCtrl).toBeDefined();
        });

        it('welcome() function 被定义', function(){
            expect(scope.doRefresh).toBeDefined();
            expect(scope.loadMore).toBeDefined();
        });

    });
});