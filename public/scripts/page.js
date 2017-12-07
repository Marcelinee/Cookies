'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require(["/scripts/cookies.js"], function (cookies) {});
requirejs.config({
    paths: {
        'react': 'https://unpkg.com/react@15.3.2/dist/react',
        'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
    }
});

requirejs(['react', 'react-dom'], function (React, ReactDOM) {
    var CookiesClicker = function (_React$Component) {
        _inherits(CookiesClicker, _React$Component);

        function CookiesClicker() {
            _classCallCheck(this, CookiesClicker);

            return _possibleConstructorReturn(this, (CookiesClicker.__proto__ || Object.getPrototypeOf(CookiesClicker)).apply(this, arguments));
        }

        _createClass(CookiesClicker, [{
            key: 'render',
            value: function render() {
                var cookies = {
                    amount: 0,
                    perSecond: 0
                };
                return React.createElement(
                    'div',
                    null,
                    React.createElement(ProducerList, null),
                    React.createElement(
                        'form',
                        null,
                        'Cookies amount: ',
                        React.createElement('input', { type: 'text', id: 'amount' }),
                        'Cookies per second',
                        React.createElement('input', { type: 'text', id: 'perSecond' }),
                        'Cookies DB key',
                        React.createElement('input', { type: 'text', id: 'id' })
                    ),
                    React.createElement(
                        'button',
                        { onClick: addCookies },
                        'Add value'
                    ),
                    React.createElement(
                        'button',
                        { onClick: getCookies },
                        'Get value'
                    ),
                    React.createElement(
                        'button',
                        { onClick: updateCookies },
                        'Update value'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Cookies amount ',
                        cookies.amount
                    )
                );
            }
        }]);

        return CookiesClicker;
    }(React.Component);

    var ProducerList = function (_React$Component2) {
        _inherits(ProducerList, _React$Component2);

        function ProducerList() {
            _classCallCheck(this, ProducerList);

            return _possibleConstructorReturn(this, (ProducerList.__proto__ || Object.getPrototypeOf(ProducerList)).apply(this, arguments));
        }

        _createClass(ProducerList, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(Arrow, null)
                );
            }
        }]);

        return ProducerList;
    }(React.Component);

    var ProducerInfo = function (_React$Component3) {
        _inherits(ProducerInfo, _React$Component3);

        function ProducerInfo() {
            _classCallCheck(this, ProducerInfo);

            return _possibleConstructorReturn(this, (ProducerInfo.__proto__ || Object.getPrototypeOf(ProducerInfo)).apply(this, arguments));
        }

        _createClass(ProducerInfo, [{
            key: 'render',
            value: function render() {
                return console.log("info");
            }
        }]);

        return ProducerInfo;
    }(React.Component);

    var Arrow = function (_React$Component4) {
        _inherits(Arrow, _React$Component4);

        function Arrow() {
            _classCallCheck(this, Arrow);

            return _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).apply(this, arguments));
        }

        _createClass(Arrow, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    'Bla'
                );
            }
        }]);

        return Arrow;
    }(React.Component);

    ReactDOM.render(React.createElement(CookiesClicker, null), document.getElementById('cookies'));
});
