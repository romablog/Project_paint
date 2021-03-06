var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', require('./frontpage').get);

  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);

  app.get('/registry', require('./registry').get);
  app.post('/registry', require('./registry').post);

  app.get('/paint', checkAuth, require('./paint').get);

  app.post('/logout', require('./logout').post);
  app.post('/link', require('./link').post);
  app.get('/link', require('./link').get);

};