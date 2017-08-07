(function() {
    'use strict';
    angular.module('tweetbucks').factory('Payments', function($resource) {
        return $resource('/api/payments/:id',
            { id: '@id'},
            { 
                getByFieldValue: {
                    url: '/api/payments/search?field=:field&value=:value',
                    method: 'GET', 
                    params: {field : '@field', value : '@value'},
                    isArray: false
                }
            }        
        );
    });
})();