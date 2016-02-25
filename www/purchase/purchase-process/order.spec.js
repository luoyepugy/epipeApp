
'use strict';

define(['./order', 'angularMocks'], function() {

    xdescribe('myApp.purchase.orderCtrl', function() {

        var orderCtrl, $scope, httpService, $stateParams, defer;
        var data = {'status':true, 'data':{
            'productName': 'a',
            'productUnit': '吨',
            'purchaser': {'phone': '13008885781'},
            'supplier': {'phone': '13510254788'}
        }};

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

        beforeEach(inject(function(_$rootScope_, $controller, _httpService_, _$stateParams_) {
            $scope = _$rootScope_.$new();
            httpService = _httpService_;
            $stateParams = _$stateParams_;

            orderCtrl = $controller('orderCtrl', {
                $scope: $scope,
                httpService: httpService,
                $stateParams: $stateParams
            });
        }));


        it('orderCtrl控制器被定义', function() {
            expect(orderCtrl).toBeDefined();
        });
        
        it('加载load()', function() {
            resolve(data);
            expect(orderCtrl.product.productName).toEqual('a');
            expect(orderCtrl.purchase.phone).toBe('13008885781');
            expect(orderCtrl.supplier.phone).toBe('13510254788');
        });
    });
});