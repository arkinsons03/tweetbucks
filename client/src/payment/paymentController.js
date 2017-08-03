(function() {
    'use strict';

    angular.module('tweetbucks')
        .controller('PaymentController', function($rootScope, $state, $stateParams, $scope, twitterService, paymentService) {
            
            var id = ($stateParams.id) || '';

            twitterService.initialize();
            console.log(id);            

            //is authenticated in twitter?
            if (!twitterService.isReady())  $state.go('twitter', {'from' : 'payment', 'id': id});


    });
})();