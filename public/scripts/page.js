'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

requirejs(["scripts/cookies.js"], function (cookies) {});
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
        bakery: 8,
        mine: 10,
        farm: 20
    };

    var CookiesClicker = function (_React$Component) {
        _inherits(CookiesClicker, _React$Component);

        function CookiesClicker(props) {
            _classCallCheck(this, CookiesClicker);

            var _this = _possibleConstructorReturn(this, (CookiesClicker.__proto__ || Object.getPrototypeOf(CookiesClicker)).call(this, props));

            _this.cookiesCpsUpdate = _this.cookiesCpsUpdate.bind(_this);
            _this.handleBuy = _this.handleBuy.bind(_this);
            _this.addCookie = _this.addCookie.bind(_this);
            _this.spentCookie = _this.spentCookie.bind(_this);
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
                }, 20);

                setTimeout(function () {
                    pageProducersRestore(function (producers) {
                        console.log(producers);producersRestore = producers;console.log(producersRestore.amount);
                        that.setState({ cursorAmount: producersRestore.cursorAmount, cursorCost: producersRestore.cursorCost,
                            grandmaAmount: producersRestore.grandmaAmount, grandmaCost: producersRestore.grandmaCost,
                            bakeryAmount: producersRestore.grandmaAmount, bakeryCost: producersRestore.grandmaCost,
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
                    return updateCookiesDatabase("cookies", _this2.state.amount, _this2.state.perSecond);
                }, 3000);
                this.intervalProducers = setInterval(function () {
                    return updateProducersDatabase("producers", _this2.state.cursorAmount, _this2.state.cursorCost, _this2.state.grandmaAmount, _this2.state.grandmaCost, _this2.state.bakeryAmount, _this2.state.bakeryCost, _this2.state.mineAmount, _this2.state.mineCost, _this2.state.farmAmount, _this2.state.farmCost);
                }, 3000);
            }
        }, {
            key: 'cookiesCpsUpdate',
            value: function cookiesCpsUpdate() {
                var _this3 = this;

                this.setState(function () {
                    return { perSecond: 1 + _this3.state.cursorAmount * cpsMultiplier.cursor + _this3.state.grandmaAmount * cpsMultiplier.grandma + _this3.state.bakeryAmount * cpsMultiplier.bakery + _this3.state.mineAmount * cpsMultiplier.mine + _this3.state.farmAmount * cpsMultiplier.farm };
                });
            }
        }, {
            key: 'addCookie',
            value: function addCookie() {
                this.setState(function (prevState) {
                    return { amount: prevState.amount + 1 };
                });
            }
        }, {
            key: 'spentCookie',
            value: function spentCookie(cost) {
                this.setState(function (prevState) {
                    return { amount: prevState.amount - cost };
                });
            }
        }, {
            key: 'handleBuy',
            value: function handleBuy(producer) {
                this.setState(function (prevState) {
                    var _ref;

                    return _ref = {}, _defineProperty(_ref, producer + "Amount", prevState[producer + "Amount"] + 1), _defineProperty(_ref, producer + "Cost", prevState[producer + "Cost"] + 1), _ref;
                }, function () {
                    this.cookiesCpsUpdate();this.spentCookie(this.state[producer + "Cost"]);
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
                return React.createElement(
                    'div',
                    null,
                    React.createElement(Cookie, { addCookie: this.addCookie, cookiesAmount: this.state.amount, cookiesPerSecond: this.state.perSecond }),
                    React.createElement(ProducerList, { handleBuy: this.handleBuy, cookiesAmount: this.state.amount,
                        cursorAmount: this.state.cursorAmount, cursorCost: this.state.cursorCost,
                        grandmaAmount: this.state.grandmaAmount, grandmaCost: this.state.grandmaCost,
                        bakeryAmount: this.state.bakeryAmount, bakeryCost: this.state.bakeryCost,
                        mineAmount: this.state.mineAmount, mineCost: this.state.mineCost,
                        farmAmount: this.state.farmAmount, farmCost: this.state.farmCost }),
                    React.createElement(ProducerInfo, { cursorAmount: this.state.cursorAmount, cursorCost: this.state.cursorCost,
                        grandmaAmount: this.state.grandmaAmount, grandmaCost: this.state.grandmaCost,
                        bakeryAmount: this.state.bakeryAmount, bakeryCost: this.state.bakeryCost,
                        mineAmount: this.state.mineAmount, mineCost: this.state.mineCost,
                        farmAmount: this.state.farmAmount, farmCost: this.state.farmCost })
                );
            }
        }]);

        return CookiesClicker;
    }(React.Component);

    var Cookie = function (_React$Component2) {
        _inherits(Cookie, _React$Component2);

        function Cookie() {
            _classCallCheck(this, Cookie);

            return _possibleConstructorReturn(this, (Cookie.__proto__ || Object.getPrototypeOf(Cookie)).apply(this, arguments));
        }

        _createClass(Cookie, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { onClick: this.props.addCookie },
                        'Cookie click!'
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Cookies amount ',
                        Math.round(this.props.cookiesAmount)
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Cookies per second ',
                        this.props.cookiesPerSecond
                    )
                );
            }
        }]);

        return Cookie;
    }(React.Component);

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

                return React.createElement(
                    'div',
                    null,
                    React.createElement(Cursor, { handleBuy: function handleBuy() {
                            return _this6.props.handleBuy("cursor");
                        }, cursorAmount: this.props.cursorAmount, cursorCost: this.props.cursorCost, cookiesAmount: this.props.cookiesAmount }),
                    React.createElement(Grandma, { handleBuy: function handleBuy() {
                            return _this6.props.handleBuy("grandma");
                        }, grandmaAmount: this.props.grandmaAmount, grandmaCost: this.props.grandmaCost, cookiesAmount: this.props.cookiesAmount }),
                    React.createElement(Bakery, { handleBuy: function handleBuy() {
                            return _this6.props.handleBuy("bakery");
                        }, bakeryAmount: this.props.bakeryAmount, bakeryCost: this.props.bakeryCost, cookiesAmount: this.props.cookiesAmount }),
                    React.createElement(Mine, { handleBuy: function handleBuy() {
                            return _this6.props.handleBuy("mine");
                        }, mineAmount: this.props.mineAmount, mineCost: this.props.mineCost, cookiesAmount: this.props.cookiesAmount }),
                    React.createElement(Farm, { handleBuy: function handleBuy() {
                            return _this6.props.handleBuy("farm");
                        }, farmAmount: this.props.farmAmount, farmCost: this.props.farmCost, cookiesAmount: this.props.cookiesAmount })
                );
            }
        }]);

        return ProducerList;
    }(React.Component);

    var ProducerInfo = function (_React$Component4) {
        _inherits(ProducerInfo, _React$Component4);

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
                    React.createElement(CursorInfo, { cursorAmount: this.props.cursorAmount, cursorCost: this.props.cursorCost }),
                    React.createElement(GrandmaInfo, { grandmaAmount: this.props.grandmaAmount, grandmaCost: this.props.grandmaCost }),
                    React.createElement(BakeryInfo, { bakeryAmount: this.props.bakeryAmount, bakeryCost: this.props.bakeryCost }),
                    React.createElement(MineInfo, { mineAmount: this.props.mineAmount, mineCost: this.props.mineCost }),
                    React.createElement(FarmInfo, { farmAmount: this.props.farmAmount, farmCost: this.props.farmCost })
                );
            }
        }]);

        return ProducerInfo;
    }(React.Component);

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

                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        {
                            disabled: this.props.cookiesAmount < this.props.cursorCost,
                            onClick: function onClick() {
                                _this9.props.handleBuy("cursor");
                            } },
                        'Buy Cursor '
                    )
                );
            }
        }]);

        return Cursor;
    }(React.Component);

    var Grandma = function (_React$Component6) {
        _inherits(Grandma, _React$Component6);

        function Grandma() {
            _classCallCheck(this, Grandma);

            return _possibleConstructorReturn(this, (Grandma.__proto__ || Object.getPrototypeOf(Grandma)).apply(this, arguments));
        }

        _createClass(Grandma, [{
            key: 'render',
            value: function render() {
                var _this11 = this;

                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        {
                            disabled: this.props.cookiesAmount < this.props.grandmaCost,
                            onClick: function onClick() {
                                _this11.props.handleBuy("grandma");
                            } },
                        'Buy Grandma'
                    )
                );
            }
        }]);

        return Grandma;
    }(React.Component);

    var Bakery = function (_React$Component7) {
        _inherits(Bakery, _React$Component7);

        function Bakery() {
            _classCallCheck(this, Bakery);

            return _possibleConstructorReturn(this, (Bakery.__proto__ || Object.getPrototypeOf(Bakery)).apply(this, arguments));
        }

        _createClass(Bakery, [{
            key: 'render',
            value: function render() {
                var _this13 = this;

                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        {
                            disabled: this.props.cookiesAmount < this.props.bakeryCost,
                            onClick: function onClick() {
                                _this13.props.handleBuy("bakery");
                            } },
                        'Buy Bakery'
                    )
                );
            }
        }]);

        return Bakery;
    }(React.Component);

    var Mine = function (_React$Component8) {
        _inherits(Mine, _React$Component8);

        function Mine() {
            _classCallCheck(this, Mine);

            return _possibleConstructorReturn(this, (Mine.__proto__ || Object.getPrototypeOf(Mine)).apply(this, arguments));
        }

        _createClass(Mine, [{
            key: 'render',
            value: function render() {
                var _this15 = this;

                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        {
                            disabled: this.props.cookiesAmount < this.props.mineCost,
                            onClick: function onClick() {
                                _this15.props.handleBuy("farm");
                            } },
                        'Buy Mine'
                    )
                );
            }
        }]);

        return Mine;
    }(React.Component);

    var Farm = function (_React$Component9) {
        _inherits(Farm, _React$Component9);

        function Farm() {
            _classCallCheck(this, Farm);

            return _possibleConstructorReturn(this, (Farm.__proto__ || Object.getPrototypeOf(Farm)).apply(this, arguments));
        }

        _createClass(Farm, [{
            key: 'render',
            value: function render() {
                var _this17 = this;

                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        {
                            disabled: this.props.cookiesAmount < this.props.farmCost,
                            onClick: function onClick() {
                                _this17.props.handleBuy("farm");
                            } },
                        'Buy Farm'
                    )
                );
            }
        }]);

        return Farm;
    }(React.Component);

    var CursorInfo = function (_React$Component10) {
        _inherits(CursorInfo, _React$Component10);

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
                        'Cursor amount: ',
                        this.props.cursorAmount
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Cursor cost: ',
                        this.props.cursorCost
                    ),
                    React.createElement(
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
    }(React.Component);

    var GrandmaInfo = function (_React$Component11) {
        _inherits(GrandmaInfo, _React$Component11);

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
                    ),
                    React.createElement(
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
    }(React.Component);

    var BakeryInfo = function (_React$Component12) {
        _inherits(BakeryInfo, _React$Component12);

        function BakeryInfo() {
            _classCallCheck(this, BakeryInfo);

            return _possibleConstructorReturn(this, (BakeryInfo.__proto__ || Object.getPrototypeOf(BakeryInfo)).apply(this, arguments));
        }

        _createClass(BakeryInfo, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Bakery amount: ',
                        this.props.bakeryAmount
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Bakery cost: ',
                        this.props.bakeryCost
                    ),
                    React.createElement(
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
    }(React.Component);

    var MineInfo = function (_React$Component13) {
        _inherits(MineInfo, _React$Component13);

        function MineInfo() {
            _classCallCheck(this, MineInfo);

            return _possibleConstructorReturn(this, (MineInfo.__proto__ || Object.getPrototypeOf(MineInfo)).apply(this, arguments));
        }

        _createClass(MineInfo, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Mine amount: ',
                        this.props.mineAmount
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Mine cost: ',
                        this.props.mineCost
                    ),
                    React.createElement(
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
    }(React.Component);

    var FarmInfo = function (_React$Component14) {
        _inherits(FarmInfo, _React$Component14);

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
                        'Farm amount: ',
                        this.props.farmAmount
                    ),
                    React.createElement(
                        'p',
                        null,
                        'Farm cost: ',
                        this.props.farmCost
                    ),
                    React.createElement(
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
    }(React.Component);

    ReactDOM.render(React.createElement(CookiesClicker, null), document.getElementById('cookies'));
});
