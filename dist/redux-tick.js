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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: createTickEnhancer, stopAll, startAll, getTickers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTickEnhancer", function() { return createTickEnhancer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stopAll", function() { return stopAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startAll", function() { return startAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTickers", function() { return getTickers; });
/* harmony import */ var _ticker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ticker */ "./src/ticker.js");

/**
 * Creates a redux store enhancer which will fire actions at a configured
 * interval at your store.
 *
 * @param config {Object} the configuration for the actions see readme
 * {
 *      interval,
 *      startImmediately: {boolean} true by default
 *      actions: {
 *          type : { type, payload, interval* },
 *          type : { type, payload, interval* },
 *          type : { type, payload, interval* }
 *      }
 *  }
 * @returns {function} store enhancer
 */

var createTickEnhancer = function createTickEnhancer(config) {
  var ticker = new _ticker__WEBPACK_IMPORTED_MODULE_0__["Ticker"](config);
  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      ticker.bindStore(store);

      if (config.startImmediately === undefined || config.startImmediately === true) {
        ticker.start();
      }

      return store;
    };
  };
};
var stopAll = function stopAll() {
  _ticker__WEBPACK_IMPORTED_MODULE_0__["Ticker"].getInstances().forEach(function (ticker) {
    return ticker.stop();
  });
};
var startAll = function startAll() {
  _ticker__WEBPACK_IMPORTED_MODULE_0__["Ticker"].getInstances().forEach(function (ticker) {
    return ticker.start();
  });
};
var getTickers = function getTickers() {
  return _ticker__WEBPACK_IMPORTED_MODULE_0__["Ticker"].getInstances();
};

/***/ }),

/***/ "./src/maths.js":
/*!**********************!*\
  !*** ./src/maths.js ***!
  \**********************/
/*! exports provided: gcd */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gcd", function() { return gcd; });
var gcdPair = function gcdPair(a, b) {
  if (a == 0) {
    return b;
  }

  return gcdPair(b % a, a);
};

var gcd = function gcd(numbers) {
  var result = numbers[0];

  for (var i = 1; i < numbers.length; i++) {
    result = gcdPair(numbers[i], result);

    if (result == 1) {
      return 1;
    }
  }

  return result;
};

/***/ }),

/***/ "./src/ticker.js":
/*!***********************!*\
  !*** ./src/ticker.js ***!
  \***********************/
/*! exports provided: Ticker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ticker", function() { return Ticker; });
/* harmony import */ var _maths__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maths */ "./src/maths.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var DEFAULT_INTERVAL = 1000; // Provide 1 second default

var _instances = [];
var Ticker =
/*#__PURE__*/
function () {
  _createClass(Ticker, null, [{
    key: "getInstances",
    value: function getInstances() {
      return _instances;
    }
    /**
     * @param config {Object} the configuration for the actions see readme
     * {
     *      interval
     *      actions: {
     *          type : { type, payload, interval* },
     *          type : { type, payload, interval* },
     *          type : { type, payload, interval* }
     *      }
     *  }
     * */

  }]);

  function Ticker() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Ticker);

    this.initialized = true;
    this.config = config;
    this.defaultInterval = parseInt(config && config.interval) || DEFAULT_INTERVAL;
    var intervals = [this.defaultInterval].concat(_toConsumableArray(Object.values(config.actions || {}).map(function (action) {
      return parseInt(action.interval);
    })));
    this.tickInterval = Object(_maths__WEBPACK_IMPORTED_MODULE_0__["gcd"])(intervals);

    if (this.tickInterval === 1 && config.interval !== 1) {
      console.warn("You have configured your actions such that an even will be fired every 1 ms, if that is what you desire please set the top level config interval to 1 as well as this has serious performanced implications");
      this.initialized = false;
    }

    this.maxTick = Math.max.apply(Math, _toConsumableArray(intervals));
    this.elapsed = 0;
  }

  _createClass(Ticker, [{
    key: "bindStore",
    value: function bindStore(store) {
      this.store = store;
    }
  }, {
    key: "handleTick",
    value: function handleTick() {
      var _this = this;

      var config = this.config;
      this.elapsed = (this.elapsed + this.tickInterval) % this.maxTick;

      if (config && config.actions) {
        var actions = config.actions;
        Object.keys(actions).forEach(function (key) {
          var action = actions[key];

          var interval = parseInt(action.interval) || _this.defaultInterval;

          if (_this.elapsed % interval === 0) {
            _this.store.dispatch(action);
          }
        });
      }
    }
  }, {
    key: "start",
    value: function start() {
      if (this.initialized && !this.interval) {
        this.interval = setInterval(this.handleTick.bind(this), this.tickInterval);
        this.elapsed = 0;
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }]);

  return Ticker;
}();

/***/ })

/******/ });