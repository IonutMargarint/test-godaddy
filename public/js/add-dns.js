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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dns = function () {
  function Dns() {
    _classCallCheck(this, Dns);

    this.selectors = {
      add_new_entry_button: '.js-add-new-dns',
      dns_container: '.js-dns-container',
      delete_button: '.js-delete-row',
      save_button: '.js-save',
      ip_elements: '.js-ip',
      form: '#dns-form'
    };

    this.init();
  }

  _createClass(Dns, [{
    key: 'init',
    value: function init() {
      this.initAddDnsClickListener();
      this.initDeleteDnsClickListener();
      this.initSaveClickListener();
    }
  }, {
    key: 'initAddDnsClickListener',
    value: function initAddDnsClickListener() {
      var _this = this;

      $(this.selectors.add_new_entry_button).on('click', function () {
        _this.getNewRow();
      });
    }
  }, {
    key: 'getNewRow',
    value: function getNewRow() {
      var self = this;

      $.ajax({
        type: 'get',
        url: '/get-new-dns-row',
        data: {},
        dataType: 'json',
        success: function success(data) {
          $(self.selectors.dns_container).append(data.html);
        },
        error: function error() {
          console.log('An error occurred.');
        }
      });
    }
  }, {
    key: 'initDeleteDnsClickListener',
    value: function initDeleteDnsClickListener() {
      var self = this;

      $(this.selectors.dns_container).on('click', this.selectors.delete_button, function () {
        var exists = $(this).data('exists'),
            id = $(this).data('id'),
            parent = $(this).parents('.js-dns-row-' + id);

        self.removeRow(exists, id, parent);
      });
    }
  }, {
    key: 'removeRow',
    value: function removeRow(rowExists, id, parent) {
      if (rowExists === 0 && id === 0) {
        parent.remove();
        return;
      }

      $.ajax({
        type: 'get',
        url: '/delete-dns-record/' + id,
        data: {},
        dataType: 'json',
        success: function success(data) {
          parent.remove();
          alert(data.message);
        },
        error: function error() {
          console.log('Delete dns error');
        }
      });
    }
  }, {
    key: 'initSaveClickListener',
    value: function initSaveClickListener() {
      var _this2 = this;

      $(this.selectors.save_button).on('click', function () {
        if (!_this2.validForm()) {
          alert("The form is not valid.");
          return;
        }

        $.ajax({
          type: 'post',
          url: '/save-dns-records/' + window.Laravel.domainID,
          headers: {
            'X-CSRF-TOKEN': window.Laravel.csrfToken
          },
          data: $(_this2.selectors.form).serializeArray(),
          dataType: 'json',
          success: function success(data) {
            alert(data.message);
            window.location.reload();
          },
          error: function error(xhr) {
            alert(xhr.responseJSON.message);
          }
        });
      });
    }
  }, {
    key: 'validForm',
    value: function validForm() {
      var validationRule = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

      var isValid = true;

      $(this.selectors.ip_elements).each(function (idx, elem) {
        $(elem).removeClass('is-invalid');
        $(elem).next().remove();

        var value = $(elem).val();

        if (validationRule.test(value)) {
          return;
        }

        isValid = false;
        $(elem).addClass('is-invalid');
        $(elem).after('<div class="invalid-feedback">This is not a valid IP address.</div>');
      });

      return isValid;
    }
  }]);

  return Dns;
}();

new Dns();

/***/ })
/******/ ]);