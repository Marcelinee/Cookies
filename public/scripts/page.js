'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require(["scripts/cookies.js"], function (cookies) {});
requirejs.config({
    paths: {
        'react': 'https://unpkg.com/react@15.3.2/dist/react',
        'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
    }
});

requirejs(['react', 'react-dom'], function (React, ReactDOM) {
    var cpsMultiplier = {
        cursor: 1,
        grandma: 5,
        mine: 10,
        farm: 20
    };
    var cps = void 0;

    var CookiesClicker = function (_React$Component) {
        _inherits(CookiesClicker, _React$Component);

        function CookiesClicker(props) {
            _classCallCheck(this, CookiesClicker);

            var _this = _possibleConstructorReturn(this, (CookiesClicker.__proto__ || Object.getPrototypeOf(CookiesClicker)).call(this, props));

            _this.cookiesCpsUpdate = _this.cookiesCpsUpdate.bind(_this);
            _this.handleBuy = _this.handleBuy.bind(_this);
            _this.state = {
                amount: 0,
                perSecond: 0, //is it needed here?
                cursorAmount: 0,
                cursorCost: 0,
                grandmaAmount: 0,
                grandmaCost: 0,
                mineAmount: 0,
                mineCost: 0,
                farmAmount: 0,
                farmCost: 0
            };
            return _this;
        }

        _createClass(CookiesClicker, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                var that = this;
                var cookiesRestore, producersRestore;

                setTimeout(function () {
                    pageCookiesRestore(function (cookies) {
                        console.log(cookies);cookiesRestore = cookies;console.log(cookiesRestore.amount);
                        that.setState({ amount: cookiesRestore.amount, perSecond: cookiesRestore.perSecond });
                    });
                }, 100);

                setTimeout(function () {
                    pageProducersRestore(function (producers) {
                        console.log(producers);producersRestore = producers;console.log(producersRestore.amount);
                        that.setState({ cursorAmount: producersRestore.cursorAmount, cursorValue: producersRestore.cursorCost,
                            grandmaAmount: producersRestore.grandmaAmount, grandmaValue: producersRestore.grandmaCost,
                            mineAmount: producersRestore.mineAmount, mineValue: producersRestore.mineCost,
                            farmAmount: producersRestore.farmAmount, farmValue: producersRestore.farmCost });
                    });
                }, 100);

                this.intervalTim = setInterval(function () {
                    return _this2.setState({ amount: Math.floor(_this2.state.amount + _this2.state.perSecond) });
                }, 100);
                this.intervalCookies = setInterval(function () {
                    return updateCookiesDatabase("cookies", _this2.state.amount, _this2.state.perSecond);
                }, 10000);
                this.intervalProducers = setInterval(function () {
                    return updateProducersDatabase("producers", _this2.state.cursorAmount, _this2.state.cursorCost, _this2.state.grandmaAmount, _this2.state.grandmaCost, _this2.state.mineAmount, _this2.state.mineCost, _this2.state.farmAmount, _this2.state.farmCost);
                }, 10000);
                //cookiesCpsUpdate();
            }
        }, {
            key: 'cookiesCpsUpdate',
            value: function cookiesCpsUpdate() {
                this.setState({ perSecond: this.state.grandmaAmount * cpsMultiplier.grandma });
            }
        }, {
            key: 'handleBuy',
            value: function handleBuy(producer) {
                // this.setState((prevState) => {
                //this.setState({[producer + "Amount"]: prevState[producer + "Amount"] + 1, [producer + "Cost"]: prevState[[producer + "Cost"]]})});

                this.setState(function (prevState) {
                    var _ref;

                    return _ref = {}, _defineProperty(_ref, producer + "Amount", prevState[producer + "Amount"] + 1), _defineProperty(_ref, producer + "Cost", prevState[producer + "Cost"] + 1), _ref;
                });
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                clearInterval(this.intervalTim);
                clearInterval(this.intervalCookies);
                clearInterval(this.intervalProducers);
            }
        }, {
            key: 'render',
            value: function render() {
                //cps = this.state.grandmaAmount*cpsMultiplier.grandma + this.state.cursorAmount*cpsMultiplier.cursor; //It does not need to be computed with every render (to constructor?)
                return React.createElement(
                    'div',
                    null,
                    React.createElement(ProducerList, { handleBuy: this.handleBuy, grandmaAmount: this.state.grandmaAmount, grandmaCost: this.state.grandmaCost }),
                    React.createElement(ProducerInfo, { grandmaAmount: this.state.grandmaAmount, grandmaCost: this.state.grandmaCost }),
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
                        'button',
                        { onClick: this.cookiesCpsUpdate },
                        'Update cps'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Cookies amount ',
                        this.state.amount
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Cookies per second ',
                        this.state.perSecond
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
                var _this4 = this;

                return React.createElement(
                    'div',
                    null,
                    React.createElement(Cursor, null),
                    React.createElement(Grandma, { handleBuy: function handleBuy() {
                            return _this4.props.handleBuy("grandma");
                        }, grandmaAmount: this.props.grandmaAmount, grandmaCost: this.props.grandmaCost }),
                    React.createElement(Farm, null)
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
                return React.createElement(
                    'div',
                    null,
                    React.createElement(CursorInfo, null),
                    React.createElement(GrandmaInfo, { handleBuy: this.props.handleBuy, grandmaAmount: this.props.grandmaAmount, grandmaCost: this.props.grandmaCost }),
                    React.createElement(FarmInfo, null)
                );
            }
        }]);

        return ProducerInfo;
    }(React.Component);

    var Cursor = function (_React$Component4) {
        _inherits(Cursor, _React$Component4);

        function Cursor() {
            _classCallCheck(this, Cursor);

            return _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).apply(this, arguments));
        }

        _createClass(Cursor, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        null,
                        'Buy Cursor '
                    )
                );
            }
        }]);

        return Cursor;
    }(React.Component);

    var Grandma = function (_React$Component5) {
        _inherits(Grandma, _React$Component5);

        function Grandma() {
            _classCallCheck(this, Grandma);

            return _possibleConstructorReturn(this, (Grandma.__proto__ || Object.getPrototypeOf(Grandma)).apply(this, arguments));
        }

        _createClass(Grandma, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { onClick: this.props.handleBuy },
                        'Buy Grandma'
                    )
                );
            }
        }]);

        return Grandma;
    }(React.Component);

    var Farm = function (_React$Component6) {
        _inherits(Farm, _React$Component6);

        function Farm() {
            _classCallCheck(this, Farm);

            return _possibleConstructorReturn(this, (Farm.__proto__ || Object.getPrototypeOf(Farm)).apply(this, arguments));
        }

        _createClass(Farm, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        null,
                        'Buy Farm'
                    )
                );
            }
        }]);

        return Farm;
    }(React.Component);

    var CursorInfo = function (_React$Component7) {
        _inherits(CursorInfo, _React$Component7);

        function CursorInfo() {
            _classCallCheck(this, CursorInfo);

            return _possibleConstructorReturn(this, (CursorInfo.__proto__ || Object.getPrototypeOf(CursorInfo)).apply(this, arguments));
        }

        _createClass(CursorInfo, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Cursor cost:'
                    )
                );
            }
        }]);

        return CursorInfo;
    }(React.Component);

    var GrandmaInfo = function (_React$Component8) {
        _inherits(GrandmaInfo, _React$Component8);

        function GrandmaInfo() {
            _classCallCheck(this, GrandmaInfo);

            return _possibleConstructorReturn(this, (GrandmaInfo.__proto__ || Object.getPrototypeOf(GrandmaInfo)).apply(this, arguments));
        }

        _createClass(GrandmaInfo, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Grandma amount: ',
                        this.props.grandmaAmount
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Grandma cost: ',
                        this.props.grandmaCost
                    )
                );
            }
        }]);

        return GrandmaInfo;
    }(React.Component);

    var FarmInfo = function (_React$Component9) {
        _inherits(FarmInfo, _React$Component9);

        function FarmInfo() {
            _classCallCheck(this, FarmInfo);

            return _possibleConstructorReturn(this, (FarmInfo.__proto__ || Object.getPrototypeOf(FarmInfo)).apply(this, arguments));
        }

        _createClass(FarmInfo, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Farm cost:'
                    )
                );
            }
        }]);

        return FarmInfo;
    }(React.Component);

    ReactDOM.render(React.createElement(CookiesClicker, null), document.getElementById('cookies'));
});
