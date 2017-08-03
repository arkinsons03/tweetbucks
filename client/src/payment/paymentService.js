(function() {
    'use strict';
    angular.module('tweetbucks').factory('paymentService', function($q) {
        var publicUrl;
        var id;

        return {
            getPublicUrl: function() {
                return publicUrl;
            },
            setPublicUrl: function(url) {
                publicUrl = url;
            },
            setId: function(id) {
                id = id;
            },
            getId: function() {
                
            }
        };
    });
})();