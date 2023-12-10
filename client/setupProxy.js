const { createProxyMiddleware } = require("http-proxy-middleware");

// // src/setupProxy.js
// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware("/home", {
//       target: "http://35.230.55.35:8081/", // 비즈니스 서버 URL 설정
//       changeOrigin: true,
//     })
//   );
// };

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/home", {
      target: "http://35.230.55.35:8081/home", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    }),
  );
  app.use(
    createProxyMiddleware("/join", {
      target: "http://35.230.55.35:8081/join", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    }),
  );

  app.use(
    createProxyMiddleware("/login", {
      target: "http://35.230.55.35:8081/login", // 비즈니스 서버 URL 설정
      changeOrigin: true,
    }),
  );
};