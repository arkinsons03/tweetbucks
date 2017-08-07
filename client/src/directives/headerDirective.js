(function(){
    'use strict';

     angular.module('tweetbucks').directive('header', function($state, twitterService, LocalStorageAdapter) {
         return {
             restrict: "E",
             replace: true,
             templateUrl: "./src/directives/_header.html",
             link : function( scope, element, attrs, controllers ) { 

                scope.twitterAcount = LocalStorageAdapter.get('twitterUser');
                scope.user = LocalStorageAdapter.get('user');                 
                
                scope.signOut = function() {
                    twitterService.clearCache();    
                    $state.go('twitter');      
                    LocalStorageAdapter.clear('user');      
                    LocalStorageAdapter.clear('twitterUser');      
                };    
                 
             }
         };
     });
})();