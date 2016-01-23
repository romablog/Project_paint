var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

  app.get('/', require('./frontpage').get);

  app.get('/login', require('./login').get);
  app.post('/login', require('./login').post);

  app.get('/registry', require('./registry').get);
  app.post('/registry', require('./registry').post);

  app.get('/paint', checkAuth, require('./paint').get);

  app.post('/logout', require('./logout').post);
  app.post('/link', require('./link').post);

};