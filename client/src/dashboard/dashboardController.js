(function() {
    'use strict';
    angular.module('tweetbucks')
        .controller('DashboardController', function($scope, $state, $q, twitterService, User, LocalStorageAdapter) {            
            //is authenticated in twitter?
            if (!twitterService.isReady())  $state.go('twitter', {'from' : 'dashboard'});
            $scope.transactions = {};
            
            $scope.twitterAcount = LocalStorageAdapter.get('twitterUser');
            $scope.user = LocalStorageAdapter.get('user');

            $scope.signOut = function() {
                twitterService.clearCache();    
                $state.go('twitter');      
                LocalStorageAdapter.clear('user');      
                LocalStorageAdapter.clear('twitterUser');      
            };            

    });
})();