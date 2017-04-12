'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RXFormElement2 = require('./RXFormElement');

var _RXFormElement3 = _interopRequireDefault(_RXFormElement2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 3/26/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var RXSelect = function (_RXFormElement) {
    _inherits(RXSelect, _RXFormElement);

    function RXSelect() {
        _classCallCheck(this, RXSelect);

        return _possibleConstructorReturn(this, (RXSelect.__proto__ || Object.getPrototypeOf(RXSelect)).apply(this, arguments));
    }

    _createClass(RXSelect, [{
        key: 'renderElement',
        value: function renderElement() {
            var restProps = this.getRestProps();
            var options = this.props.options;
            return React.createElement(
                'select',
                _extends({}, restProps, { onChange: this.onChange.bind(this) }),
                React.createElement(
                    'option',
                    { value: '-1' },
                    'Select'
                ),
                options.map(function (option, index) {
                    return React.createElement(
                        'option',
                        { value: option.id, key: index },
                        option.name
                    );
                }, this)
            );
        }
    }]);

    return RXSelect;
}(_RXFormElement3.default);

exports.default = RXSelect;


RXSelect.defaultProps = _extends({}, _RXFormElement3.default.defaultProps, {
    value: '-1'
});