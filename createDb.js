var mongoose = require('./libs/mongoose');
var async = require('async');

async.series([
    open,
    dropDataBase,
    requireModels,
    createUsers
], function(err){
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback){
    mongoose.connection.on('open', callback);
}

function dropDataBase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}