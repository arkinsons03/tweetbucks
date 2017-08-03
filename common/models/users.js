'use strict';

var loopback = require('loopback');
var app = require('../../server/server'); 

module.exports = function(Users) {
    Users.search = function(handle, callback) {
        var userObject = Users.app.models.users;
        userObject.find({where:{twitter_handle : handle}, limit: 1}, (err, user) => {  
            if (err) {
                console.log('   search via twitter handle ', err);
            }
            console.log('   success User.search');
            console.log(user);
            callback(err, user[0]);
         });     
    };

    /**
     * @note supports search by twitter handle only (intended)
     */
    Users.remoteMethod('search', {
        http: {path: '/search', verb: 'get', status: 200, errorStatus: 400},
        accepts: {arg: 'handle', type: 'string'},
        description: 'Search Twitter Handle',
        note: 'Search method via twitter_handle',
        returns: {arg: 'user', type: 'Object'}
    });
};
