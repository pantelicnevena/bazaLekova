module.exports = function(server) {
  // Install a `/` route that returns server status
  var path = require('path');
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
