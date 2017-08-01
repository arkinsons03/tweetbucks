
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

        //extract data from tweet
        $scope.extractData = function(text, key) {
            var data = text.split(" ");
            var filteredData = data.filter(function(entry) { return /\S/.test(entry); }); //remove white spaces
            if (key === 'amount') {
                return filteredData[2];
            } else if (key === 'receiver') {
                return filteredData[4];
            }
        };

        //update authenticated user
        $scope.$watch('connectedTwitter', function(newVal) {
            if (newVal == true) {
                twitterService.getAuthenticatedUser().then(function(twitterUser) {
                    console.log(twitterUser);
                    $scope.user  = twitterUser;     
                });            
            }
        });

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
                    $('#login-box').fadeOut(function() {
                        $('#ledger').fadeIn();
                        $scope.refreshTimeline();
                        $scope.connectedTwitter = true;
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

            $('#ledger').fadeOut(function() {
                $('#login-box').fadeIn();
                $scope.$apply(function() {
                    $scope.connectedTwitter = false
                });
            });

        }

        //if the user is a returning user, hide the sign in button and display the tweets
        if (twitterService.isReady()) {
            $('#login-box').hide();
            $('#ledger').show();
            $scope.connectedTwitter = true;
            $scope.refreshTimeline();
        }
    });    

})();
