
'use strict';

define(['./list', 'angularMocks'], function() {

    describe('myApp.purchase.listCtrl', function() {

        var scope, rootScope, messageService, httpService, listCtrl, mockBackend, state, stateParams;

        beforeEach(module('myApp.purchase'));
        beforeEach(module(function($provide) {
            $provide.value('$stateParams', stateParams = {state: '报价'});
        }));

        beforeEach(function() {
            var mockHttpService = {};
            var mockMessageService = {};

            module('myApp.purchase', function($provide) {
                $provide.value('httpService', mockHttpService);
                $provide.value('messageService', mockMessageService);
            });
            inject(function($q) {
                mockHttpService.data = {"status":true,"data":{"maxCount":0,"orders":[{"_id":"56c520cfaadbd49f2d7b0159","productName":"a","productAmount":"3","productUnit":"吨","shipAddress":"","purUserId":"569c59b812088a90f6864e25","name":"20160218093927927","state":"报价","createdOn":"2016-02-18T01:39:27.927Z","quotationCount":1,"supUer":null,"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56c8240b8cc764fc3cbe1e6d","productName":"a","productAmount":"3","productUnit":"吨","shipAddress":"","purUserId":"569c59b812088a90f6864e25","name":"20160220163003787","state":"待支付","createdOn":"2016-02-20T08:30:03.787Z","unitPrice":"345","sumPrice":1035,"supUserId":"569c5d2f9eeeeae6f64aabc9","quotationCount":1,"supUer":{"_id":"569c5d2f9eeeeae6f64aabc9","userName":null,"phone":"13510271110","userType":"供应商","hashPassword":"3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d","isLockout":false,"createdOn":"2016-01-18T03:34:07.555Z","ifAuditPass":false,"userProfile":{"_id":"569c5d2f9eeeeae6f64aabca","company":"广州锦腾有限公司","userId":"569c5d2f9eeeeae6f64aabc9","userType":"供应商","userProfile":{"company":"广州锦腾有限公司"},"phone":"13510271110"}},"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56c6b4b80616999b02e88205","productName":"a","productAmount":"3","productUnit":"吨","shipAddress":"","purUserId":"569c59b812088a90f6864e25","name":"20160219142248508","state":"待支付","createdOn":"2016-02-19T06:22:48.508Z","unitPrice":"456","sumPrice":1368,"supUserId":"569c5d2f9eeeeae6f64aabc9","quotationCount":1,"supUer":{"_id":"569c5d2f9eeeeae6f64aabc9","userName":null,"phone":"13510271110","userType":"供应商","hashPassword":"3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d","isLockout":false,"createdOn":"2016-01-18T03:34:07.555Z","ifAuditPass":false,"userProfile":{"_id":"569c5d2f9eeeeae6f64aabca","company":"广州锦腾有限公司","userId":"569c5d2f9eeeeae6f64aabc9","userType":"供应商","userProfile":{"company":"广州锦腾有限公司"},"phone":"13510271110"}},"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56c6b4860616999b02e88204","productName":"a","productAmount":"3","productUnit":"吨","shipAddress":"","purUserId":"569c59b812088a90f6864e25","name":"20160219142158491","state":"待支付","createdOn":"2016-02-19T06:21:58.491Z","unitPrice":"456333","sumPrice":1368999,"supUserId":"569c5d2f9eeeeae6f64aabc9","quotationCount":1,"supUer":{"_id":"569c5d2f9eeeeae6f64aabc9","userName":null,"phone":"13510271110","userType":"供应商","hashPassword":"3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d","isLockout":false,"createdOn":"2016-01-18T03:34:07.555Z","ifAuditPass":false,"userProfile":{"_id":"569c5d2f9eeeeae6f64aabca","company":"广州锦腾有限公司","userId":"569c5d2f9eeeeae6f64aabc9","userType":"供应商","userProfile":{"company":"广州锦腾有限公司"},"phone":"13510271110"}},"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56c6ac340616999b02e88203","productName":"a","productAmount":"1","productUnit":"s","shipAddress":"","purUserId":"569c59b812088a90f6864e25","name":"20160219134628466","state":"待支付","createdOn":"2016-02-19T05:46:28.466Z","unitPrice":"3542","sumPrice":3542,"supUserId":"569c5d2f9eeeeae6f64aabc9","quotationCount":1,"supUer":{"_id":"569c5d2f9eeeeae6f64aabc9","userName":null,"phone":"13510271110","userType":"供应商","hashPassword":"3d4f2bf07dc1be38b20cd6e46949a1071f9d0e3d","isLockout":false,"createdOn":"2016-01-18T03:34:07.555Z","ifAuditPass":false,"userProfile":{"_id":"569c5d2f9eeeeae6f64aabca","company":"广州锦腾有限公司","userId":"569c5d2f9eeeeae6f64aabc9","userType":"供应商","userProfile":{"company":"广州锦腾有限公司"},"phone":"13510271110"}},"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56a08adafb3dcd2602ed0d1f","productName":"a","productAmount":"2","productUnit":"e","shipAddress":"","purUserId":"569c59b812088a90f6864e25","name":"20160121153802755","state":"报价","createdOn":"2016-01-21T07:38:02.755Z","quotationCount":1,"supUer":null,"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56c42158aadbd49f2d7b0157","productName":"df","productAmount":"3","productUnit":"吨","shipAddress":"","purUserId":"569c59b812088a90f6864e25","name":"2016021715292876","state":"报价","createdOn":"2016-02-17T07:29:28.076Z","quotationCount":0,"supUer":null,"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56c42d91aadbd49f2d7b0158","productName":"a","productAmount":"3","productUnit":"吨","shipAddress":"","purUserId":"569c59b812088a90f6864e25","name":"20160217162137767","state":"报价","createdOn":"2016-02-17T08:21:37.767Z","quotationCount":0,"supUer":null,"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56a58ad89ded5e8053bb997d","productName":"e","productAmount":"3","productUnit":"df","shipAddress":"北京-东城区","purUserId":"569c59b812088a90f6864e25","name":"20160125103920777","state":"报价","createdOn":"2016-01-25T02:39:20.778Z","quotationCount":0,"supUer":null,"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}},{"_id":"56a589089ded5e8053bb997c","productName":"聚乙烯","productAmount":"3","productUnit":"吨","shipAddress":"北京-东城区","purUserId":"569c59b812088a90f6864e25","name":"20160125103136938","state":"报价","createdOn":"2016-01-25T02:31:36.939Z","quotationCount":0,"supUer":null,"purUer":{"_id":"569c59b812088a90f6864e25","userName":null,"phone":"13008885781","userType":"采购商","hashPassword":"70c881d4a26984ddce795f6f71817c9cf4480e79","isLockout":false,"createdOn":"2016-01-18T03:19:20.275Z","ifAuditPass":false,"userProfile":{"_id":"569c59b812088a90f6864e26","company":"什么鬼啊","userId":"569c59b812088a90f6864e25","av":"xxxx","avatar":"","phone":"13008885781","userProfile":{"company":"什么鬼啊"}}}}]}};
                mockHttpService.getDatas = function() {
                    var defer = $q.defer();
                    defer.resolve(this.data);
                    return defer.promise;
                };
                mockMessageService.show = function(tips) {
                    rootScope.message = tips;
                };
            });
        });

        beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, _httpService_, _messageService_){ 
            mockBackend = _$httpBackend_;
            rootScope = _$rootScope_;         
            scope = rootScope.$new();
            httpService = _httpService_;
            messageService = _messageService_;

            listCtrl = $controller('listCtrl', {
                $scope: scope,
                messageService: messageService,
                httpService: httpService,
                $stateParams: stateParams
            });

            scope.$digest();
            state = stateParams.state;
        }));

        it('listCtrl控制器应该被定义', function(){
            expect(listCtrl).toBeDefined();
        });

        it('doRefresh函数应该被定义', function(){
            expect(listCtrl.doRefresh).toBeDefined();
        });

        it('loadMore函数应该被定义', function(){
            expect(listCtrl.loadMore).toBeDefined();
        });

        it('在页面加载时候，列表项应该有１０条数据', function() {
            expect(listCtrl.list.length).toBe(10);
            expect(listCtrl.list[0].productName).toEqual('a');
            expect(listCtrl.listFilterBtn).toBe(false);
            expect(rootScope.message).toEqual('没有报价订单');
        });

        it('doRefresh功能', inject(function($q) {
            listCtrl.doRefresh();
            expect(listCtrl.list.length).toBe(10);
        }));

        it('loadMore功能', function() {
            listCtrl.loadMore();
            expect(listCtrl.list.length).toBe(10);
        });

    });
});