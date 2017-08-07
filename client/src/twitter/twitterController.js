
(function() {
    'use strict';

    angular.module('tweetbucks').controller('TwitterController', 
        function($scope, $state, $stateParams, $q, twitterService, LocalStorageAdapter, User) {
        //$scope.tweets = []; //tweets

        console.log($stateParams);
        twitterService.initialize();

        //if the user is a returning user, redirect to dashboard
        if (twitterService.isReady()) {
            if ($stateParams.from) {
                var params =  ($stateParams.id) ? {id : $stateParams.id} : {};
                $state.go($stateParams.from, params);
            } else {
                $state.go('dashboard');
            }            
        }
        $scope.twitterUser = null;

        //when the user clicks the connect twitter button, the popup authorization window opens
        $scope.connectButton = function() {
            twitterService.connectTwitter().then(() => {
                if (twitterService.isReady()) {

                    twitterService.getAuthenticatedUser().then(function(twitterUser) {
                        var deferred = $q.defer();    

                        $scope.twitterUser = twitterUser || null;  
                        LocalStorageAdapter.set('twitterUser', twitterUser);     

                        //check if user with twitter handle is already exist
                        User.getByHandle({handle:  $scope.twitterUser.alias },function(data) {
                            deferred.resolve(data); 
                        }, function(err) {
                             deferred.reject(err);
                        });

                        return deferred.promise;                        

                    }).then((data) =>  {
                        if (data.hasOwnProperty('user')) {
                            LocalStorageAdapter.set('user', data.user);                                 
                        } else {
                            var user = new User({
                                'twitter_handle' :  $scope.twitterUser.alias,
                                'twitter_id' :  $scope.twitterUser.id,
                                'balance': '10000'                  
                            });
                            
                            user.$save(function(savedUser) {
                                LocalStorageAdapter.set('user', savedUser);     
                            });

                        }

                        //if the authorization is successful, go to dashboard
                        //if it is from another page that requires authentication, then return to previous page
                        if ($stateParams.from) {
                            var params =  ($stateParams.id) ? {id : $stateParams.id} : {};                    
                            $state.go($stateParams.from, params);
                        } else {
                            $state.go('dashboard');
                        }  

                    }).catch((err) => {
                        console.log(err);
                    });                       

                } else {
                    //prompt user that the twitter authorization has failed
                }
            });
        };

        //init user
        //@deprecated
        /** /
        if (twitterService.isReady()) {
            twitterService.getAuthenticatedUser().then(function(twitterUser) {
                $scope.user  = twitterUser || null;     
                 console.log($scope.user);
                 console.log($scope.user.id.length);

            });
        }
        /**/

        //extract data from tweet
        //@deprecated
        /** /
        $scope.extractData = function(text, key) {
            var data = text.split(" ");
            var filteredData = data.filter(function(entry) { return /\S/.test(entry); }); //remove white spaces
            if (key === 'amount') {
                return filteredData[2];
            } else if (key === 'receiver') {
                return filteredData[4];
            }
        };
        /**/

        //update authenticated user
        //@deprecated
        /*
        $scope.$watch('connectedTwitter', function(newVal) {
            if (newVal == true) {
                twitterService.getAuthenticatedUser().then(function(twitterUser) {
                    console.log(twitterUser);
                    $scope.user  = twitterUser;    
                   

                });            
            }
            
        });
        /**/

        //using the OAuth authorization result get the latest 20 tweets from twitter for the user
        //@deprecated
        /** /
        $scope.refreshTimeline = function() {
            twitterService.getTweets().then(function(data) {
                console.log(data.statuses);
                $scope.tweets = $scope.tweets.concat(data.statuses);
            }, function() {
                $scope.rateLimitError = true;
            });
        }
        /** */



        //sign out clears the OAuth cache, the user will have to reauthenticate when returning
        //@deprecated
        /** /
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
        /***/

    });    

})();
