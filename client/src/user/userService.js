(function(){
    'use strict';
    angular.module('tweetbucks').factory('User', function($resource) {
        return $resource('/api/users/:id',
            { id: '@id'},
            { 
                getByHandle: {
                    url: '/api/users/search?handle=:handle',
                    method: 'GET', 
                    params: {handle : '@handle'},
                    isArray: false
                },
                update: { method:'PUT' }                
            }
        );
    });
})();