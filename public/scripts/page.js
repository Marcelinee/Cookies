'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cookies = require('./cookies.js');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./timer.min.js');

var _Grandma = require('./components/Grandma');

var _Grandma2 = _interopRequireDefault(_Grandma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Library for running timers whila card is inactive: 
//https://github.com/turuslan/HackTimer

var cpsMultiplier = {
    cursor: 1,
    grandma: 5,
    bakery: 8,
    mine: 10,
    farm: 20
};

var CookiesClicker = function (_React$Component) {
    _inherits(CookiesClicker, _React$Component);

    function CookiesClicker(props) {
        _classCallCheck(this, CookiesClicker);

        var _this = _possibleConstructorReturn(this, (CookiesClicker.__proto__ || Object.getPrototypeOf(CookiesClicker)).call(this, props));

        _this.updateCookiesCPS = _this.updateCookiesCPS.bind(_this);
        _this.buyProducers = _this.buyProducers.bind(_this);
        _this.addCookies = _this.addCookies.bind(_this);
        _this.reduceCookiesAmount = _this.reduceCookiesAmount.bind(_this);
        _this.state = {
            amount: 0,
            perSecond: 1,
            cursorAmount: 0,
            cursorCost: 0,
            grandmaAmount: 0,
            grandmaCost: 0,
            bakeryAmount: 0,
            bakeryCost: 0,
            mineAmount: 0,
            mineCost: 0,
            farmAmount: 0,
            farmCost: 0
        };
        return _this;
    }
    //Restoring and updating values


    _createClass(CookiesClicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var that = this;
            var cookiesRestore, producersRestore;

            setTimeout(function () {
                (0, _cookies.restoreCookiesDatabase)(function (cookies) {
                    console.log(cookies);cookiesRestore = cookies;console.log(cookiesRestore.amount);
                    that.setState({ amount: cookiesRestore.amount, perSecond: cookiesRestore.perSecond });
                });
            }, 20);

            setTimeout(function () {
                (0, _cookies.restoreProducersDatabase)(function (producers) {
                    console.log(producers);producersRestore = producers;console.log(producersRestore.amount);
                    that.setState({ cursorAmount: producersRestore.cursorAmount, cursorCost: producersRestore.cursorCost,
                        grandmaAmount: producersRestore.grandmaAmount, grandmaCost: producersRestore.grandmaCost,
                        bakeryAmount: producersRestore.bakeryAmount, bakeryCost: producersRestore.bakeryCost,
                        mineAmount: producersRestore.mineAmount, mineCost: producersRestore.mineCost,
                        farmAmount: producersRestore.farmAmount, farmCost: producersRestore.farmCost });
                });
            }, 50);

            this.intervalTim = setInterval(function () {
                return _this2.setState(function (prevState) {
                    return { amount: prevState.amount + _this2.state.perSecond / 10 };
                });
            }, 100);
            this.intervalCookies = setInterval(function () {
                return (0, _cookies.updateCookiesDatabase)("cookies", _this2.state.amount, _this2.state.perSecond);
            }, 3000);
            this.intervalProducers = setInterval(function () {
                return (0, _cookies.updateProducersDatabase)("producers", _this2.state.cursorAmount, _this2.state.cursorCost, _this2.state.grandmaAmount, _this2.state.grandmaCost, _this2.state.bakeryAmount, _this2.state.bakeryCost, _this2.state.mineAmount, _this2.state.mineCost, _this2.state.farmAmount, _this2.state.farmCost);
            }, 3000);
        }
    }, {
        key: 'updateCookiesCPS',
        value: function updateCookiesCPS() {
            var _this3 = this;

            this.setState(function () {
                return { perSecond: 1 + _this3.state.cursorAmount * cpsMultiplier.cursor + _this3.state.grandmaAmount * cpsMultiplier.grandma + _this3.state.bakeryAmount * cpsMultiplier.bakery + _this3.state.mineAmount * cpsMultiplier.mine + _this3.state.farmAmount * cpsMultiplier.farm };
            });
        }

        //Cookie click adder

    }, {
        key: 'addCookies',
        value: function addCookies() {
            this.setState(function (prevState) {
                return { amount: prevState.amount + 1 };
            });
        }
        //

    }, {
        key: 'reduceCookiesAmount',
        value: function reduceCookiesAmount(cost) {
            this.setState(function (prevState) {
                return { amount: prevState.amount - cost };
            });
        }
    }, {
        key: 'buyProducers',
        value: function buyProducers(producer) {
            this.setState(function (prevState) {
                var _ref;

                return _ref = {}, _defineProperty(_ref, producer + "Amount", prevState[producer + "Amount"] + 1), _defineProperty(_ref, producer + "Cost", prevState[producer + "Cost"] + 1), _ref;
            }, function () {
                this.updateCookiesCPS();
                this.reduceCookiesAmount(this.state[producer + "Cost"]);
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
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(Cookie, { addCookies: this.addCookies, cookiesAmount: this.state.amount, cookiesPerSecond: this.state.perSecond }),
                _react2.default.createElement(ProducerList, { buyProducers: this.buyProducers, cookiesAmount: this.state.amount,
                    cursorAmount: this.state.cursorAmount, cursorCost: this.state.cursorCost,
                    grandmaAmount: this.state.grandmaAmount, grandmaCost: this.state.grandmaCost,
                    bakeryAmount: this.state.bakeryAmount, bakeryCost: this.state.bakeryCost,
                    mineAmount: this.state.mineAmount, mineCost: this.state.mineCost,
                    farmAmount: this.state.farmAmount, farmCost: this.state.farmCost }),
                _react2.default.createElement(ProducerInfo, { cursorAmount: this.state.cursorAmount, cursorCost: this.state.cursorCost,
                    grandmaAmount: this.state.grandmaAmount, grandmaCost: this.state.grandmaCost,
                    bakeryAmount: this.state.bakeryAmount, bakeryCost: this.state.bakeryCost,
                    mineAmount: this.state.mineAmount, mineCost: this.state.mineCost,
                    farmAmount: this.state.farmAmount, farmCost: this.state.farmCost })
            );
        }
    }]);

    return CookiesClicker;
}(_react2.default.Component);

var Cookie = function (_React$Component2) {
    _inherits(Cookie, _React$Component2);

    function Cookie() {
        _classCallCheck(this, Cookie);

        return _possibleConstructorReturn(this, (Cookie.__proto__ || Object.getPrototypeOf(Cookie)).apply(this, arguments));
    }

    _createClass(Cookie, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    { onClick: this.props.addCookies },
                    'Cookie click!'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Cookies amount ',
                    Math.round(this.props.cookiesAmount)
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Cookies per second ',
                    this.props.cookiesPerSecond
                )
            );
        }
    }]);

    return Cookie;
}(_react2.default.Component);

var ProducerList = function (_React$Component3) {
    _inherits(ProducerList, _React$Component3);

    function ProducerList() {
        _classCallCheck(this, ProducerList);

        return _possibleConstructorReturn(this, (ProducerList.__proto__ || Object.getPrototypeOf(ProducerList)).apply(this, arguments));
    }

    _createClass(ProducerList, [{
        key: 'render',
        value: function render() {
            var _this6 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(Cursor, { buyProducers: function buyProducers() {
                        return _this6.props.buyProducers("cursor");
                    }, cursorAmount: this.props.cursorAmount, cursorCost: this.props.cursorCost, cookiesAmount: this.props.cookiesAmount }),
                _react2.default.createElement(_Grandma2.default, { buyProducers: function buyProducers() {
                        return _this6.props.buyProducers("grandma");
                    }, grandmaAmount: this.props.grandmaAmount, grandmaCost: this.props.grandmaCost, cookiesAmount: this.props.cookiesAmount }),
                _react2.default.createElement(Bakery, { buyProducers: function buyProducers() {
                        return _this6.props.buyProducers("bakery");
                    }, bakeryAmount: this.props.bakeryAmount, bakeryCost: this.props.bakeryCost, cookiesAmount: this.props.cookiesAmount }),
                _react2.default.createElement(Mine, { buyProducers: function buyProducers() {
                        return _this6.props.buyProducers("mine");
                    }, mineAmount: this.props.mineAmount, mineCost: this.props.mineCost, cookiesAmount: this.props.cookiesAmount }),
                _react2.default.createElement(Farm, { buyProducers: function buyProducers() {
                        return _this6.props.buyProducers("farm");
                    }, farmAmount: this.props.farmAmount, farmCost: this.props.farmCost, cookiesAmount: this.props.cookiesAmount })
            );
        }
    }]);

    return ProducerList;
}(_react2.default.Component);

var ProducerInfo = function (_React$Component4) {
    _inherits(ProducerInfo, _React$Component4);

    function ProducerInfo() {
        _classCallCheck(this, ProducerInfo);

        return _possibleConstructorReturn(this, (ProducerInfo.__proto__ || Object.getPrototypeOf(ProducerInfo)).apply(this, arguments));
    }

    _createClass(ProducerInfo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(CursorInfo, { cursorAmount: this.props.cursorAmount, cursorCost: this.props.cursorCost }),
                _react2.default.createElement(GrandmaInfo, { grandmaAmount: this.props.grandmaAmount, grandmaCost: this.props.grandmaCost }),
                _react2.default.createElement(BakeryInfo, { bakeryAmount: this.props.bakeryAmount, bakeryCost: this.props.bakeryCost }),
                _react2.default.createElement(MineInfo, { mineAmount: this.props.mineAmount, mineCost: this.props.mineCost }),
                _react2.default.createElement(FarmInfo, { farmAmount: this.props.farmAmount, farmCost: this.props.farmCost })
            );
        }
    }]);

    return ProducerInfo;
}(_react2.default.Component);

var Cursor = function (_React$Component5) {
    _inherits(Cursor, _React$Component5);

    function Cursor() {
        _classCallCheck(this, Cursor);

        return _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).apply(this, arguments));
    }

    _createClass(Cursor, [{
        key: 'render',
        value: function render() {
            var _this9 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    {
                        disabled: this.props.cookiesAmount < this.props.cursorCost,
                        onClick: function onClick() {
                            _this9.props.buyProducers("cursor");
                        } },
                    'Buy Cursor '
                )
            );
        }
    }]);

    return Cursor;
}(_react2.default.Component);

var Bakery = function (_React$Component6) {
    _inherits(Bakery, _React$Component6);

    function Bakery() {
        _classCallCheck(this, Bakery);

        return _possibleConstructorReturn(this, (Bakery.__proto__ || Object.getPrototypeOf(Bakery)).apply(this, arguments));
    }

    _createClass(Bakery, [{
        key: 'render',
        value: function render() {
            var _this11 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    {
                        disabled: this.props.cookiesAmount < this.props.bakeryCost,
                        onClick: function onClick() {
                            _this11.props.buyProducers("bakery");
                        } },
                    'Buy Bakery'
                )
            );
        }
    }]);

    return Bakery;
}(_react2.default.Component);

var Mine = function (_React$Component7) {
    _inherits(Mine, _React$Component7);

    function Mine() {
        _classCallCheck(this, Mine);

        return _possibleConstructorReturn(this, (Mine.__proto__ || Object.getPrototypeOf(Mine)).apply(this, arguments));
    }

    _createClass(Mine, [{
        key: 'render',
        value: function render() {
            var _this13 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    {
                        disabled: this.props.cookiesAmount < this.props.mineCost,
                        onClick: function onClick() {
                            _this13.props.buyProducers("farm");
                        } },
                    'Buy Mine'
                )
            );
        }
    }]);

    return Mine;
}(_react2.default.Component);

var Farm = function (_React$Component8) {
    _inherits(Farm, _React$Component8);

    function Farm() {
        _classCallCheck(this, Farm);

        return _possibleConstructorReturn(this, (Farm.__proto__ || Object.getPrototypeOf(Farm)).apply(this, arguments));
    }

    _createClass(Farm, [{
        key: 'render',
        value: function render() {
            var _this15 = this;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'button',
                    {
                        disabled: this.props.cookiesAmount < this.props.farmCost,
                        onClick: function onClick() {
                            _this15.props.buyProducers("farm");
                        } },
                    'Buy Farm'
                )
            );
        }
    }]);

    return Farm;
}(_react2.default.Component);

var CursorInfo = function (_React$Component9) {
    _inherits(CursorInfo, _React$Component9);

    function CursorInfo() {
        _classCallCheck(this, CursorInfo);

        return _possibleConstructorReturn(this, (CursorInfo.__proto__ || Object.getPrototypeOf(CursorInfo)).apply(this, arguments));
    }

    _createClass(CursorInfo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Cursor amount: ',
                    this.props.cursorAmount
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Cursor cost: ',
                    this.props.cursorCost
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Farm cookies production: ',
                    this.props.cursorAmount * cpsMultiplier.cursor,
                    '/second'
                )
            );
        }
    }]);

    return CursorInfo;
}(_react2.default.Component);

var GrandmaInfo = function (_React$Component10) {
    _inherits(GrandmaInfo, _React$Component10);

    function GrandmaInfo() {
        _classCallCheck(this, GrandmaInfo);

        return _possibleConstructorReturn(this, (GrandmaInfo.__proto__ || Object.getPrototypeOf(GrandmaInfo)).apply(this, arguments));
    }

    _createClass(GrandmaInfo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Grandma amount: ',
                    this.props.grandmaAmount
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Grandma cost: ',
                    this.props.grandmaCost
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Grandma cookies production: ',
                    this.props.grandmaAmount * cpsMultiplier.grandma,
                    '/second'
                )
            );
        }
    }]);

    return GrandmaInfo;
}(_react2.default.Component);

var BakeryInfo = function (_React$Component11) {
    _inherits(BakeryInfo, _React$Component11);

    function BakeryInfo() {
        _classCallCheck(this, BakeryInfo);

        return _possibleConstructorReturn(this, (BakeryInfo.__proto__ || Object.getPrototypeOf(BakeryInfo)).apply(this, arguments));
    }

    _createClass(BakeryInfo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Bakery amount: ',
                    this.props.bakeryAmount
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Bakery cost: ',
                    this.props.bakeryCost
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Bakery cookies production: ',
                    this.props.bakeryAmount * cpsMultiplier.bakery,
                    '/second'
                )
            );
        }
    }]);

    return BakeryInfo;
}(_react2.default.Component);

var MineInfo = function (_React$Component12) {
    _inherits(MineInfo, _React$Component12);

    function MineInfo() {
        _classCallCheck(this, MineInfo);

        return _possibleConstructorReturn(this, (MineInfo.__proto__ || Object.getPrototypeOf(MineInfo)).apply(this, arguments));
    }

    _createClass(MineInfo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Mine amount: ',
                    this.props.mineAmount
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Mine cost: ',
                    this.props.mineCost
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Mine cookies production: ',
                    this.props.mineAmount * cpsMultiplier.mine,
                    '/second'
                )
            );
        }
    }]);

    return MineInfo;
}(_react2.default.Component);

var FarmInfo = function (_React$Component13) {
    _inherits(FarmInfo, _React$Component13);

    function FarmInfo() {
        _classCallCheck(this, FarmInfo);

        return _possibleConstructorReturn(this, (FarmInfo.__proto__ || Object.getPrototypeOf(FarmInfo)).apply(this, arguments));
    }

    _createClass(FarmInfo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Farm amount: ',
                    this.props.farmAmount
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Farm cost: ',
                    this.props.farmCost
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Farm cookies production: ',
                    this.props.farmAmount * cpsMultiplier.farm,
                    '/second'
                )
            );
        }
    }]);

    return FarmInfo;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(CookiesClicker, null), document.getElementById('cookies'));
;
