(function() {
    'use strict';
    angular.module('tweetbucks')
        .controller('DashboardController',
            function($scope, $state, $q, twitterService, User, Transactions, LocalStorageAdapter) {   

            //is authenticated in twitter?
            if (!twitterService.isReady())  $state.go('twitter', {'from' : 'dashboard'});
            $scope.transactions = {};
            $scope.user = LocalStorageAdapter.get('user');

            //fetch all transactions
            var transactionResults = Transactions.getByFieldValue({field: 'user_id', value : $scope.user.id },() => {
                $scope.transactions = transactionResults.transactions;
            });

    });
})();