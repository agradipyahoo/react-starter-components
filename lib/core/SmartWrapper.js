'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NoLoadingSmartWrapper = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dataLoader = require('./dataLoader');

var _dataLoader2 = _interopRequireDefault(_dataLoader);

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _MessageStack = require('./MessageStack');

var _MessageStack2 = _interopRequireDefault(_MessageStack);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/28/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var NATIVE_PROPS = ['children', 'dataRequests', 'onDataUpdate', 'activeRules'];

var SmartWrapper = function (_Component) {
    _inherits(SmartWrapper, _Component);

    function SmartWrapper() {
        _classCallCheck(this, SmartWrapper);

        var _this = _possibleConstructorReturn(this, (SmartWrapper.__proto__ || Object.getPrototypeOf(SmartWrapper)).apply(this, arguments));

        _this._loadingCount = 0;
        _this._pendingRequests = [];
        _this.isInDom = false;
        _this.dataIndex = {};
        _this.state = {
            loading: false,
            active: true
        };
        return _this;
    }

    _createClass(SmartWrapper, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.checkActiveRules(this.props)) {
                var stores = this.props.dataRequests;
                if (stores) {
                    for (var i = 0; i < stores.length; i++) {
                        var storeConfig = stores[i];
                        var filteredProps = _utils._.omit(this.props, NATIVE_PROPS);
                        this.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, filteredProps, storeConfig);
                    }
                }
            }
            this.isInDom = true;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.isInDom = false;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var prevProps = this.props;
            if (this.checkActiveRules(newProps, prevProps)) {
                this.checkPropDependencies(newProps, prevProps);
            }
        }
    }, {
        key: 'checkPropDependencies',
        value: function checkPropDependencies(newProps, prevProps) {
            var stores = newProps.dataRequests;
            var self = this;
            if (stores) {
                var _loop = function _loop(i) {
                    var storeConfig = stores[i];
                    var propDependency = storeConfig.propDependency;
                    if (propDependency !== undefined) {
                        var newPropValue = newProps[propDependency];
                        var oldPropValue = prevProps[propDependency];
                        if (newPropValue !== oldPropValue) {
                            var filteredProps = _utils._.omit(newProps, NATIVE_PROPS);
                            self.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, filteredProps, storeConfig);
                        }
                    }

                    var propDependencies = storeConfig.propDependencies;
                    if (propDependencies !== undefined && propDependencies.length !== undefined && propDependencies.length > 0) {
                        _utils._.each(propDependencies, function (propDependency) {
                            var newPropValue = newProps[propDependency];
                            var oldPropValue = prevProps[propDependency];
                            if (newPropValue !== oldPropValue) {
                                var _filteredProps = _utils._.omit(newProps, NATIVE_PROPS);
                                self.addRequestIfValid(storeConfig.propKey, storeConfig.requestId, _filteredProps, storeConfig);
                            }
                        });
                    }
                    // this.loadStore(storeConfig.propKey, storeConfig.store, getParams.call(this, storeConfig), true)
                };

                for (var i = 0; i < stores.length; i++) {
                    _loop(i);
                }
            }
        }
    }, {
        key: 'checkActiveRules',
        value: function checkActiveRules(props) {
            var activeRules = props.activeRules,
                active = true;
            if (props.activeRules) {
                for (var i = 0; i < activeRules.length; i++) {
                    active = this.evaluateActiveRule(activeRules[i], props);
                    if (!active) {
                        break;
                    }
                }
                this.setState({ active: active });
            }
            return active;
        }
    }, {
        key: 'evaluateActiveRule',
        value: function evaluateActiveRule(rule, props) {
            var stateValue = props[rule.prop];
            var ruleValue = rule.value;
            switch (rule.expr) {
                case 'equal':
                    return stateValue === ruleValue;
                    break;
                case 'notEqual':
                    return stateValue !== ruleValue;
                    break;
                case 'true':
                    return stateValue === true;
                    break;
                case 'false':
                    return stateValue === false;
                    break;
                case 'defined':
                    return stateValue !== undefined && stateValue !== null;
                    break;
                default:
                    return true;
                    break;
            }
        }
    }, {
        key: 'getRequestDef',
        value: function getRequestDef(requestId, payload) {
            return _dataLoader2.default.getRequestDef(requestId, payload);
        }
    }, {
        key: '_addRequest',
        value: function _addRequest(requestId, payload, handlers, onProgress) {
            var self = this;
            var def = _dataLoader2.default.getRequestDef(requestId, payload, onProgress);
            def.done(self.wrapCallBack(handlers.done));
            def.catch(self.wrapCallBack(handlers.catch));
            def.finally(self.wrapCallBack(function () {
                self.bumpAndCheckLoading(-1);
            }));
            self.bumpAndCheckLoading(1);
            return def;
        }
    }, {
        key: 'wrapCallBack',
        value: function wrapCallBack(fn) {
            if (!fn) {
                return _utils.identity;
            }
            var self = this;
            return function () {
                if (self.isInDom) {
                    fn.apply(null, arguments);
                }
            };
        }
    }, {
        key: 'addRequestIfValid',
        value: function addRequestIfValid(propName, requestId, filteredProps, storeConfig) {
            var _this2 = this;

            var self = this;
            var isRequestValid = storeConfig.validateRequest !== undefined ? storeConfig.validateRequest(filteredProps) : true;
            var getParams = storeConfig.getParams;
            if (isRequestValid) {
                var params = getParams ? getParams.call(self, filteredProps) : filteredProps;
                this.addRequest(propName, requestId, params);
            } else {
                var fallbackResponse = storeConfig.staticFallback !== undefined ? storeConfig.staticFallback(filteredProps) : { data: [] };
                var def = _dataLoader2.default.getStaticPromise(fallbackResponse);
                def.done(function (data) {
                    return _this2.dataIndex[propName] = data;
                });
                def.catch(function (error) {
                    return _this2.dataIndex['errors'] = error;
                });
                def.finally(self.wrapCallBack(function () {
                    self.bumpAndCheckLoading(-1);
                }));
                self.bumpAndCheckLoading(1);
                return def;
            }
        }
    }, {
        key: 'addDummyRequest',
        value: function addDummyRequest(propName, requestId, payload, storeConfig) {
            var _this3 = this;

            delete this.dataIndex.errors;
            return this._addRequest(requestId, payload, {
                done: function done(data) {
                    return _this3.dataIndex[propName] = data;
                },
                catch: function _catch(error) {
                    return _this3.dataIndex['errors'] = error;
                }
            });
        }
    }, {
        key: 'addRequest',
        value: function addRequest(propName, requestId, payload, onProgress) {
            var _this4 = this;

            delete this.dataIndex.errors;
            return this._addRequest(requestId, payload, {
                done: function done(data) {
                    return _this4.dataIndex[propName] = data;
                },
                catch: function _catch(error) {
                    return _this4.dataIndex['errors'] = error;
                }
            }, onProgress);
        }
    }, {
        key: 'addStateRequest',
        value: function addStateRequest(stateName, requestId, payload, defaultValue) {
            var _this5 = this;

            if (defaultValue === undefined) {
                defaultValue = null;
            }
            this.setState(_defineProperty({}, stateName, defaultValue));
            return this._addRequest(requestId, payload, {
                done: function done(data) {
                    return _this5.setState(_defineProperty({}, stateName, data));
                },
                catch: function _catch(error) {
                    var _this5$setState2;

                    return _this5.setState((_this5$setState2 = {}, _defineProperty(_this5$setState2, stateName, defaultValue), _defineProperty(_this5$setState2, stateName + 'Error', error), _this5$setState2));
                }
            });
        }
    }, {
        key: 'bumpAndCheckLoading',
        value: function bumpAndCheckLoading(diff) {
            this._loadingCount += diff;
            var loadingDone = this._loadingCount === 0;
            if (loadingDone) {
                if (this.props.onDataUpdate) {
                    this.props.onDataUpdate(this.dataIndex);
                }
            }
            this.setState({ loading: this._loadingCount > 0 });
        }
    }, {
        key: 'renderLoading',
        value: function renderLoading() {
            return _react2.default.createElement(_Loader2.default, null);
        }
    }, {
        key: 'renderErrors',
        value: function renderErrors() {
            return _react2.default.createElement(_MessageStack2.default, { messages: this.dataIndex.errors });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren() {
            return _react2.default.cloneElement(this.props.children, _extends({}, this.dataIndex, { addRequest: this.addRequest.bind(this) }));
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.active) {
                if (this.state.loading) {
                    return this.renderLoading();
                } else if (this.dataIndex.errors && this.props.showError !== false) {
                    return this.renderErrors();
                } else {
                    if (this.props.showIf === false) {
                        return null;
                    } else {
                        return this.renderChildren();
                    }
                }
            } else {
                return _react2.default.createElement('div', null);
            }
        }
    }]);

    return SmartWrapper;
}(_react.Component);

var NoLoadingSmartWrapper = exports.NoLoadingSmartWrapper = function (_SmartWrapper) {
    _inherits(NoLoadingSmartWrapper, _SmartWrapper);

    function NoLoadingSmartWrapper() {
        _classCallCheck(this, NoLoadingSmartWrapper);

        return _possibleConstructorReturn(this, (NoLoadingSmartWrapper.__proto__ || Object.getPrototypeOf(NoLoadingSmartWrapper)).apply(this, arguments));
    }

    _createClass(NoLoadingSmartWrapper, [{
        key: 'render',
        value: function render() {
            return this.renderChildren();
        }
    }]);

    return NoLoadingSmartWrapper;
}(SmartWrapper);

exports.default = SmartWrapper;