
(function() {
    'use strict';

    angular.module('tweetbucks').controller('TwitterController', function($scope, $q, twitterService) {
        $scope.tweets = []; //tweets
        $scope.user = null;
        $scope.connectedTwitter = false;

        twitterService.initialize();

        //init user
        if (twitterService.isReady()) {
            twitterService.getAuthenticatedUser().then(function(twitterUser) {
                $scope.user  = twitterUser || null;     
            });
        }

        //using the OAuth authorization result get the latest 20 tweets from twitter for the user
        $scope.refreshTimeline = function() {
            twitterService.getTweets().then(function(data) {
                console.log(data.statuses);
                $scope.tweets = $scope.tweets.concat(data.statuses);
            }, function() {
                $scope.rateLimitError = true;
            });
        }

        //when the user clicks the connect twitter button, the popup authorization window opens
        $scope.connectButton = function() {
            twitterService.connectTwitter().then(function() {
                if (twitterService.isReady()) {
                    //if the authorization is successful, hide the connect button and display the tweets
                    $('#connectButton').fadeOut(function() {
                        $('#getTimelineButton, #signOut').fadeIn();
                        $scope.refreshTimeline();
                        $scope.connectedTwitter = true;
                    });
                    
                    twitterService.getAuthenticatedUser().then(function(twitterUser) {
                        $scope.user  = twitterUser || null;     
                    });
                    
                } else {

                }
            });
        }

        //sign out clears the OAuth cache, the user will have to reauthenticate when returning
        $scope.signOut = function() {
            twitterService.clearCache();
            $scope.tweets.length = 0;
             $scope.user = null;
            $('#getTimelineButton, #signOut').fadeOut(function() {
                $('#connectButton').fadeIn();
                $scope.$apply(function() {
                    $scope.connectedTwitter = false
                })
            });
        }

        //if the user is a returning user, hide the sign in button and display the tweets
        if (twitterService.isReady()) {
            $('#connectButton').hide();
            $('#getTimelineButton, #signOut').show();
            $scope.connectedTwitter = true;
            $scope.refreshTimeline();
        }
    });    

})();
