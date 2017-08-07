(function() {
    'use strict';

    angular.module('tweetbucks')
        .controller('PaymentController', 
            function($q, $rootScope, $state, $stateParams, $scope, twitterService, Payments, LocalStorageAdapter, User, Transactions) {
            
            var id = ($stateParams.id) || '';

            twitterService.initialize();
            $scope.message = '';
            $scope.error = '';
            $scope.amount = 0;

            //is authenticated in twitter?
            if (!twitterService.isReady())  $state.go('twitter', {'from' : 'payment', 'id': id});

            $scope.user = LocalStorageAdapter.get('user');
            $scope.twitterAcount = LocalStorageAdapter.get('twitterUser');

            //get the payment record
            //check if sender and receiver are just the same
            //check if sender mentioned the receiver [@pending]
            //check if sender has enough funds on his account
            //if this condition are satisfied, continue with the transfer
            //debit amount to sender's balance
            //credit to receiver's balance
            //save transaction
            //@todo flatten promise
            Payments.get({id : id} , (data) => {
                console.log(data);
               // payment = data;

               //is sender !== authenticated user?
               if ($scope.user.id !== data.user_id) {

                   // @todo flatten promise
                   //debit to sender / or payment owner
                   User.get({id : data.user_id}, (sender) => {

                       //if sender's balance suffecient
                       if (sender.balance >= data.amount) {
                           sender.balance = (sender.balance - data.amount);
                           User.update({id: sender.id}, sender);  

                            //credit to receiver / current authenticated user
                            User.get({id : $scope.user.id}, (receiver) => {
                                receiver.balance = (receiver.balance + data.amount);
                                User.update({id: receiver.id}, receiver);

                                //Save transactions
                                var senderTransaction = new Transactions();
                                senderTransaction.amount = -1 * (data.amount);
                                senderTransaction.user_id = data.user_id;
                                senderTransaction.name = receiver.twitter_handle;
                                senderTransaction.type = 'send';
                                senderTransaction.$save();

                                var receiverTransaction = new Transactions();
                                receiverTransaction.amount = (data.amount);
                                receiverTransaction.user_id = $scope.user.id;
                                receiverTransaction.name = sender.twitter_handle;
                                receiverTransaction.type = 'received';
                                receiverTransaction.$save();

                            }, () => {});         

                       } else {
                           $scope.error = "Insuffecient fund.";                           
                       }
                    }, () => { //$resource exception handling
                        $scope.error = "Transaction process failed.";
                    });

                } else {
                   $scope.error = "You cannot transfer funds to yourself.";
                }

               //get payment amount
               $scope.amount = data.amount;

            }, (err) => {
                console.log(err);
                $scope.error = "Transaction process failed.";
            });

    });
})();