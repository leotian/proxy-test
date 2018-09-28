let hoxy = require('hoxy');
let proxy = hoxy.createServer().listen(8080);
proxy.intercept('request', req => {
  req.headers['x-unicorns'] = 'unicorns';
  // server will now see the "x-unicorns" header
});
