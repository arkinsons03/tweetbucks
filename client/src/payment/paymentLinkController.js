(function() {
    'use strict';

    angular.module('tweetbucks')
        .controller('PaymentLinkController', 
            function($rootScope, $window, $state, $stateParams, $scope, twitterService, Payments, LocalStorageAdapter) {
            
            twitterService.initialize();
            $scope.amoount = 0;

            //is authenticated in twitter?
            if (!twitterService.isReady())  $state.go('twitter');
            $scope.paymentBaseUrl = window.location.protocol  + '//' + window.location.hostname + ':3000/#!/payment/';
            $scope.paymentLinks = {};             
            $scope.twitterAcount = LocalStorageAdapter.get('twitterUser');
            $scope.user = LocalStorageAdapter.get('user');

            var data = Payments.getByFieldValue({field: 'user_id', value : $scope.user.id },() => {
                $scope.paymentLinks = data.payments;
            });
            
            $scope.create = function() {
                var payment =  new Payments();
                payment.user_id = $scope.user.id;
                payment.amount = $scope.amount;
                payment.limit = 1;
                payment.$save();
                $scope.paymentLinks.push(payment);
                $window.location.reload(); //refresh for now to regenerate twitter

            };

    });
})();