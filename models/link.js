var async = require('async');
var util = require('util');

var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

schema.statics.checkLink = function(username, callback) {
    var Link = this;

    async.waterfall([
        function(callback) {
            Link.Find({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                callback(user.link)
            } else {
                callback("No Link");
            }
        }
    ], callback);
};

schema.statics.addlink = function(username, link, callback) {
    var Link = this;

    async.waterfall([
        function(callback) {
            Link.Find({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                Link.remove({username: username}, callback);
            }
            var newLink = new Link({username: username, link: link});
            newLink.save();
        }
    ], callback);
};

exports.Link = mongoose.model('Link', schema);