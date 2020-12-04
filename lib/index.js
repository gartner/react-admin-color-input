'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColorField = exports.ColorInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _raCore = require('ra-core');

var _reactAdmin = require('react-admin');

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _reactColor = require('react-color');

var ReactColor = _interopRequireWildcard(_reactColor);

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _reactFocusWithin = require('react-focus-within');

var _LightenDarken = require('@palustris/js-utils/lib/Color/LightenDarken');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

require('./ColorInput.css');

var ColorDot = function ColorDot(_ref) {
    var color = _ref.color,
        _ref$amount = _ref.amount,
        amount = _ref$amount === undefined ? -50 : _ref$amount;
    return _react2.default.createElement('div', { style: {
            width: '20px',
            height: '20px',
            borderWidth: '2px',
            border: 'solid',
            borderColor: (0, _LightenDarken.LightenDarkenColor)(color, amount),
            background: color,
            marginRight: '5px'
        }
    });
};

var ColorFieldComponent = function ColorFieldComponent(_ref2) {
    var source = _ref2.source,
        _ref2$record = _ref2.record,
        record = _ref2$record === undefined ? {} : _ref2$record,
        className = _ref2.className;
    return _react2.default.createElement(
        'div',
        { style: { display: 'flex' } },
        _react2.default.createElement(ColorDot, { color: (0, _lodash2.default)(record, source) }),
        _react2.default.createElement(
            'span',
            { className: className },
            (0, _lodash2.default)(record, source)
        )
    );
};

ColorFieldComponent.propTypes = {
    addLabel: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    elStyle: _propTypes2.default.object,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object,
    source: _propTypes2.default.string.isRequired
};

var PureTextField = (0, _pure2.default)(ColorFieldComponent);

PureTextField.defaultProps = {
    addLabel: true
};

var ColorInput = function ColorInput(props) {
    var _useInput = (0, _reactAdmin.useInput)(props),
        _useInput$input = _useInput.input,
        name = _useInput$input.name,
        onChange = _useInput$input.onChange,
        value = _useInput$input.value,
        rest = _objectWithoutProperties(_useInput$input, ['name', 'onChange', 'value']),
        _useInput$meta = _useInput.meta,
        touched = _useInput$meta.touched,
        error = _useInput$meta.error,
        isRequired = _useInput.isRequired;

    var _useState = (0, _react.useState)(false),
        _useState2 = _slicedToArray(_useState, 2),
        show = _useState2[0],
        setShow = _useState2[1];

    var handleOpen = function handleOpen() {
        return setShow(true);
    };
    var handleClose = function handleClose() {
        return setShow(false);
    };
    var handleChange = function handleChange(_ref3) {
        var hex = _ref3.hex;

        onChange(hex);
    };

    var Picker = ReactColor[props.picker + 'Picker'];

    return _react2.default.createElement(
        _reactFocusWithin.FocusWithin,
        { onBlur: function onBlur(event) {
                return handleClose();
            } },
        function (_ref4) {
            var focusProps = _ref4.focusProps,
                isFocused = _ref4.isFocused;
            return _react2.default.createElement(
                'div',
                focusProps,
                _react2.default.createElement(_TextField2.default, _extends({}, props.input, {
                    margin: 'normal',
                    onFocus: handleOpen,
                    label: _react2.default.createElement(_raCore.FieldTitle, {
                        label: props.label,
                        source: props.source,
                        resource: props.resource,
                        isRequired: isRequired
                    }),
                    value: value,
                    error: !!(touched && error),
                    helperText: touched && error || props.helperText,
                    className: props.className,
                    InputProps: {
                        startAdornment: _react2.default.createElement(
                            _InputAdornment2.default,
                            { position: 'start' },
                            _react2.default.createElement(ColorDot, { color: value })
                        )
                    }
                })),
                show ? _react2.default.createElement(
                    'div',
                    { className: 'ColorInput-popup' },
                    _react2.default.createElement('div', {
                        className: 'ColorInput-cover',
                        onClick: handleClose
                    }),
                    _react2.default.createElement(Picker, _extends({}, props.options, {
                        color: value,
                        onChange: handleChange
                    }))
                ) : null
            );
        }
    );
};

exports.ColorInput = ColorInput;
ColorInput.propTypes = {
    label: _propTypes2.default.string,
    options: _propTypes2.default.object,
    source: _propTypes2.default.string,
    input: _propTypes2.default.object,
    helperText: _propTypes2.default.string,
    meta: _propTypes2.default.shape({
        touched: _propTypes2.default.bool,
        error: _propTypes2.default.string
    }),
    className: _propTypes2.default.string,
    picker: function picker(props, propName, componentName) {
        return !ReactColor[props[propName] + 'Picker'] && new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`.');
    }
};

ColorInput.defaultProps = {
    picker: 'Chrome',
    options: {
        disableAlpha: true
    }
};

var ColorField = exports.ColorField = PureTextField;