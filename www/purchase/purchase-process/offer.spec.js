
'use strict';

define(['./offer', 'angularMocks'], function() {

    describe('myApp.purchase.offerCtrl', function() {

        var offerCtrl, $scope, $rootScope, httpService, $stateParams, $state, defer, messageService;
        var dataOffer = {'status':true, 'data':{
            'totolPage': 1,
            'quotations': [
            {'unitPrice': '200'},
            {'unitPrice': '100'}
            ]
        }};
        var dataProduct = {"status":true,"data":[{'name': 'id1', 'productName': 'a'},{'name': 'id2', 'productName': 'b'}]};

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
                $provide.value('$stateParams', $stateParams = {id: 'id123'});
            });
            inject(function($q) {
                mockHttpService.getDatas = function() {
                    defer = $q.defer();
                    return defer.promise;
                }
                mockMessageService.show = function(tips) {
                    $rootScope.message = tips;
                }
            });
        });

        beforeEach(inject(function(_$rootScope_, $controller, _httpService_, _$stateParams_, _$state_) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            httpService = _httpService_;
            $stateParams = _$stateParams_;
            $state = _$state_;

            offerCtrl = $controller('offerCtrl', {
                $scope: $scope,
                httpService: httpService,
                $stateParams: $stateParams,
                $state: $state
            });

            spyOn($state, 'go');
        }));

        xdescribe('定义', function() {

            it('offerCtrl控制器被定义', function() {
                expect(offerCtrl).toBeDefined();
            });

            it('chooseOffer函数被定义', function() {
                expect(offerCtrl.chooseOffer).toBeDefined();
            });

            it('changeOffer函数被定义', function() {
                expect(offerCtrl.changeOffer).toBeDefined();
            });
        });
        

        describe('加载load()', function() {

            xit('获取报价信息', function() {
                resolve(dataOffer);
                expect(offerCtrl.list[0].unitPrice).toEqual('200');
                expect(offerCtrl.list.length).toBe(2);
            });

            it('获取商品信息', function() {
                resolve(dataProduct);
                expect(offerCtrl.product.length).toBe(2);
            });
        });
        

        describe('chooseOffer()', function() {

            it('选择商家功能，没有选择一个商家', function() {
                offerCtrl.choiceOffer = null;
                offerCtrl.chooseOffer();
                expect(offerCtrl.choiceOffer).toEqual(null);
                expect($rootScope.message).toEqual('请选择一个商家');

            });

            it('选择商家功能，选择一家商家', function() {
                offerCtrl.choiceOffer = 'aa';
                offerCtrl.chooseOffer();
                expect(offerCtrl.choiceOffer).toEqual('aa');
                resolve(dataProduct);
                expect($state.go).toHaveBeenCalledWith('purchase.order', {'id': 'id123'});
            });     
        });


        describe('changeOffer()', function() {

            it('换一批商家功能，totalPage为１时', function() {
                offerCtrl.pageIndex = 1;
                offerCtrl.changeOffer(1);
                expect($rootScope.message).toEqual('没有更多商家可供选择了');
            });

            it('换一批商家功能，totalPage大于１时', function() {
                offerCtrl.pageIndex = 1;
                offerCtrl.changeOffer(2);
                expect(offerCtrl.pageIndex).toBe(2);
                offerCtrl.changeOffer(2);
                expect(offerCtrl.pageIndex).toBe(1);
            });
        });
        
    });
});