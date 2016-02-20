(function() {
    'use strict';

define(['./app.module'], function(app) {
    app.config(route);

    /* @ngInject */
    function route($stateProvider, $urlRouterProvider) {
        $stateProvider
        // home
        .state('home', {
            url: "/home",
            templateUrl: "purchase/home/home.html",
            controller: 'homeCtrl'
        })
        
        // account
        .state('login', {
            url: '/login',
            templateUrl: "user/account/login.html"
        })
        .state('register', {
            url: '/register',
            templateUrl: "user/account/register.html",
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
        .state('findPwd', {
            url: '/findPwd',
            templateUrl: "user/account/findPwd.html",
            controller: 'findPwdCtrl',
            controllerAs: 'vm'
        })
        .state('resetPwd', {
            url: '/resetPwd/:phone/:code',
            templateUrl: "user/account/resetPwd.html",
            controller: 'resetPwdCtrl',
            controllerAs: 'vm'
        })

        // purchase
        .state('purchase', {
            url: "/purchase",
            "abstract": true,
            templateUrl: "purchase/purchase.html"
        })
        .state('purchase.publish', {
            url: '/publish',
            views:{
                'purchase-publish':{
                    templateUrl: "purchase/purchase-publish/publish.html"
                }
            }
        })
        .state('purchase.list', {
            url: '/list/:state',
            cache: 'false',
            views:{
                'purchase-list':{
                    templateUrl: "purchase/purchase-list/list.html",
                    controller: 'listCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        .state('purchase.getProfile', {
            url: '/user',
            cache: 'false',
            views:{
                'user-getProfile':{
                    templateUrl: "user/user-profile/getProfile.html",
                    controller: 'getProfileCtrl',
                    controllerAs: 'vm'                   
                }
            }
        })

        // user
        .state('purchase.changeProfile', {
            url: '/changeProfile',
            cache: 'false',
            views:{
                'user-getProfile':{
                    templateUrl: "user/user-profile/changeProfile.html",
                    controller: 'changeProfileCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        .state('purchase.changePwd', {
            url: '/changePwd',
            views:{
                'user-getProfile':{
                    templateUrl: "user/user-profile/changePwd.html"
                }
            }
        })
        
        // purchase-process    
        .state('purchase.offer', {
            url: '/offer/:id',
            cache: 'false',
            views:{
                'purchase-list':{
                    templateUrl: "purchase/purchase-process/offer.html",
                    controller: 'offerCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        .state('purchase.order', {
            url: '/order/:id',
            cache: 'false',
            views:{
                'purchase-list':{
                    templateUrl: "purchase/purchase-process/order.html",
                    controller: 'orderCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        .state('purchase.payment', {
            url: '/payment',
            views:{
                'purchase-list':{
                    templateUrl: "purchase/pay/payment.html"
                }
            }
        })
        .state('purchase.payHelp', {
            url: '/payHelp',
            views:{
                'purchase-list':{
                    templateUrl: "purchase/pay/pay-help.html"
                }
            }
        })
        .state('purchase.logistics', {
            url: '/logistics/:id',
            cache: 'false',
            views:{
                'purchase-list':{
                    templateUrl: "purchase/purchase-process/logistics.html",
                    controller: 'logisticsCtrl',
                    controllerAs: 'vm'
                }
            }
        });

        $urlRouterProvider.otherwise('/home');
    };

});

})();