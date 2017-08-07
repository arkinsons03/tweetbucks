(function() {
    'use strict';
    angular.module('tweetbucks').factory('Transactions', function($resource) {
        return $resource('/api/transactions/:id',
            { id: '@id'},
            { 
                getByFieldValue: {
                    url: '/api/transactions/search?field=:field&value=:value',
                    method: 'GET', 
                    params: {field : '@field', value : '@value'},
                    isArray: false
                }
            }        
        );
    });    
})();