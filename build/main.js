require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_compression__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_compression___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_compression__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express_session__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_nuxt__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_router__ = __webpack_require__(5);



// import connectRedis from 'connect-redis'




var app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
var port = process.env.PORT || 3000;
// const RedisStore = connectRedis(session)

app.use(__WEBPACK_IMPORTED_MODULE_1_compression___default()());
app.use(__WEBPACK_IMPORTED_MODULE_2_express_session___default()({
  // store: new RedisStore({
  //   host: '47.104.27.50',
  //   port: 3678,
  //   pass: 'Redis!321.'
  // }),
  secret: 'hello world 2018',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use('/api', __WEBPACK_IMPORTED_MODULE_4__api_router__["a" /* default */]);

var config = __webpack_require__(11);
config.dev = !("production" === 'production');
var nuxt = new __WEBPACK_IMPORTED_MODULE_3_nuxt__["Nuxt"](config);
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_3_nuxt__["Builder"](nuxt);
  builder.build();
}

app.get('/entry', function (req, res) {
  res.redirect('/entry/login');
});
app.get('/', function (req, res) {
  res.redirect('/index/5');
});
app.get('/index', function (req, res) {
  res.redirect('/index/5');
});

app.use(nuxt.render);

app.listen(port);
console.log('Server listening on ' + ':' + port);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http_proxy_middleware__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_http_proxy_middleware___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_http_proxy_middleware__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_qs__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_qs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(10);
/**
 * API路由处理
 */









var router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();
var jsonParser = __WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json();
var urlencodedParser = __WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: false });

var axiosInstance = __WEBPACK_IMPORTED_MODULE_1_axios___default.a.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Device': 'website'
  }
});

// 登录检查
var checkLogin = function checkLogin(req, res, next) {
  return req.session.userData ? next() : res.json({
    error_code: '1',
    info: 'Please login.'
  });
};

// 用户登录
router.post('/login.json', urlencodedParser, function (req, res) {
  var _req$body = req.body,
      userName = _req$body.userName,
      password = _req$body.password;

  axiosInstance.post(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* APIURL */] + '/student_login.json', __WEBPACK_IMPORTED_MODULE_4_qs___default.a.stringify({
    userName: userName, password: password
  })).then(function (_ref) {
    var data = _ref.data;

    if (data.error_code === '0') {
      req.session.userData = { userName: userName, password: password };
    }
    res.json(data);
  }).catch(function (err) {
    res.json({ error_code: '504', info: err.message });
  });
});

// 用户退出
router.post('/logout.json', urlencodedParser, function (req, res) {
  axiosInstance.post(__WEBPACK_IMPORTED_MODULE_5__config__["a" /* APIURL */] + '/student_logout.json', __WEBPACK_IMPORTED_MODULE_4_qs___default.a.stringify({
    token: req.body.token
  })).then(function (_ref2) {
    var data = _ref2.data;

    delete req.session.userData;
    res.json(data);
  }).catch(function (err) {
    res.json({ error_code: '504', info: err.message });
  });
});

// 启用HTTP代理
router.use('/**', __WEBPACK_IMPORTED_MODULE_2_http_proxy_middleware___default()({
  target: __WEBPACK_IMPORTED_MODULE_5__config__["a" /* APIURL */],
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
}));

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("http-proxy-middleware");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APIURL; });
/**
 * 后台配置
 */

var APIURL = process.env.APIURL || 'http://47.104.27.50:88/circcus/api/student';

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-circcus',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width' }, { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'http://cdn.bootcss.com/strophe.js/1.2.8/strophe.min.js' }]
  },
  /*
  ** Global CSS
  */
  css: [
  // { src: 'element-ui/lib/theme-chalk/index.css' },
  { src: '~assets/scss/base.scss', lang: 'scss' }],
  /**
   * Add plugins
   */
  plugins: [{ src: '~plugins/element-ui', ssr: true }, { src: '~components/inbox/core', ssr: false }],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'element-ui', 'email-validator', 'moment', 'localforage']
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map