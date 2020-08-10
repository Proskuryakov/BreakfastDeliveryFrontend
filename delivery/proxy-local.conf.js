module.exports = [
  {
    context: '/api',
    target: 'http://127.0.0.1:8081',
    secure: false,
    changeOrigin: true
  },
  {
    context: '/api/auth',
    target: 'http://127.0.0.1:8081',
    secure: false,
    changeOrigin: true
  }
];
