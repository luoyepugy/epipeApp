
'use strict';

define(['./list', 'angularMocks'], function() {

    describe('myApp.purchase.listCtrl', function() {

        var $scope, $rootScope, messageService, httpService, listCtrl, state, $stateParams, defer, $state;

        var loadData = {"status":true,"data":{"maxCount":0,"orders":[]}};
        var loadData2 = {"status":true,"data":{"maxCount":12,"orders":[
            {'productName':'a', 'name':'id1', 'state':'报价','quotationCount':0},
            {'productName':'b', 'name':'id2', 'state':'报价','quotationCount':1},
            {'productName':'c', 'name':'id3', 'state':'待支付','quotationCount':1},
            {'productName':'d', 'name':'id4', 'state':'已支付','quotationCount':1},
            {'productName':'e', 'name':'id5', 'state':'已发货','quotationCount':1},
            {'productName':'f', 'name':'id6', 'state':'已完成','quotationCount':1}
            ]}};
        var refreshData = {"status":true,"data":{"maxCount":2,"orders":[
            {'productName':'g', 'name':'id7', 'state':'报价','quotationCount':0},
            {'productName':'h', 'name':'id8', 'state':'报价','quotationCount':0}
            ]}};
        var moreData = {"status":true,"data":{"maxCount":0,"orders":[]}};
        var moreData2 = {"status":true,"data":{"maxCount":1,"orders":[
            {'productName':'i', 'name':'id9', 'state':'报价','quotationCount':0}
            ]}};
            
        function resolve(data) {
            defer.resolve(data);
            $scope.$digest();
        }

        beforeEach(module('myApp.purchase'));
        beforeEach(module('ui.router'));

        beforeEach(function() {
            var mockHttpService = {};
            var mockMessageService = {};

            module('myApp.purchase', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('messageService', mockMessageService);
                $provide.value('$stateParams', $stateParams = {state: '报价'});
            });
            inject(function($q) {
                mockHttpService.getDatas = function() {
                    defer = $q.defer();
                    // defer.resolve(data);
                    return defer.promise;
                };
                mockMessageService.show = function(tips) {
                    $rootScope.message = tips;
                };
            });
        });

        beforeEach(inject(function(_$rootScope_, $controller, _httpService_, _messageService_, _$state_){ 
            $rootScope = _$rootScope_;         
            $scope = $rootScope.$new();
            httpService = _httpService_;
            messageService = _messageService_;
            $state = _$state_;

            listCtrl = $controller('listCtrl', {
                $scope: $scope,
                messageService: messageService,
                httpService: httpService,
                $stateParams: $stateParams,
                $state: $state
            });

            state = $stateParams.state;
            spyOn($state, 'go');
        }));


        describe('定义', function() {

            it('listCtrl控制器应该被定义', function(){
                expect(listCtrl).toBeDefined();
            });

            it('doRefresh函数应该被定义', function(){
                expect(listCtrl.doRefresh).toBeDefined();
            });

            it('loadMore函数应该被定义', function(){
                expect(listCtrl.loadMore).toBeDefined();
            });

            it('route函数应该被定义', function(){
                expect(listCtrl.route).toBeDefined();
            });
        });


        describe('页面加载load()', function() {

            it('在页面加载时候，maxCount为0，消息提示', function() {
                resolve(loadData); 
                expect(listCtrl.list.length).toBe(0);
                expect(listCtrl.listFilterBtn).toBe(false);
                expect($rootScope.message).toEqual('没有报价订单');
            });

            it('在页面加载时候，列表项应该有6条数据', function() {
                resolve(loadData2); 
                expect(listCtrl.list.length).toBe(6);
                expect(listCtrl.list[0].productName).toEqual('a');
                // 设置　$stateParams.state = '所有'　时，下面这条断言为true
                // expect(listCtrl.listFilterBtn).toBe(true);
            });
        });

        describe('其他函数', function() {

            it('doRefresh功能', function() {
                listCtrl.doRefresh();
                resolve(refreshData);
                expect(listCtrl.list.length).toBe(2);
                expect(listCtrl.list[0].productName).toEqual('g');
            });

            it('loadMore功能, maxCount为0时，与list.length相等，消息提示', function() {
                listCtrl.loadMore();
                resolve(moreData);
                expect(listCtrl.list.length).toBe(0);
                expect(listCtrl.hasMore).toBe(false);
                expect($rootScope.message).toEqual('没有更多数据了');
            });

            it('loadMore功能, maxCount不为0时，hasMore为true', function() {
                listCtrl.loadMore();
                resolve(moreData2);
                expect(listCtrl.list.length).toBe(1);
                expect(listCtrl.hasMore).toBe(true);
                expect(listCtrl.list[0].productName).toEqual('i');
            });
        });        


        describe('路由跳转', function() {

            it('route(报价0)', function() {
                resolve(loadData2);
                listCtrl.route(0);
                expect($rootScope.message).toEqual('暂时没有商家报价');
            });

            it('route(报价1)', function() {
                resolve(loadData2);
                listCtrl.route(1);
                expect($state.go).toHaveBeenCalledWith('purchase.offer', {id: 'id2'});
            });

            it('route(待支付)', function() {
                resolve(loadData2);
                listCtrl.route(2);
                expect($state.go).toHaveBeenCalledWith('purchase.order', {id: 'id3'});
            });

            it('route(已支付)', function() {
                resolve(loadData2);
                listCtrl.route(3);
                expect($state.go).toHaveBeenCalledWith('purchase.order', {id: 'id4'});
            });

            it('route(已发货)', function() {
                resolve(loadData2);
                listCtrl.route(4);
                expect($state.go).toHaveBeenCalledWith('purchase.logistics', {id: 'id5'});
            });

            it('route(已完成)', function() {
                resolve(loadData2);
                listCtrl.route(5);
                expect($state.go).toHaveBeenCalledWith('purchase.logistics', {id: 'id6'});
            });
        });
    });
});