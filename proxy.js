const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/195.35.16.37:3000',
    createProxyMiddleware({
      target: 'http://195.35.16.37:3000',
      changeOrigin: true,
    })
  );
};
