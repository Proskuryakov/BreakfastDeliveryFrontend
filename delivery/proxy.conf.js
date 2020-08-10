module.exports = [
  {
    context: '/api',
    target: 'http://127.0.0.1:8080',
    secure: true,
    changeOrigin: true
  },
  {
    context: '/api/auth',
    target: 'http://127.0.0.1:8080',
    secure: true,
    changeOrigin: true,
    onProxyRes: proxyResponse => {
      if (proxyResponse.headers['set-cookie']) {
        proxyResponse.headers['set-cookie'] = proxyResponse.headers['set-cookie'].map(cookie => {
          return cookie
          .replace(/; secure/gi, '')
          .replace(/Domain=localhost/gi, 'Domain=localhost');
        });
      }
    },
  }
];
