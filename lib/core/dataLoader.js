/**
 * Created by ravi.hamsa on 6/28/16.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

require('whatwg-fetch');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _utils = require('./utils');

var DataLoader = (function () {
    function DataLoader() {
        _classCallCheck(this, DataLoader);

        this._resourceConfigIndex = {};

        this._commonHeaders = {};

        this._responseParser = function (resp) {
            return {
                data: resp,
                errors: null,
                warnings: null
            };
        };
    }

    _createClass(DataLoader, [{
        key: 'setResponseParser',
        value: function setResponseParser(fun) {
            this._responseParser = fun;
        }
    }, {
        key: 'generateGetUrl',
        value: function generateGetUrl(url, data) {
            if (!data) {
                return url;
            }
            _.each(data, function (value, index) {
                url = url.replace(':' + index, value);
            });

            return url;
        }
    }, {
        key: 'addResource',
        value: function addResource(requestId, config) {
            this._resourceConfigIndex[requestId] = config;
        }
    }, {
        key: 'setCommonHeaders',
        value: function setCommonHeaders(headers) {
            this._commonHeaders = headers;
        }
    }, {
        key: 'getRequestDef',
        value: function getRequestDef(requestId, payload) {
            var config = this._resourceConfigIndex[requestId];
            var self = this;

            return new _bluebird2['default'](function (resolve, reject) {
                if (config.type === 'static') {
                    setTimeout(function () {
                        if (config.errors) {
                            reject(config.errors, config.warnings, { errors: config.errors });
                        } else {
                            resolve(config.data, config.warnings, { data: config.data });
                        }
                    }, config.responseDelay || 100);
                    return;
                }

                if (config.paramParser) {
                    payload = config.paramParser(payload);
                }

                var cache = config.cache || 'session';

                var requestUrl = config.url;
                var requestConfig = {
                    method: config.method || 'get',
                    headers: self._commonHeaders,
                    credentials: 'include'
                };

                config.method.toLowerCase() === 'post' ? requestConfig.body = JSON.stringify(payload) : requestUrl = self.generateGetUrl(requestUrl, payload);
                var fetchPromise = fetch(requestUrl, requestConfig);
                fetchPromise.then(function (response) {
                    return response.json();
                }).then(function (body) {

                    var parsedResponse = self._responseParser(body);
                    if (parsedResponse.data) {
                        if (config.parser) {
                            parsedResponse.data = config.parser(parsedResponse.data);
                        }
                        resolve(parsedResponse.data, parsedResponse.warnings, body);
                    } else {
                        reject(parsedResponse.errors, parsedResponse.warnings, body);
                    }
                })['catch'](function (ex) {
                    reject(ex, null, ex);
                });
            });
        }
    }]);

    return DataLoader;
})();

exports['default'] = new DataLoader();
module.exports = exports['default'];