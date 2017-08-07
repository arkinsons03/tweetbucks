'use strict';

module.exports = function(Payments) {
    Payments.search = function(field, value, callback) {
        var paymentsObject = Payments.app.models.payments;

        //add filter
        var filter = {};
            filter[field] = value;

        paymentsObject.find({where: filter}, (err, data) => {  
            if (err) {
                console.log('   search via field values ', err);
            }
            console.log('   success Payments.search');
            callback(err, data);
         });     
    };

    /**
     * search endpoint supports all fieldsvalues filter
     */
    Payments.remoteMethod('search', {
        http: {path: '/search', verb: 'get', status: 200, errorStatus: 400},
        accepts: [
            {arg: 'field', type: 'string'},
            {arg: 'value', type: 'string'}
        ],
        description: 'Search By Field and Value',
        note: 'Search By Field and Value',
        returns: {arg: 'payments', type: 'Object'}
    });
};
