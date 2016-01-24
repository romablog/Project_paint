var async = require('async');
var util = require('util');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//var $ = require('jquery');


var mongoose = require('../libs/mongoose'),
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
    },
    deleteHash: {
        type: String,
        required: true
    }
});

schema.statics.checkLink = function(username, callback) {
    var Link = this;
    async.waterfall([
        function(callback) {
            Link.findOne({username: username}, callback);
        },
        function(lin, callback) {
            if (lin) {
                callback(lin.link)
            } else {
                callback("No Link");
            }
        }
    ], callback);
};

schema.statics.addlink = function(username, link, deleteHash, callback) {
    var Link = this;
    console.log("add Hello");
    async.waterfall([
        function(callback) {
            Link.findOne({username: username}, callback);
        },
        function(user, callback) {
            if (user) {
                console.log("find succeeded");
                deleteImage(user.deleteHash);
                Link.remove({username: username}, callback);
            }
            var newLink = new Link({username: username, link: link, deleteHash: deleteHash});
            newLink.save();
        }
    ], callback);
};

function deleteImage(url){
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function() {
        console.log("deletion succeeded");
    });
    oReq.open("DELETE", "http://api.imgur.com/3/image/" + url);
    oReq.send();
}

exports.Link = mongoose.model('Link', schema);