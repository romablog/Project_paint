var Link = require('models/link').Link;
var imgur = require('imgur');
exports.post = function(req, res, next) {
    var canvas = req.body.data;
    console.log("canvas here");

    upload(canvas);

    function upload(file) {
        //if (!file || !file.type.match(/image.*/)) return;
        console.log(file);
        var b64 = file.substr(23);
        console.log(b64);
        //imgur.setClientId('');
        imgur.uploadBase64(b64)
            .then(function (json) {
                console.log(json.data);
                var link = json.data.link;
                var user = res.locals.user.username;
                var deleteHash = json.data.deletehash;
                Link.addlink(user, link, deleteHash);
            })
            .catch(function (err) {
                console.error(err.message);
            });



        //consoleJSON.parse(file.data);
        /*
         var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
         fd.append("image", file); // Append the file
         var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
         xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
         xhr.onload = function() {
         var link = JSON.parse(xhr.responseText).data.link;
         var user = user.get('username');
         Link.addlink(user, link);
         };
         xhr.setRequestHeader('Authorization', user.get('username')); // Get your own key http://api.imgur.com/
         xhr.send(fd);
         */
    }
};