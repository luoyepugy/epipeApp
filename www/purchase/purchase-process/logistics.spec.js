
'use strict';

define(['./logistics', 'angularMocks'], function() {

    describe('myApp.purchase.logisticsCtrl', function() {

        var logisticsCtrl, $scope, httpService, $stateParams, $state, defer;
    
        var dataProduct = {"status":true,"data":[{'name': 'id1', 'productName': 'a'},{'name': 'id2', 'productName': 'b'}]};
        var dataList = {'status':true, 'data':[
            {'info': '深圳已经发出','createOn': '2016-01-02'},
            {'info': '到达广州','createOn': '2016-01-02'}
            ]};

        function resolve(data) {
            defer.resolve(data);
            $scope.$digest();
        }

        beforeEach(module('myApp.purchase'));
        beforeEach(module('ui.router'));

        beforeEach(function() {
            var mockHttpService = {};

            module('myApp.purchase', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('$stateParams', $stateParams = {id: 'id123'});
            });
            inject(function($q) {
                mockHttpService.getDatas = function() {
                    defer = $q.defer();
                    return defer.promise;
                }
            });
        });

        beforeEach(inject(function($rootScope, $controller, _httpService_, _$stateParams_, _$state_) {
            $scope = $rootScope.$new();
            httpService = _httpService_;
            $stateParams = _$stateParams_;
            $state = _$state_;

            logisticsCtrl = $controller('logisticsCtrl', {
                $scope: $scope,
                httpService: httpService,
                $stateParams: $stateParams,
                $state: $state
            });

            spyOn($state, 'go');
        }));

        describe('定义', function() {

            it('logisticsCtrl控制器被定义', function() {
                expect(logisticsCtrl).toBeDefined();
            });

            it('confirmGoods函数被定义', function() {
                expect(logisticsCtrl.confirmGoods).toBeDefined();
                
            });
        });
        

        describe('加载load()', function() {

            it('$stateParams的参数id', function() {
                expect($stateParams.id).toEqual('id123');
            });

            xit('获取物流信息', function() {
                resolve(dataList);              
                expect(logisticsCtrl.list.length).toBe(2);
                expect(logisticsCtrl.list[1].info).toContain('到达广州');
                expect(logisticsCtrl.list[0].info).toEqual('深圳已经发出');
                expect(logisticsCtrl.list[0].current).toBe(true);
                expect(logisticsCtrl.list[1].current).toBe(false);
            });

            xit('获取商品信息', function() {
                resolve(dataProduct);
                expect(logisticsCtrl.product.length).toBe(2);
            });
        });
        
        it('confirmGoods确认收货功能', function() {
            logisticsCtrl.confirmGoods();
            resolve(dataList);
            expect($state.go).toHaveBeenCalledWith('purchase.list', {'state': '所有'});
        });
    });
});