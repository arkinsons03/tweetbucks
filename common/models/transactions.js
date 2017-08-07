'use strict';

module.exports = function(Transactions) {
    Transactions.search = function(field, value, callback) {
        var transactionObject = Transactions.app.models.transactions;

        //add filter
        var filter = {};
            filter[field] = value;

        transactionObject.find({where: filter}, (err, transData) => {  
            if (err) {
                console.log('   search via field values ', err);
            }
            console.log('   success Transactions.search');
            callback(err, transData);
         });     
    };

    /**
     * search endpoint supports all fieldsvalues filter
     */
    Transactions.remoteMethod('search', {
        http: {path: '/search', verb: 'get', status: 200, errorStatus: 400},
        accepts: [
            {arg: 'field', type: 'string'},
            {arg: 'value', type: 'string'}
        ],
        description: 'Search By Field and Value',
        note: 'Search By Field and Value',
        returns: {arg: 'transactions', type: 'Object'}
    });
};
