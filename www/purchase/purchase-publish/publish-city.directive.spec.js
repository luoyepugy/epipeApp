
'use strict';

define(['./publish-city.directive', 'angularMocks'], function() {

    describe('城市下拉选择指令', function() {

        var element, directiveElem, $scope, $compile, $ionicModal, $timeout, $ionicScrollDelegate, cityService;

        function getCompiledElement(){
            element = angular.element('<ionic-city></ionic-city>');
            var compiledElement = $compile(element)($scope);
            $scope.$digest();
            return compiledElement;
        }

        beforeEach(module('myApp.purchase'));
        beforeEach(function() {
            var mockCityService = {};
            var mockIonicModal = {};
            var mockIonicScrollDelegate = {};

            module('myApp.purchase', function($provide) {
                $provide.value('$ionicModal', mockIonicModal);
                $provide.value('cityService', mockCityService);
                $provide.value('$ionicScrollDelegate', mockIonicScrollDelegate);
            });
            inject(function($q) {
                mockIonicModal.fromTemplateUrl = function () {
                    var modal = null;
                    defer = $q.defer();
                    defer.resolve(modal);
                    return defer.promise;
                };
                mockIonicScrollDelegate.$getByHandle = function(handle) {
                    return null;
                };
                mockCityService.cityList = [
                    {
                        "name":"北京",
                        "sub":[
                            {"name":"东城区"},
                            {"name":"西城区"}
                        ]
                    },
                    {
                        "name":"广东",
                        "sub":[
                            {
                                "name":"广州",
                                "sub":[
                                    {"name":"越秀区"},
                                    {"name":"荔湾区"}
                                ]
                            }
                        ]
                    }
                ];
            });
        });
        beforeEach(inject(function(_$rootScope_,_$compile_, _cityService_, _$ionicModal_, _$timeout_, _$ionicScrollDelegate_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            cityService = _cityService_;
            $ionicModal = _$ionicModal_;
            $timeout = _$timeout_;
            $ionicScrollDelegate = _$ionicScrollDelegate_;

            spyOn($ionicModal, 'fromTemplateUrl');

            directiveElem = getCompiledElement();
        }));

        it('测试', function() {
            expect($scope.provinceHandle).toEqual('a');
        });

    });
});