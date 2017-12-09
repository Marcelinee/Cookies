requirejs(["scripts/cookies.js"], function(cookies){});
requirejs.config({
    paths: {
        'react': 'https://unpkg.com/react@15.3.2/dist/react',
        'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
    }
});

requirejs(['react', 'react-dom'], function(React, ReactDOM) {
const cpsMultiplier = {
    cursor: 1,
    grandma: 5,
    bakery: 8,
    mine: 10,
    farm: 20
}    

class CookiesClicker extends React.Component {
    constructor(props) {
        super(props);
        this.cookiesCpsUpdate = this.cookiesCpsUpdate.bind(this);
        this.handleBuy = this.handleBuy.bind(this);
        this.addCookie = this.addCookie.bind(this);
        this.spentCookie = this.spentCookie.bind(this);
        this.state = {
                amount: 0,
                perSecond : 1, 
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
    }

    componentDidMount() {
        var that = this; 
        var cookiesRestore, producersRestore;

        setTimeout(function() {
            pageCookiesRestore(function(cookies) {
            console.log(cookies); cookiesRestore = cookies; console.log(cookiesRestore.amount);
            that.setState({amount: cookiesRestore.amount, perSecond: cookiesRestore.perSecond});
            })
        }, 20);

        setTimeout(function() {
            pageProducersRestore(function(producers) {
            console.log(producers); producersRestore = producers; console.log(producersRestore.amount);
            that.setState({cursorAmount: producersRestore.cursorAmount, cursorCost: producersRestore.cursorCost,
                           grandmaAmount: producersRestore.grandmaAmount, grandmaCost: producersRestore.grandmaCost,
                           bakeryAmount: producersRestore.grandmaAmount, bakeryCost: producersRestore.grandmaCost,
                           mineAmount: producersRestore.mineAmount, mineCost: producersRestore.mineCost,
                           farmAmount: producersRestore.farmAmount, farmCost: producersRestore.farmCost});
            })
        }, 50);
 
        this.intervalTim = (setInterval(() => this.setState((prevState) =>  {return {amount: (prevState.amount + (this.state.perSecond/10))}}), 100));
                                                    
        this.intervalCookies = setInterval(() => updateCookiesDatabase("cookies", this.state.amount, this.state.perSecond), 3000);
        this.intervalProducers = setInterval(() => updateProducersDatabase("producers", this.state.cursorAmount, this.state.cursorCost,
        this.state.grandmaAmount, this.state.grandmaCost,this.state.bakeryAmount, this.state.bakeryCost, this.state.mineAmount, this.state.mineCost,
        this.state.farmAmount, this.state.farmCost), 3000);
        }

    cookiesCpsUpdate() {
        this.setState(() => {return {perSecond: (1 + this.state.cursorAmount * cpsMultiplier.cursor + this.state.grandmaAmount * cpsMultiplier.grandma
                                                + this.state.bakeryAmount * cpsMultiplier.bakery  + this.state.mineAmount * cpsMultiplier.mine 
                                                + this.state.farmAmount * cpsMultiplier.farm)}});
    }

    addCookie() {
        this.setState((prevState) => {return {amount: prevState.amount + 1}});
    }

    spentCookie(cost) {
        this.setState((prevState) => {return {amount: prevState.amount - cost}});
    }

    handleBuy(producer) {
        this.setState((prevState) => {return {[producer + "Amount"]: prevState[producer + "Amount"] + 1, [producer + "Cost"]: prevState[producer + "Cost"] + 1}}, 
        function() {
            this.cookiesCpsUpdate(); this.spentCookie(this.state[producer + "Cost"]);
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalTim);
        clearInterval(this.intervalCookies);
        clearInterval(this.intervalProducers);
      }

    render() {
        return (
            <div>
            <Cookie addCookie={this.addCookie} cookiesAmount={this.state.amount} cookiesPerSecond={this.state.perSecond}/>

            <ProducerList handleBuy={this.handleBuy} cookiesAmount={this.state.amount}
                        cursorAmount={this.state.cursorAmount} cursorCost={this.state.cursorCost}
                        grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}
                        bakeryAmount={this.state.bakeryAmount} bakeryCost={this.state.bakeryCost}
                        mineAmount={this.state.mineAmount} mineCost={this.state.mineCost}
                        farmAmount={this.state.farmAmount} farmCost={this.state.farmCost}/>

            <ProducerInfo cursorAmount={this.state.cursorAmount} cursorCost={this.state.cursorCost}
                            grandmaAmount={this.state.grandmaAmount} grandmaCost={this.state.grandmaCost}
                            bakeryAmount={this.state.bakeryAmount} bakeryCost={this.state.bakeryCost}
                            mineAmount={this.state.mineAmount} mineCost={this.state.mineCost}
                            farmAmount={this.state.farmAmount} farmCost={this.state.farmCost}/>
            </div>
        );

    }
}

class Cookie extends React.Component {
    render() {
        return (
            <div>
            <button onClick={this.props.addCookie}>Cookie click!</button>
            <p>Cookies amount {Math.round(this.props.cookiesAmount)}</p>
            <p>Cookies per second {this.props.cookiesPerSecond}</p>
            </div>
        )
    }
}

class ProducerList extends React.Component {

    render() {
        return (
            <div>
                <Cursor handleBuy={() => this.props.handleBuy("cursor")} cursorAmount={this.props.cursorAmount} cursorCost={this.props.cursorCost} cookiesAmount={this.props.cookiesAmount}/>              
                <Grandma handleBuy={() => this.props.handleBuy("grandma")}  grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost} cookiesAmount={this.props.cookiesAmount}/>
                <Bakery handleBuy={() => this.props.handleBuy("bakery")}  bakeryAmount={this.props.bakeryAmount} bakeryCost={this.props.bakeryCost} cookiesAmount={this.props.cookiesAmount}/>
                <Mine handleBuy={() => this.props.handleBuy("mine")}  mineAmount={this.props.mineAmount} mineCost={this.props.mineCost} cookiesAmount={this.props.cookiesAmount}/>
                <Farm handleBuy={() => this.props.handleBuy("farm")}  farmAmount={this.props.farmAmount} farmCost={this.props.farmCost} cookiesAmount={this.props.cookiesAmount}/>
            </div>
        );
    }
}

class ProducerInfo extends React.Component {
    render() {
        return (
            <div>
                <CursorInfo cursorAmount={this.props.cursorAmount} cursorCost={this.props.cursorCost} />
                <GrandmaInfo grandmaAmount={this.props.grandmaAmount} grandmaCost={this.props.grandmaCost}/>
                <BakeryInfo bakeryAmount={this.props.bakeryAmount} bakeryCost={this.props.bakeryCost} />
                <MineInfo mineAmount={this.props.mineAmount} mineCost={this.props.mineCost}/>
                <FarmInfo farmAmount={this.props.farmAmount} farmCost={this.props.farmCost}/>
            </div>
        );
    }
}

class Cursor extends React.Component {
    render() {
        return (
            <div><button 
            disabled = {this.props.cookiesAmount < this.props.cursorCost}
            onClick={() => {this.props.handleBuy("cursor")}}>Buy Cursor </button></div>
        );
    }
}

class Grandma extends React.Component {
    render() {
        return (
            <div><button 
            disabled = {this.props.cookiesAmount < this.props.grandmaCost}
            onClick={() => {this.props.handleBuy("grandma")}}>Buy Grandma</button></div>
        );
    }
}

class Bakery extends React.Component {
    render() {
        return (
            <div><button 
            disabled = {this.props.cookiesAmount < this.props.bakeryCost}
            onClick={() => {this.props.handleBuy("bakery")}}>Buy Bakery</button></div>
        );
    }
}

class Mine extends React.Component {
    render() {
        return (
            <div>
            <button 
                disabled = {this.props.cookiesAmount < this.props.mineCost}
                onClick={() => {this.props.handleBuy("farm")}}>
                Buy Mine
            </button>
            </div>
        );
    }
}

class Farm extends React.Component {
    render() {
        return (
            <div>
            <button 
            disabled = {this.props.cookiesAmount < this.props.farmCost}
                onClick={() => {this.props.handleBuy("farm")}}>
                Buy Farm 
            </button>
            </div>
        );
    }
}

class CursorInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Cursor amount: {this.props.cursorAmount}</p>
            <p>Cursor cost: {this.props.cursorCost}</p>
            <p>Farm cookies production: {this.props.cursorAmount * cpsMultiplier.cursor}/second</p>
            </div>
        );
    }
}

class GrandmaInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Grandma amount: {this.props.grandmaAmount}</p>
            <p>Grandma cost: {this.props.grandmaCost}</p>
            <p>Grandma cookies production: {this.props.grandmaAmount * cpsMultiplier.grandma}/second</p>
            </div>
        );
    }
}

class BakeryInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Bakery amount: {this.props.bakeryAmount}</p>
            <p>Bakery cost: {this.props.bakeryCost}</p>
            <p>Bakery cookies production: {this.props.bakeryAmount * cpsMultiplier.bakery}/second</p>
            </div>
        );
    }
}

class MineInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Mine amount: {this.props.mineAmount}</p>
            <p>Mine cost: {this.props.mineCost}</p>
            <p>Mine cookies production: {this.props.mineAmount * cpsMultiplier.mine}/second</p>
            </div>
        );
    }
}

class FarmInfo extends React.Component {
    render() {
        return (
            <div>
            <p>Farm amount: {this.props.farmAmount}</p>
            <p>Farm cost: {this.props.farmCost}</p>
            <p>Farm cookies production: {this.props.farmAmount * cpsMultiplier.farm}/second</p>
            </div>
        );
    }
}

ReactDOM.render(<CookiesClicker />, document.getElementById('cookies'));
});