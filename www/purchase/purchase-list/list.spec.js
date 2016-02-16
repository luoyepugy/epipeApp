
'use strict';

define(['./list', 'angularMocks',
     '../../common/services/http.service',
      '../../common/services/message.service'], function(httpService, messageService) {
    describe('myApp.purchase.listCtrl', function() {
        var scope, listCtrl, mockBackend, httpService, messageService, state, stateParams;
        var count = 10,             // 要请求的数目
            oldMaxCount = 0,        // 旧的最大数目
            orderOldUrl = '/order/getMyOldOrders/',
            orderNewUrl = '/order/getMyNewOrders/';

        beforeEach(module('myApp.purchase'));
        beforeEach(module('ui.router'));
        beforeEach(module(function($provide) {
            $provide.value('$stateParams', stateParams = {state: '报价'});
        }));
        beforeEach(inject(function($rootScope, $controller, _$httpBackend_){ 

            mockBackend = _$httpBackend_;         
            scope = $rootScope.$new();

            listCtrl = $controller('listCtrl', {
                $scope: scope,
                httpService: httpService,
                messageService: messageService,
                $stateParams: stateParams
            });
            // mockBackend.when('GET',orderOldUrl　+ count +'/' + '3' +'/' + oldMaxCount +'/' + stateParams.state).respond({
            //     [{'quotationCount': '2', 'state': '报价', 'createdOn': '2016-02-05', 'name': '201602051425'},
            //     {'quotationCount': '1', 'state': '待支付', 'createdOn': '2016-02-02', 'name': '201602021425'},
            //     {'quotationCount': '3', 'state': '已完成', 'createdOn': '2016-02-01', 'name': '201602011425'}]
            // });

            state = stateParams.state;

        }));

        it('listCtrl控制器应该被定义', function(){
            expect(listCtrl).toBeDefined();
        });

        it('doRefresh函数应该被定义', function(){
            expect(scope.doRefresh).toBeDefined();
        });

        it('loadMore函数应该被定义', function(){
            expect(scope.loadMore).toBeDefined();
        });

        it('doRefresh函数触发，scope.list应该变化', function() {
            var url = orderNewUrl + '3' +'/' + oldMaxCount +'/' + stateParams.state;
            mockBackend.expectGET(url).respond({

                'quotationCount': '2', 'state': '报价', 'createdOn': '2016-02-05', 'name': '201602051425'
                // {'quotationCount': '1', 'state': '待支付', 'createdOn': '2016-02-02', 'name': '201602021425'},
                // {'quotationCount': '3', 'state': '已完成', 'createdOn': '2016-02-01', 'name': '201602011425'}

            });
            expect(scope.list.length).toBe(1);
        });

        it('loadMore函数触发，若maxCount不等于列表长度,scope.list应该变化', function() {
            var url = orderOldUrl　+ count +'/' + '3' +'/' + oldMaxCount +'/' + stateParams.state;
        });

        it('loadMore函数触发，若maxCount等于列表长度，scope.hasMore应该为false', function() {
            var url = orderOldUrl　+ count +'/' + '3' +'/' + oldMaxCount +'/' + stateParams.state;
        });


    });
});