(function() {
    'use strict';

define(['./others.module', 'cordova'], function(others) {
    others.controller('paymentCtrl', paymentCtrl);
    
    /* @ngInject */
    function paymentCtrl($scope, $stateParams, config, httpService, messageService, $state){
        var vm = $scope;
            vm.onlinePay = onlinePay;

        // 订单号和价格变量
        var id = $stateParams.id,
            price = $stateParams.price;

        var url = '/pay/clientNotify';

        // 在线支付
        function onlinePay() {
            window.alipay.pay({
                tradeNo: id,
                subject: "采购商",
                body: "采购商",
                price: price,
                notifyUrl: config.host + '/pay/serverNotify'
            }, function(successResults){
                // alert(JSON.stringify(successResults));
                url = url + '?' + successResults.result;
                if(successResults.resultStatus == "9000") {
                    reload();
                }
            }, function(errorResults){
                // alert(JSON.stringify(errorResults));
                messageService.show(errorResults.memo);
            });
        }

        function reload() {
            httpService.getDatas('POST',url)
            .then(function(data) {
                $state.go('purchase.order', {'id': id});
            });
        }
    };
});

})();

// cordova plugin add https://github.com/charleyw/cordova-plugin-alipay.git --variable PARTNER_ID=2088611778548674 --variable SELLER_ACCOUNT=info@epipe.cn --variable PRIVATE_KEY=MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMHg80bqhBFbam47BQ8aQRvwosHEe9WW4WCy4WpKOmA0QCr8a/rmb/CdNVc1uQNhdMpqWGw7nIXAmJ9Y26NoMIhrV7XUTwHLISRju7iWANoUy3TlhuuUn+G5wnBjZ74UGpD3srvw5YkaOflpKGxFo7Se0BMRC+ZSrMkXJbZK7H3BAgMBAAECgYAczJR2mUlq5qBlpWC4AJdhVhpnHA+lB5eM7KVtS39mYPyTJhHIIEjKfh+5R6Km7OgTVT6zPRugBp7lNKbTnBtxNc01qVZpBbwHer8TTWL47JWewdvI94YTpVMFa0SHHcYN1E08i8XZm/pomUfg+9aFXcWMszXp9YOKXA/MQWbznQJBAPJKzUMBalAJuHWN2IFRwH48SynhjUSeSyh6mIemyAw13SW4TTgiBxyop9gEmvevK00mNanTXBEJ8v9c/OpZny8CQQDM2PXBFSYwq4UaNjyHR0xM1bViEIhhH9M5TNHvHBHRlfrkLIg0AbdTN1DJRWsEY72QLGPdimXS8H6I6LgVW/YPAkEAvt3UQuObhz+REvHRy1XGaOtAXtayvYphNJsXC02EK7JG6w77rauIpLfruM0v8swINXdTMNwym62VwjrTdh1xuwJASgDnZ4W4ckTEpR+K5mQ/kFJ0YKUQX+YbbMvv264MUecY6G2eFwu3qvyE1vGZI9DUns0qltJ0zqvLSrKoLi82yQJBAL30RM1RjizqRbVi98qZsI+72LLfoFTK+HQwiY73ZwEvACINzORkQ1RI4ZvBhdl1fRc85Qu225GepBNPifVNsRQ=