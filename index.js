"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _userAgents = _interopRequireDefault(require("user-agents"));

var _pretty = _interopRequireDefault(require("pretty"));

var _cliColor = _interopRequireDefault(require("cli-color"));

var _isUrl = _interopRequireDefault(require("is-url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Raspa = function Raspa(URL, config) {
  if (!(0, _isUrl["default"])(URL)) {
    console.log("".concat(_cliColor["default"].redBright.bold('[Raspa]'), " ").concat(_cliColor["default"].yellowBright('The url is not valid! ⚠️')));
    return;
  }

  console.log("".concat(_cliColor["default"].greenBright('[Raspa]'), " ").concat(_cliColor["default"].yellowBright('loading page ⏳')));
  var viewConfig = config ? config : {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1
  };
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var browser, page, prettyHTML;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _puppeteer["default"].launch({
              headless: true
            });

          case 2:
            browser = _context.sent;
            _context.next = 5;
            return browser.newPage();

          case 5:
            page = _context.sent;
            _context.next = 8;
            return page.setViewport(viewConfig);

          case 8:
            _context.next = 10;
            return page.setRequestInterception(true);

          case 10:
            page.on('request', function (request) {
              if (['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1) {
                request.abort();
              } else {
                request["continue"]();
              }
            });
            _context.next = 13;
            return page.setUserAgent(new _userAgents["default"]().toString());

          case 13:
            _context.next = 15;
            return page["goto"](URL, {
              waitUntil: 'networkidle2'
            });

          case 15:
            _context.t0 = _pretty["default"];
            _context.next = 18;
            return page.evaluate(function () {
              return document.documentElement.outerHTML;
            });

          case 18:
            _context.t1 = _context.sent;
            prettyHTML = (0, _context.t0)(_context.t1);
            _context.next = 22;
            return page.close();

          case 22:
            _context.next = 24;
            return browser.close();

          case 24:
            console.log("".concat(_cliColor["default"].greenBright('[Raspa]'), " ").concat(_cliColor["default"].yellowBright('content obtained! 👍')));
            return _context.abrupt("return", prettyHTML);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))();
};

var _default = Raspa;
exports["default"] = _default;
