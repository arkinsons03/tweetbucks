/**
 * Main module TweetBucks app
 * @author winaum@me.com
 */
(function() {
    'use strict';

    var config_data = {
        GENERAL_CONFIG: {
            APP_NAME: "TweetBucks"
        }
    },
    config_module = angular.module('general.config', []);
    angular.forEach(config_data, function(key, value) {
        config_module.constant(value, key);
    });
    
    
    var _templateBase = './src';
    angular.module("tweetbucks",[
        'ngSanitize', 
        'ngResource',
        'twitterApp.services',
        'ui.router',
        'LocalStorageAdapter'
    ]).config(function($stateProvider, $urlRouterProvider, $qProvider, $resourceProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('twitter', {
            url: '/?:from:id',
            cache: false,
            views: {
                'twitter' : {
                    templateUrl : _templateBase + '/twitter/twitter-connect.html',
                    controller : 'TwitterController'
                }
            }
        }).state('dashboard', {
            url : '/dashboard',
            cache: false,
            views : {
                'dashboard' : {
                    templateUrl : _templateBase + '/dashboard/dashboard.html',
                    controller : 'DashboardController'
                }
            }
        }).state('payment', {
            url : '/payment/:id',
            cache: false,
            views : {
                'payment' : {
                    templateUrl : _templateBase + '/payment/payment.html',
                    controller : 'PaymentController'
                }
            }
        }).state('links', {
            url : '/payment-links',
            cache: false,
            views : {
                'link' : {
                    templateUrl : _templateBase + '/payment/payment-list.html',
                    controller : 'PaymentLinkController'
                }
            }
        });        
    });
})();   